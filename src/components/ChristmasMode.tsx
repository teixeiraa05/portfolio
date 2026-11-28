import { Icon } from './Icon'
import PixelSnow from './PixelSnow'

export function ChristmasToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className="header-toggle aria-pressed:text-primary"
      aria-label="Christmas mode"
      aria-pressed={enabled}
      title={enabled ? 'Turn off Christmas mode' : 'Turn on Christmas mode'}
      onClick={onToggle}
    >
      <Icon name="snowflake" size={17} />
    </button>
  )
}

export function ChristmasSnow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 print:hidden"
    >
      <PixelSnow
        className="drop-shadow-[1px_1px_0_#52678580] dark:drop-shadow-none"
        color="#ffffff"
        density={0.16}
        speed={0.5}
        opacity={0.48}
        glow={0}
        twinkle={0}
        dpr={1}
        mouseInteraction={false}
      />
    </div>
  )
}
