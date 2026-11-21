import { animatePortraitReturn, type MascotControls } from './portraitReturn'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { PointerEvent } from 'react'
import portrait from '../assets/rodrigo.webp'

type Point = { x: number; y: number }
// Store a fraction of the available width so a pin survives viewport changes.
type Pin = { horizontal: number; top: number }
type Drag = {
  id: number
  start: Point
  pointer: Point
  grip: Point
  moved: boolean
}

const storageKey = 'portfolio-portrait-pin'
const inset = 12
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max))

function readPin(): Pin | null {
  try {
    const pin = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (pin && Number.isFinite(pin.horizontal) && Number.isFinite(pin.top))
      return pin
  } catch {
    /* Ignore an unavailable or outdated saved position. */
  }
  return null
}

function visibleOffset(element: HTMLElement): Point {
  // Browsers omit the second component when the vertical translation is zero.
  const [x = 0, y = 0] =
    getComputedStyle(element)
      .translate.match(/-?[\d.]+/g)
      ?.map(Number) ?? []
  return { x, y }
}

function measure(slot: HTMLDivElement) {
  const rect = slot.getBoundingClientRect()
  return {
    origin: { x: rect.left + window.scrollX, y: rect.top + window.scrollY },
    travel: Math.max(
      1,
      document.documentElement.clientWidth - rect.width - 2 * inset,
    ),
    bottom: Math.max(inset, document.body.offsetHeight - rect.height - inset),
  }
}

function locate(pin: Pin | null, bounds: ReturnType<typeof measure>): Point {
  return pin
    ? {
        x: inset + clamp(pin.horizontal, 0, 1) * bounds.travel,
        y: clamp(pin.top, inset, bounds.bottom),
      }
    : bounds.origin
}

export function DraggablePortrait({
  mascot,
  interrupt,
  mascotHeld,
}: MascotControls & { mascotHeld: boolean }) {
  const slot = useRef<HTMLDivElement>(null)
  const photo = useRef<HTMLButtonElement>(null)
  const drag = useRef<Drag | null>(null)
  const frame = useRef(0)
  const [pin, setPin] = useState(readPin)
  const [held, setHeld] = useState(false)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })

  useLayoutEffect(() => {
    const anchor = slot.current!
    const update = () => {
      if (drag.current?.moved) return
      const bounds = measure(anchor)
      const point = locate(pin, bounds)
      setOffset({ x: point.x - bounds.origin.x, y: point.y - bounds.origin.y })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    observer.observe(anchor)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [pin, held])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const savePin = useCallback((next: Pin | null) => {
    setPin(next)
    try {
      if (next) localStorage.setItem(storageKey, JSON.stringify(next))
      else localStorage.removeItem(storageKey)
    } catch {
      /* Dragging still works for this visit. */
    }
  }, [])

  useEffect(() => {
    if (!pin || held || mascotHeld) return
    let stop: (() => void) | undefined
    const timer = window.setTimeout(() => {
      const anchor = slot.current
      const target = photo.current
      const runner = mascot.current
      if (!anchor || !target || !runner || drag.current) return
      const bounds = measure(anchor)
      const point = locate(pin, bounds)
      const offset = {
        x: point.x - bounds.origin.x,
        y: point.y - bounds.origin.y,
      }
      if (
        Math.hypot(offset.x, offset.y) < 2 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        savePin(null)
        return
      }
      stop = animatePortraitReturn(runner, target, anchor, offset, () =>
        savePin(null),
      )
      // Preserve the current position when someone grabs either participant midway.
      interrupt.current = () => {
        const { x, y } = visibleOffset(target)
        stop?.()
        interrupt.current = null
        const bounds = measure(anchor)
        if (Math.hypot(x, y) < 2) savePin(null)
        else
          savePin({
            horizontal: (bounds.origin.x + x - inset) / bounds.travel,
            top: bounds.origin.y + y,
          })
        setOffset({ x, y })
      }
    }, 10_000)
    const resize = () => interrupt.current?.()
    window.addEventListener('resize', resize)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', resize)
      interrupt.current = null
      stop?.()
    }
  }, [pin, held, mascotHeld, mascot, interrupt, savePin])

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0 || drag.current)
      return
    const { origin } = measure(slot.current!)
    const { x, y } = visibleOffset(event.currentTarget)
    const position = { x: origin.x + x, y: origin.y + y }
    interrupt.current?.()
    const pointer = { x: event.clientX, y: event.clientY }
    drag.current = {
      id: event.pointerId,
      start: pointer,
      pointer,
      moved: false,
      grip: { x: event.pageX - position.x, y: event.pageY - position.y },
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setHeld(true)
  }

  function dragPosition(active: Drag, bounds: ReturnType<typeof measure>) {
    return {
      horizontal: clamp(
        (active.pointer.x + window.scrollX - active.grip.x - inset) /
          bounds.travel,
        0,
        1,
      ),
      top: clamp(
        active.pointer.y + window.scrollY - active.grip.y,
        inset,
        bounds.bottom,
      ),
    }
  }

  function track() {
    const active = drag.current
    if (!active?.moved) return
    // Edge scrolling lets visitors drag the photo below the fold.
    const edge = 48
    const y = active.pointer.y
    const speed =
      y < edge ? y - edge : Math.max(0, y - window.innerHeight + edge)
    if (speed) window.scrollBy(0, clamp(speed / 3, -16, 16))
    const bounds = measure(slot.current!)
    const position = locate(dragPosition(active, bounds), bounds)
    setOffset({
      x: position.x - bounds.origin.x,
      y: position.y - bounds.origin.y,
    })
    frame.current = requestAnimationFrame(track)
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current
    if (!active || event.pointerId !== active.id) return
    active.pointer = { x: event.clientX, y: event.clientY }
    if (
      !active.moved &&
      Math.hypot(
        event.clientX - active.start.x,
        event.clientY - active.start.y,
      ) >= 3
    ) {
      active.moved = true
      track()
    }
  }

  function finish(event: PointerEvent<HTMLButtonElement>, dropped: boolean) {
    const active = drag.current
    if (!active || active.id !== event.pointerId) return
    cancelAnimationFrame(frame.current)
    drag.current = null
    if (dropped && active.moved) {
      active.pointer = { x: event.clientX, y: event.clientY }
      savePin(dragPosition(active, measure(slot.current!)))
    }
    setHeld(false)
  }

  function reset() {
    interrupt.current?.()
    savePin(null)
    photo.current?.focus({ preventScroll: true })
  }
  return (
    <div
      className="portrait-slot relative mr-5 h-[11.9rem] w-40 max-[680px]:mr-1.5 max-[680px]:h-[8.9rem] max-[680px]:w-[7.2rem]"
      ref={slot}
    >
      {pin && (
        <button
          className="absolute inset-0 cursor-pointer rounded-sm border border-dashed border-muted bg-transparent font-mono text-xs text-muted hover:text-accent"
          type="button"
          onClick={reset}
        >
          Return photo
        </button>
      )}
      <button
        className="portrait-frame absolute inset-0 z-[4] size-full cursor-grab appearance-none select-none data-[held=true]:cursor-grabbing"
        type="button"
        ref={photo}
        tabIndex={-1}
        data-held={held}
        style={{ translate: `${offset.x}px ${offset.y}px` }}
        title="Drag with your mouse · Double-click to return"
        aria-describedby="portrait-help"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={(event) => finish(event, true)}
        onPointerCancel={(event) => finish(event, false)}
        onLostPointerCapture={(event) => finish(event, false)}
        onDoubleClick={reset}
      >
        <img
          src={portrait}
          alt="Rodrigo Teixeira outdoors by the water"
          width="535"
          height="800"
          draggable={false}
          className="block size-full object-cover object-[50%_46%]"
          fetchPriority="high"
        />
      </button>
      <span className="sr-only" id="portrait-help">
        Drag and release the photo. The mascot brings it back after ten seconds.
      </span>
    </div>
  )
}
