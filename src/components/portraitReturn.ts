import type { RefObject } from 'react'

export type MascotControls = {
  mascot: RefObject<HTMLButtonElement | null>
  interrupt: RefObject<(() => void) | null>
}

type Point = { x: number; y: number }

export function animatePortraitReturn(
  mascot: HTMLButtonElement,
  photo: HTMLButtonElement,
  slot: HTMLElement,
  offset: Point,
  onFinish: () => void,
) {
  const start = mascot.getBoundingClientRect()
  const home = slot.getBoundingClientRect()
  const side = offset.x > 0 ? 0 : home.width
  const grip = {
    x: home.left + offset.x + side - (start.left + start.width / 2),
    y: home.top + offset.y + home.height * 0.7 - (start.top + start.height / 2),
  }
  const drop = { x: grip.x - offset.x, y: grip.y - offset.y }
  const travelTime = (x: number, y: number) =>
    Math.min(2200, Math.max(350, Math.hypot(x, y) * 2.2))
  const approach = travelTime(grip.x, grip.y)
  const haul = travelTime(offset.x, offset.y) + 240
  const duration = approach + haul + travelTime(drop.x, drop.y)
  const pickup = approach / duration
  const release = (approach + haul) / duration
  const facing = grip.x > 0 ? -1 : 1
  const pullFacing = side === 0 ? -1 : 1
  const pose = (x: number, y: number, direction: number) =>
    `translate(${x}px, ${y}px) scaleX(${direction})`
  const timing = { duration, fill: 'forwards' as const }

  mascot.dataset.running = 'true'
  const run = mascot.animate(
    [
      { transform: pose(0, 0, facing), offset: 0 },
      { transform: pose(grip.x, grip.y, facing), offset: pickup },
      { transform: pose(grip.x, grip.y, pullFacing), offset: pickup },
      { transform: pose(drop.x, drop.y, pullFacing), offset: release },
      { transform: pose(drop.x, drop.y, drop.x > 0 ? 1 : -1), offset: release },
      { transform: pose(0, 0, drop.x > 0 ? 1 : -1), offset: 1 },
    ],
    timing,
  )
  const pinned = `${offset.x}px ${offset.y}px`
  const pull = photo.animate(
    [
      { translate: pinned, offset: 0 },
      { translate: pinned, offset: pickup },
      { translate: '0px 0px', offset: release },
      { translate: '0px 0px', offset: 1 },
    ],
    timing,
  )
  run.onfinish = onFinish
  return () => {
    run.onfinish = null
    run.cancel()
    pull.cancel()
    delete mascot.dataset.running
  }
}
