import { useEffect, useLayoutEffect, useState } from 'react'
import { Icon } from './Icon'

const preferenceKey = 'portfolio-theme'
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

function savedTheme() {
  try {
    const value = localStorage.getItem(preferenceKey)
    if (value === 'light' || value === 'dark') return value
  } catch {
    /* Storage may be disabled. */
  }
  return null
}

export function ThemeToggle() {
  const [preference, setPreference] = useState(savedTheme)
  const [systemDark, setSystemDark] = useState(systemTheme.matches)
  const theme = preference ?? (systemDark ? 'dark' : 'light')
  useEffect(() => {
    const followSystem = () => setSystemDark(systemTheme.matches)
    const syncPreference = (event: StorageEvent) => {
      if (event.key === preferenceKey || event.key === null)
        setPreference(savedTheme())
    }
    followSystem()
    systemTheme.addEventListener('change', followSystem)
    window.addEventListener('storage', syncPreference)
    return () => {
      systemTheme.removeEventListener('change', followSystem)
      window.removeEventListener('storage', syncPreference)
    }
  }, [])
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        getComputedStyle(document.documentElement)
          .getPropertyValue('--paper')
          .trim(),
      )
  }, [theme])
  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setPreference(next)
    try {
      localStorage.setItem(preferenceKey, next)
    } catch {
      /* The theme still applies to this visit. */
    }
  }
  return (
    <button
      type="button"
      className="ml-2 grid size-[2.15rem] cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink hover:border-current hover:text-primary"
      aria-label="Dark mode"
      aria-pressed={theme === 'dark'}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
    >
      <Icon name={theme === 'light' ? 'moon' : 'sun'} size={17} />
    </button>
  )
}
