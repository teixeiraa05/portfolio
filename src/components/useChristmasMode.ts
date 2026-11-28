import { useEffect, useState } from 'react'

export const christmasModeAvailable =
  import.meta.env.VITE_CHRISTMAS_MODE !== 'false'

const preferenceKey = 'portfolio-christmas-mode'

function savedChristmasMode() {
  try {
    return localStorage.getItem(preferenceKey) !== 'off'
  } catch {
    return true
  }
}

export function useChristmasMode() {
  const [enabled, setEnabled] = useState(
    () => christmasModeAvailable && savedChristmasMode(),
  )

  useEffect(() => {
    if (!christmasModeAvailable) return

    const syncPreference = (event: StorageEvent) => {
      if (event.key === preferenceKey || event.key === null)
        setEnabled(savedChristmasMode())
    }
    window.addEventListener('storage', syncPreference)
    return () => window.removeEventListener('storage', syncPreference)
  }, [])

  function toggle() {
    const next = !enabled
    setEnabled(next)
    try {
      localStorage.setItem(preferenceKey, next ? 'on' : 'off')
    } catch {
      /* Christmas mode still works for this visit. */
    }
  }

  return { enabled, toggle }
}
