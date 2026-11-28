import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { animateMascotJuggle, faceFootball } from './mascotJuggle'
import atlas from '../assets/mascot.webp'
import juggleAtlas from '../assets/mascot-juggle.webp'

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
  football,
}: {
  mascot: RefObject<HTMLButtonElement | null>
  football: RefObject<HTMLSpanElement | null>
}) {
  const juggleSprite = useRef<HTMLSpanElement>(null)
  const stopJuggling = useRef<(() => void) | null>(null)

  const faceRestingBall = useCallback(() => {
    const button = mascot.current
    const ball = football.current
    if (
      button &&
      ball &&
      !stopJuggling.current &&
      !button.hasAttribute('data-running')
    )
      faceFootball(
        button,
        button.getBoundingClientRect(),
        ball.getBoundingClientRect(),
      )
  }, [football, mascot])

  useLayoutEffect(() => {
    faceRestingBall()
  }, [faceRestingBall])

  useEffect(() => {
    const button = mascot.current
    const ball = football.current
    const frames = juggleSprite.current
    if (!button || !ball || !frames) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stop = () => stopJuggling.current?.()
    const attempt = () => {
      if (
        reducedMotion.matches ||
        document.hidden ||
        button.hasAttribute('data-running') ||
        stopJuggling.current
      )
        return

      const cancel = animateMascotJuggle(button, ball, frames, stop)
      stopJuggling.current = () => {
        cancel()
        stopJuggling.current = null
        faceRestingBall()
      }
    }

    const movement = new MutationObserver(() => {
      if (button.hasAttribute('data-running')) stop()
      else faceRestingBall()
    })
    movement.observe(button, { attributeFilter: ['data-running'] })
    const first = window.setTimeout(attempt, 5000)
    const repeat = window.setInterval(attempt, 13000)
    window.addEventListener('resize', stop)
    document.addEventListener('visibilitychange', stop)
    document.fonts.addEventListener('loadingdone', faceRestingBall)
    reducedMotion.addEventListener('change', stop)

    return () => {
      window.clearTimeout(first)
      window.clearInterval(repeat)
      window.removeEventListener('resize', stop)
      document.removeEventListener('visibilitychange', stop)
      document.fonts.removeEventListener('loadingdone', faceRestingBall)
      reducedMotion.removeEventListener('change', stop)
      movement.disconnect()
      stop()
    }
  }, [faceRestingBall, football, mascot])

  const [index, setIndex] = useState(0)
  const kit = kits[index]
  const sprite = {
    backgroundImage: `url(${atlas})`,
    backgroundPosition: kit.position,
  }

  function changeKit() {
    stopJuggling.current?.()
    const step = 1 + Math.floor(Math.random() * (kits.length - 1))
    setIndex((current) => (current + step) % kits.length)
  }

  return (
    <span className="relative -ml-[min(2.5cqi,0.8125rem)] w-[clamp(2.25rem,14cqi,4.5rem)] shrink-0 self-center">
      <button
        ref={mascot}
        type="button"
        className="mascot-button absolute top-0 left-0 z-[5] aspect-square w-full -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
        title="Change mascot kit"
        onClick={changeKit}
        onContextMenu={(event) => {
          event.preventDefault()
          changeKit()
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [.mascot-button[data-facing=right]:not([data-running])_&]:-scale-x-100"
        >
          <span
            key={index}
            className="mascot-sprite motion-safe:animate-kit-hop motion-safe:[.mascot-button[data-running]_&]:origin-[50%_90%] motion-safe:[.mascot-button[data-running]_&]:animate-running-stride block size-full bg-size-[200%_200%] bg-no-repeat [image-rendering:pixelated] [.mascot-button[data-juggling]_&]:invisible"
            style={sprite}
          />
          <span
            ref={juggleSprite}
            className="mascot-juggle-sprite invisible absolute inset-0 bg-size-[600%_400%] bg-no-repeat [image-rendering:pixelated] [.mascot-button[data-juggling]_&]:visible"
            style={{
              backgroundImage: `url(${juggleAtlas})`,
              backgroundPositionY: `${(index / (kits.length - 1)) * 100}%`,
            }}
          />
        </span>
        <span className="sr-only">
          Change mascot kit. Currently wearing the {kit.name}.
        </span>
      </button>
    </span>
  )
}
