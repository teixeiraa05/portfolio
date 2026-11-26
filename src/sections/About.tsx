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
          <h1>
            Rodrigo{' '}
            <span className="whitespace-nowrap">
              Teixeira
              <span
                aria-hidden="true"
                className="ml-[0.12em] inline-block align-[0.03em]"
              >
                <span
                  ref={football}
                  className="pointer-events-none relative z-[6] block text-[0.2em]/none tracking-normal select-none"
                >
                  ⚽
                </span>
              </span>
            </span>
          </h1>
          <PortfolioMascot
            mascot={mascot}
            football={football}
            interrupt={interrupt}
            onHold={setMascotHeld}
          />
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
