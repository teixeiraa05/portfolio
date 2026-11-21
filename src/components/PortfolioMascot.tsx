import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { MascotControls } from './portraitReturn'
import atlas from '../assets/mascot.webp'

const kits = [
  { name: 'sky blue and white football kit', position: 'left top' },
  { name: 'red shirt and blue shorts', position: 'right top' },
  { name: 'Boavista checkered kit', position: 'left bottom' },
  {
    name: 'lifeguard kit with a rescue float and green fins',
    position: 'right bottom',
  },
]

export function PortfolioMascot({
  mascot,
  interrupt,
  onHold,
}: MascotControls & { onHold: (held: boolean) => void }) {
  const anchor = useRef<HTMLSpanElement>(null)
  const grip = useRef<{
    id: number
    x: number
    y: number
    startX: number
    startY: number
  } | null>(null)
  const suppressClick = useRef(false)
  const [held, setHeld] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary) return
    suppressClick.current = false
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (
      x < rect.width * 0.24 ||
      x > rect.width * 0.76 ||
      y < rect.height * 0.32 ||
      y > rect.height * 0.63
    )
      return
    const base = anchor.current!.getBoundingClientRect()
    interrupt.current?.()
    setOffset({ x: rect.left - base.left, y: rect.top - base.top })
    grip.current = {
      id: event.pointerId,
      x,
      y,
      startX: event.clientX,
      startY: event.clientY,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    onHold(true)
    setHeld(true)
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const active = grip.current
    if (!active || active.id !== event.pointerId) return
    if (
      !suppressClick.current &&
      Math.hypot(event.clientX - active.startX, event.clientY - active.startY) <
        3
    )
      return
    suppressClick.current = true
    const base = anchor.current!.getBoundingClientRect()
    setOffset({
      x:
        Math.min(
          document.documentElement.clientWidth - base.width,
          Math.max(0, event.clientX - active.x),
        ) - base.left,
      y:
        Math.min(
          document.documentElement.scrollHeight - base.height,
          Math.max(0, event.pageY - active.y),
        ) -
        window.scrollY -
        base.top,
    })
  }

  function finish(event: PointerEvent<HTMLButtonElement>) {
    if (grip.current?.id !== event.pointerId) return
    grip.current = null
    onHold(false)
    setHeld(false)
  }

  useEffect(() => {
    const fit = () => {
      const base = anchor.current!.getBoundingClientRect()
      setOffset((current) => ({
        x: Math.max(
          -base.left,
          Math.min(
            current.x,
            document.documentElement.clientWidth - base.right,
          ),
        ),
        y: Math.max(
          -base.top - window.scrollY,
          Math.min(
            current.y,
            document.documentElement.scrollHeight -
              window.scrollY -
              base.bottom,
          ),
        ),
      }))
    }
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * kits.length),
  )
  const kit = kits[index]

  function changeKit() {
    const step = 1 + Math.floor(Math.random() * (kits.length - 1))
    setIndex((current) => (current + step) % kits.length)
  }

  return (
    <span
      ref={anchor}
      className="absolute right-0 -bottom-4 size-15 min-[340px]:size-18 min-[340px]:right-auto min-[340px]:-bottom-2 min-[340px]:left-62 min-[681px]:top-1/2 min-[681px]:bottom-auto min-[681px]:left-[calc(100%-0.75rem)] min-[681px]:-translate-y-1/2"
    >
      <button
        ref={mascot}
        style={{ translate: `${offset.x}px ${offset.y}px` }}
        data-held={held}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={finish}
        onPointerCancel={finish}
        onLostPointerCapture={finish}
        type="button"
        className="mascot-button absolute inset-0 z-[5] size-full touch-none cursor-grab data-[held=true]:cursor-grabbing border-0 bg-transparent p-0"
        title="Drag my shirt to move me · Right-click or tap to change kit"
        onClick={(event) => {
          if (!suppressClick.current || event.detail === 0) changeKit()
          suppressClick.current = false
        }}
        onContextMenu={(event) => {
          event.preventDefault()
          changeKit()
        }}
      >
        <span
          key={index}
          className="mascot-sprite motion-safe:animate-kit-hop motion-safe:[.mascot-button[data-running]_&]:origin-[50%_90%] motion-safe:[.mascot-button[data-running]_&]:animate-running-stride motion-safe:[.mascot-button[data-held=true]_&]:origin-[50%_44%] motion-safe:[.mascot-button[data-held=true]_&]:animate-shirt-tug block size-full bg-size-[200%_200%] bg-no-repeat [image-rendering:pixelated]"
          style={{
            backgroundImage: `url(${atlas})`,
            backgroundPosition: kit.position,
          }}
        />
        <span className="sr-only">
          Change mascot kit. Currently wearing the {kit.name}.
        </span>
      </button>
    </span>
  )
}
