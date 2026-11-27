import { useRef, useState } from 'react'
import { DraggablePortrait } from '../components/DraggablePortrait'
import { ContactLinks } from '../components/ContactLinks'
import { PortfolioMascot } from '../components/PortfolioMascot'

export function About() {
  const mascot = useRef<HTMLButtonElement>(null)
  const football = useRef<HTMLSpanElement>(null)
  const interrupt = useRef<(() => void) | null>(null)
  const [mascotHeld, setMascotHeld] = useState(false)

  return (
    <section className="about-layout">
      <div>
        <div className="min-[681px]:relative min-[681px]:w-fit">
          <h1
            aria-labelledby="given-name family-name"
            className="max-[681px]:text-[clamp(2.625rem,calc(1.5rem+3.6vw),3rem)] max-[501px]:max-w-none max-[501px]:pr-[calc(var(--mascot-size)-0.375rem)] max-[501px]:text-[clamp(2rem,calc(0.375rem+7.2vw),2.625rem)]"
          >
            <span id="given-name">Rodrigo</span>{' '}
            <span className="whitespace-nowrap">
              <span id="family-name">Teixeira</span>
              <span className="ml-[0.12em] inline-block align-[0.03em] max-[681px]:relative">
                <span
                  ref={football}
                  aria-hidden="true"
                  className="pointer-events-none relative z-[6] block text-[0.2em]/none tracking-normal select-none"
                >
                  ⚽
                </span>
                <PortfolioMascot
                  mascot={mascot}
                  football={football}
                  interrupt={interrupt}
                  onHold={setMascotHeld}
                />
              </span>
            </span>
          </h1>
        </div>
        <p className="bio">
          3rd Year Informatics and Computing Engineer Student @ FEUP
          <br />
          Member of the Technology Department @{' '}
          <a className="whitespace-nowrap" href="https://www.junifeup.pt/">
            JuniFEUP
          </a>
        </p>
        <ContactLinks />
      </div>
      <DraggablePortrait
        mascot={mascot}
        interrupt={interrupt}
        mascotHeld={mascotHeld}
      />
    </section>
  )
}
