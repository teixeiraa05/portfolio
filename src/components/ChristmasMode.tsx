import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import PixelSnow from './PixelSnow'

export const christmasModeAvailable =
  import.meta.env.VITE_CHRISTMAS_MODE !== 'false'

const preferenceKey = 'portfolio-christmas-mode'

function snowEnabled() {
  try {
    return localStorage.getItem(preferenceKey) !== 'off'
  } catch {
    return true
  }
}

export function ChristmasMode() {
  const [enabled, setEnabled] = useState(snowEnabled)

  useEffect(() => {
    const syncPreference = (event: StorageEvent) => {
      if (event.key === preferenceKey || event.key === null)
        setEnabled(snowEnabled())
    }
    window.addEventListener('storage', syncPreference)
    return () => window.removeEventListener('storage', syncPreference)
  }, [])

  function toggleSnow() {
    const next = !enabled
    setEnabled(next)
    try {
      localStorage.setItem(preferenceKey, next ? 'on' : 'off')
    } catch {
      /* Snow can still be toggled for this visit. */
    }
  }

  return (
    <>
      <button
        type="button"
        className="header-toggle aria-pressed:text-primary"
        aria-label="Christmas mode"
        aria-pressed={enabled}
        title={enabled ? 'Turn off Christmas mode' : 'Turn on Christmas mode'}
        onClick={toggleSnow}
      >
        <Icon name="snowflake" size={17} />
      </button>
      {enabled && (
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
      )}
    </>
  )
}
