export type Vec3 = [number, number, number]

export type ColorStop = {
  position: number
  color: string
}

export type CameraState = {
  position: Vec3
  target: Vec3
  zoom: number
  yaw?: number
}

export type StoryStep = {
  id: string
  gracePercent?: number
  camera: CameraState
  cells: Vec3[]
  colorStops: ColorStop[]
}

export type RubiksStory = {
  gridDimensions: Vec3
  boxSize: number
  steps: StoryStep[]
}

export type RubiksParams = {
  cubeScale: number
  driftEnabled: boolean
  driftAmount: number
  driftSpeed: number
  storyTransitionEasing: (t: number) => number
}

export type CubeAssignment = Map<string, Vec3>
