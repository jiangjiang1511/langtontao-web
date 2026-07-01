/** Scroll a child into view within a scrollable container without affecting page scroll. */
export function scrollChildWithinContainer(
  container: HTMLElement,
  child: HTMLElement
) {
  const style = getComputedStyle(container)
  const scrollsHorizontally =
    (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
    container.scrollWidth > container.clientWidth + 1

  if (scrollsHorizontally) {
    const containerRect = container.getBoundingClientRect()
    const childRect = child.getBoundingClientRect()
    const childLeft = childRect.left - containerRect.left + container.scrollLeft
    const childRight = childLeft + childRect.width
    const viewLeft = container.scrollLeft
    const viewRight = viewLeft + container.clientWidth

    if (childLeft < viewLeft) {
      container.scrollLeft = childLeft
    } else if (childRight > viewRight) {
      container.scrollLeft = childRight - container.clientWidth
    }
    return
  }

  const containerRect = container.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()
  const childTop = childRect.top - containerRect.top + container.scrollTop
  const childBottom = childTop + childRect.height
  const viewTop = container.scrollTop
  const viewBottom = viewTop + container.clientHeight

  if (childTop < viewTop) {
    container.scrollTop = childTop
  } else if (childBottom > viewBottom) {
    container.scrollTop = childBottom - container.clientHeight
  }
}
