import { useEffect } from 'react'
import { Icon } from './Icon'

import { ThemeToggle } from './ThemeToggle'

export function Header({ cv = false }: { cv?: boolean }) {
  useEffect(() => {
    const navigate = (event: KeyboardEvent) => {
      const element = event.target
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.key !== 'h' && event.key !== 'c')
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
      if (event.key === 'c') {
        if (!cv) document.getElementById('cv-link')?.click()
        return
      }
      document.getElementById('home-link')?.click()
      document.getElementById('home')?.focus({ preventScroll: true })
    }
    window.addEventListener('keydown', navigate)
    return () => {
      window.removeEventListener('keydown', navigate)
    }
  }, [cv])
  return (
    <header className="header-layout">
      <nav className="flex items-center gap-2 min-[501px]:gap-4">
        <span className="monogram" aria-hidden="true">
          rt<span className="brand-accent">.</span>
        </span>
        <span className="font-mono text-muted-foreground" aria-hidden="true">
          /
        </span>
        <a
          id="home-link"
          href={cv ? '/' : '#home'}
          className="flex items-center gap-2 font-mono text-sm no-underline"
          aria-keyshortcuts="h"
          aria-current={cv ? undefined : 'page'}
        >
          <kbd aria-hidden="true" className="text-primary">
            [h]
          </kbd>{' '}
          home
        </a>
        <a
          id="cv-link"
          href="/cv/"
          className="flex items-center gap-2 font-mono text-sm no-underline"
          aria-keyshortcuts="c"
          aria-current={cv ? 'page' : undefined}
        >
          <kbd aria-hidden="true" className="text-primary">
            [c]
          </kbd>{' '}
          CV
        </a>
      </nav>
      <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
        <Icon name="pin" size={15} /> Porto, PT
        <ThemeToggle />
      </div>
    </header>
  )
}
