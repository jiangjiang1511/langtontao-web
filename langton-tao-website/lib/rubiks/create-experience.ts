import * as THREE from 'three'
import CameraControls from 'camera-controls'
import type { RubiksParams, RubiksStory, StoryStep, Vec3 } from '@/lib/rubiks/types'
import {
  clamp01,
  computeAssignments,
  easeInOutCubic,
  gridToWorld,
  interpolateColorStops,
  lerp,
  lerpVec3,
  normalizeMorphProgress,
  sampleGradient,
} from '@/lib/rubiks/utils'

CameraControls.install({ THREE })

type ScrollConfig = {
  sectionSelector: string
  sectionsRoot: HTMLElement
}

type CreateRubiksExperienceOptions = {
  container: HTMLElement
  story: RubiksStory
  params?: Partial<RubiksParams>
  scroll: ScrollConfig
}

const DEFAULT_PARAMS: RubiksParams = {
  cubeScale: 0.92,
  driftEnabled: true,
  driftAmount: 0.25,
  driftSpeed: 2.5,
  storyTransitionEasing: easeInOutCubic,
}

function getOrthographicBounds(width: number, height: number) {
  const aspect = width / Math.max(height, 1)
  const frustumHeight = 1
  const frustumWidth = frustumHeight * aspect
  return {
    left: -frustumWidth / 2,
    right: frustumWidth / 2,
    top: frustumHeight / 2,
    bottom: -frustumHeight / 2,
    near: 1,
    far: 1000,
  }
}

class ScrollManager {
  private sections: HTMLElement[] = []
  private currentStepIndex = 0
  private currentProgress = 0
  private active = false
  private readonly handleScrollBound: () => void

  constructor(
    private readonly config: {
      sectionsRoot: HTMLElement
      sectionSelector: string
      stepCount: number
      onProgress: (stepIndex: number, progress: number) => void
      onStepChange: (stepIndex: number) => void
    }
  ) {
    this.handleScrollBound = this.handleScroll.bind(this)
    this.collectSections()
  }

  private collectSections() {
    const found = Array.from(
      this.config.sectionsRoot.querySelectorAll<HTMLElement>(
        this.config.sectionSelector
      )
    )
    this.sections = found.slice(0, this.config.stepCount)
  }

  private handleScroll() {
    if (!this.active || this.sections.length === 0) return

    const scrollY = window.scrollY
    let offsetTop = 0

    for (let index = 0; index < this.sections.length; index += 1) {
      const section = this.sections[index]
      const sectionTop = offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        const rawProgress = (scrollY - sectionTop) / Math.max(section.offsetHeight, 1)
        const progress = clamp01(rawProgress)
        const stepChanged = index !== this.currentStepIndex
        this.currentStepIndex = index
        this.currentProgress = progress
        if (stepChanged) this.config.onStepChange(index)
        this.config.onProgress(index, progress)
        return
      }

      offsetTop += section.offsetHeight
    }

    const lastIndex = this.sections.length - 1
    if (scrollY >= offsetTop) {
      const stepChanged = lastIndex !== this.currentStepIndex
      this.currentStepIndex = lastIndex
      this.currentProgress = 1
      if (stepChanged) this.config.onStepChange(lastIndex)
      this.config.onProgress(lastIndex, 1)
    }
  }

  activate() {
    this.active = true
    this.collectSections()
    window.addEventListener('scroll', this.handleScrollBound, { passive: true })
    this.handleScroll()
  }

  dispose() {
    this.active = false
    window.removeEventListener('scroll', this.handleScrollBound)
  }
}

class CubeRenderer {
  private readonly mesh: THREE.InstancedMesh
  private readonly dummy = new THREE.Object3D()
  private readonly cubeIds: string[] = []
  private readonly startPositions = new Map<string, Vec3>()
  private readonly targetPositions = new Map<string, Vec3>()
  private readonly currentPositions = new Map<string, Vec3>()
  private readonly colorScratch = new THREE.Color()
  private morphProgress = 0
  private activeStops = [{ position: 0, color: '#ffffff' }]
  private readonly dimensions: Vec3
  private readonly boxSize: number
  private readonly cubeScale: number
  private readonly minY: number
  private readonly maxY: number

  constructor(
    scene: THREE.Scene,
    story: RubiksStory,
    maxCubes: number,
    cubeScale: number
  ) {
    this.dimensions = story.gridDimensions
    this.boxSize = story.boxSize
    this.cubeScale = cubeScale

    const allWorldY = story.steps.flatMap((step) =>
      step.cells.map((cell) => gridToWorld(cell, this.dimensions, this.boxSize)[1])
    )
    this.minY = Math.min(...allWorldY)
    this.maxY = Math.max(...allWorldY)

    const geometry = new THREE.BoxGeometry(story.boxSize, story.boxSize, story.boxSize)
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.08,
    })

    this.mesh = new THREE.InstancedMesh(geometry, material, maxCubes)
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(maxCubes * 3),
      3
    )

    for (let index = 0; index < maxCubes; index += 1) {
      const id = `cube-${index}`
      this.cubeIds.push(id)
      this.currentPositions.set(id, [0, 0, 0])
      this.dummy.position.set(0, 0, 0)
      this.dummy.scale.setScalar(0)
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(index, this.dummy.matrix)
    }

    scene.add(this.mesh)
    this.applyColors()
  }

  private getColorForPosition(position: Vec3): THREE.Color {
    const span = Math.max(this.maxY - this.minY, 1e-4)
    const normalized = clamp01((position[1] - this.minY) / span)
    const [r, g, b] = sampleGradient(this.activeStops, normalized)
    return this.colorScratch.setRGB(r, g, b)
  }

  private applyColors() {
    this.cubeIds.forEach((id, index) => {
      const position = this.currentPositions.get(id)
      if (!position) return
      const color = this.getColorForPosition(position)
      this.mesh.setColorAt(index, color)
    })
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
  }

  setColorStops(stops: StoryStep['colorStops']) {
    this.activeStops = stops
    this.applyColors()
  }

  teleportToLayout(cells: Vec3[]) {
    this.startPositions.clear()
    this.targetPositions.clear()

    this.cubeIds.forEach((id, index) => {
      if (index < cells.length) {
        const world = gridToWorld(cells[index], this.dimensions, this.boxSize)
        this.currentPositions.set(id, world)
        this.startPositions.set(id, world)
        this.targetPositions.set(id, world)
      } else {
        this.currentPositions.set(id, [0, 0, 0])
      }
    })

    this.morphProgress = 1
    this.syncMatrices()
    this.applyColors()
  }

  prepareTransition(targetCells: Vec3[]) {
    const assignments = computeAssignments(
      this.cubeIds,
      this.currentPositions,
      targetCells,
      this.dimensions,
      this.boxSize
    )

    this.startPositions.clear()
    this.targetPositions.clear()

    this.cubeIds.forEach((id) => {
      const start = this.currentPositions.get(id)
      const targetCell = assignments.get(id)
      if (!start || !targetCell) return
      this.startPositions.set(id, start)
      this.targetPositions.set(id, gridToWorld(targetCell, this.dimensions, this.boxSize))
    })
  }

  setMorphProgress(progress: number) {
    this.morphProgress = clamp01(progress)

    this.cubeIds.forEach((id) => {
      const start = this.startPositions.get(id)
      const target = this.targetPositions.get(id)
      if (!start || !target) return
      const next = lerpVec3(start, target, this.morphProgress)
      this.currentPositions.set(id, next)
    })

    this.syncMatrices()
    this.applyColors()
  }

  private syncMatrices() {
    this.cubeIds.forEach((id, index) => {
      const position = this.currentPositions.get(id) ?? [0, 0, 0]
      const active = this.startPositions.has(id) && this.targetPositions.has(id)
      const scale = active ? this.cubeScale : 0

      this.dummy.position.set(position[0], position[1], position[2])
      this.dummy.scale.setScalar(scale)
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(index, this.dummy.matrix)
    })

    this.mesh.instanceMatrix.needsUpdate = true
  }

  update() {
    // Colors already applied during morph; keep hook for future idle motion.
  }

  dispose() {
    this.mesh.geometry.dispose()
    ;(this.mesh.material as THREE.Material).dispose()
    this.mesh.removeFromParent()
  }
}

export function createRubiksExperience({
  container,
  story,
  params: paramOverrides,
  scroll,
}: CreateRubiksExperienceOptions) {
  const params: RubiksParams = { ...DEFAULT_PARAMS, ...paramOverrides }
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#050505')

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  const bounds = getOrthographicBounds(container.clientWidth, container.clientHeight)
  const camera = new THREE.OrthographicCamera(
    bounds.left,
    bounds.right,
    bounds.top,
    bounds.bottom,
    bounds.near,
    bounds.far
  )
  camera.position.set(8, 10, 8)

  const controls = new CameraControls(camera, renderer.domElement)
  controls.enabled = false
  controls.dollyToCursor = false
  controls.truckSpeed = 0

  scene.add(new THREE.AmbientLight(0xffffff, 0.55))
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.1)
  keyLight.position.set(6, 10, 4)
  scene.add(keyLight)
  const fillLight = new THREE.DirectionalLight(0x88aaff, 0.35)
  fillLight.position.set(-4, 2, -6)
  scene.add(fillLight)

  const maxCubes = Math.max(...story.steps.map((step) => step.cells.length), 1)
  const cubeRenderer = new CubeRenderer(scene, story, maxCubes, params.cubeScale)

  let currentStepIndex = 0
  let currentProgress = 0
  let driftTargetX = 0
  let driftTargetY = 0
  let driftX = 0
  let driftY = 0
  let disposed = false

  const resize = () => {
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    renderer.setSize(width, height)
    const nextBounds = getOrthographicBounds(width, height)
    camera.left = nextBounds.left
    camera.right = nextBounds.right
    camera.top = nextBounds.top
    camera.bottom = nextBounds.bottom
    camera.near = nextBounds.near
    camera.far = nextBounds.far
    camera.updateProjectionMatrix()
  }

  resize()
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)

  const applyCamera = (step: StoryStep, transition: boolean) => {
    const { position, target, zoom } = step.camera
    controls.setLookAt(
      position[0],
      position[1],
      position[2],
      target[0],
      target[1],
      target[2],
      transition
    )
    controls.zoomTo(zoom, transition)
  }

  const applyStepVisuals = (fromIndex: number, toIndex: number, morphT: number) => {
    const fromStep = story.steps[fromIndex]
    const toStep = story.steps[toIndex]
    if (!fromStep || !toStep) return

    if (morphT <= 0) {
      cubeRenderer.teleportToLayout(fromStep.cells)
      cubeRenderer.setColorStops(fromStep.colorStops)
      return
    }

    if (morphT >= 1) {
      cubeRenderer.teleportToLayout(toStep.cells)
      cubeRenderer.setColorStops(toStep.colorStops)
      return
    }

    cubeRenderer.prepareTransition(toStep.cells)
    cubeRenderer.setMorphProgress(morphT)
    cubeRenderer.setColorStops(
      interpolateColorStops(fromStep.colorStops, toStep.colorStops, morphT)
    )
  }

  const handleProgress = (stepIndex: number, progress: number) => {
    currentStepIndex = stepIndex
    currentProgress = progress

    const currentStep = story.steps[stepIndex]
    const nextStep = story.steps[stepIndex + 1]
    if (!currentStep) return

    if (!nextStep) {
      applyCamera(currentStep, false)
      cubeRenderer.teleportToLayout(currentStep.cells)
      cubeRenderer.setColorStops(currentStep.colorStops)
      return
    }

    const morphT = normalizeMorphProgress(
      progress,
      currentStep.gracePercent ?? 0.15,
      currentStep.gracePercent ?? 0.1
    )
    const eased = params.storyTransitionEasing(morphT)

    controls.lerpLookAt(
      currentStep.camera.position[0],
      currentStep.camera.position[1],
      currentStep.camera.position[2],
      currentStep.camera.target[0],
      currentStep.camera.target[1],
      currentStep.camera.target[2],
      nextStep.camera.position[0],
      nextStep.camera.position[1],
      nextStep.camera.position[2],
      nextStep.camera.target[0],
      nextStep.camera.target[1],
      nextStep.camera.target[2],
      eased,
      false
    )

    controls.zoomTo(
      lerp(currentStep.camera.zoom, nextStep.camera.zoom, eased),
      false
    )

    applyStepVisuals(stepIndex, stepIndex + 1, eased)
  }

  const scrollManager = new ScrollManager({
    sectionsRoot: scroll.sectionsRoot,
    sectionSelector: scroll.sectionSelector,
    stepCount: story.steps.length,
    onStepChange: (stepIndex) => {
      const step = story.steps[stepIndex]
      if (step) applyCamera(step, false)
    },
    onProgress: handleProgress,
  })

  const firstStep = story.steps[0]
  if (firstStep) {
    cubeRenderer.teleportToLayout(firstStep.cells)
    cubeRenderer.setColorStops(firstStep.colorStops)
    applyCamera(firstStep, false)
  }

  scrollManager.activate()

  const onPointerMove = (event: PointerEvent) => {
    if (!params.driftEnabled) return
    const rect = renderer.domElement.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    driftTargetX = x * params.driftAmount
    driftTargetY = y * params.driftAmount
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })

  const clock = new THREE.Clock()

  renderer.setAnimationLoop(() => {
    if (disposed) return
    const delta = clock.getDelta()

    if (params.driftEnabled) {
      const blend = 1 - Math.exp(-params.driftSpeed * delta)
      driftX += (driftTargetX - driftX) * blend
      driftY += (driftTargetY - driftY) * blend
      if (Math.abs(driftX) > 1e-4 || Math.abs(driftY) > 1e-4) {
        controls.rotate(driftX * delta * 0.8, driftY * delta * 0.8, false)
      }
    }

    controls.update(delta)
    cubeRenderer.update()
    renderer.render(scene, camera)
  })

  return {
    getCurrentStepIndex: () => currentStepIndex,
    getCurrentProgress: () => currentProgress,
    destroy: () => {
      disposed = true
      renderer.setAnimationLoop(null)
      resizeObserver.disconnect()
      scrollManager.dispose()
      window.removeEventListener('pointermove', onPointerMove)
      controls.dispose()
      cubeRenderer.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    },
  }
}
