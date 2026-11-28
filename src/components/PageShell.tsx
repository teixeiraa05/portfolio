import type { ReactNode } from 'react'
import { ChristmasSnow, ChristmasToggle } from './ChristmasMode'
import { ChristmasScene } from './ChristmasScene'
import { Header } from './Header'
import { christmasModeAvailable, useChristmasMode } from './useChristmasMode'

export function PageShell({
  cv = false,
  children,
}: {
  cv?: boolean
  children: ReactNode | ((scene: ReactNode) => ReactNode)
}) {
  const { enabled, toggle } = useChristmasMode()
  const christmasControl = christmasModeAvailable ? (
    <ChristmasToggle enabled={enabled} onToggle={toggle} />
  ) : undefined

  const showDecorations = christmasModeAvailable && enabled
  const scene = showDecorations ? <ChristmasScene /> : null

  return (
    <div
      className={cv ? 'page-shell cv' : 'page-shell outline-none'}
      id="home"
      tabIndex={-1}
    >
      <a
        className={
          cv
            ? 'sr-only focus:not-sr-only'
            : 'sr-only z-10 bg-surface px-4 py-2 focus:not-sr-only focus:absolute'
        }
        href="#content"
      >
        Skip to content
      </a>
      <Header cv={cv} christmasControl={christmasControl} />
      {typeof children === 'function' ? (
        children(scene)
      ) : (
        <>
          {children}
          {scene}
        </>
      )}
      {showDecorations && <ChristmasSnow />}
    </div>
  )
}
