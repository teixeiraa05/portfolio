import { useEffect } from 'react'
import { Icon } from './Icon'

import { ThemeToggle } from './ThemeToggle'

export function Header() {
  useEffect(() => {
    const goHome = (event: KeyboardEvent) => {
      const element = event.target
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.key !== 'h'
      )
        return
      if (
        element instanceof HTMLElement &&
        (element.isContentEditable ||
          element.closest(
            'input, textarea, select, [role="textbox"], dialog[open]',
          ))
      )
        return
      document.getElementById('home-link')?.click()
      document.getElementById('home')?.focus({ preventScroll: true })
    }
    window.addEventListener('keydown', goHome)
    return () => {
      window.removeEventListener('keydown', goHome)
    }
  }, [])
  return (
    <header className="flex items-center justify-between border-b border-line py-[1.15rem] min-[501px]:pt-[1.6rem] min-[501px]:pb-[1.35rem]">
      <nav className="flex items-center gap-4">
        <span className="monogram" aria-hidden="true">
          rt<span className="brand-accent">.</span>
        </span>
        <span className="font-mono text-muted" aria-hidden="true">
          /
        </span>
        <a
          id="home-link"
          href="#home"
          className="flex items-center gap-2 font-mono text-sm no-underline"
          aria-keyshortcuts="h"
          aria-current="page"
        >
          <kbd aria-hidden="true" className="text-accent">
            [h]
          </kbd>{' '}
          home
        </a>
      </nav>
      <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
        <Icon name="pin" size={15} /> Porto, PT
        <ThemeToggle />
      </div>
    </header>
  )
}
