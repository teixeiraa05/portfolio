import { useRef } from 'react'
import { DraggablePortrait } from '../components/DraggablePortrait'
import { ContactLinks } from '../components/ContactLinks'
import { PortfolioMascot } from '../components/PortfolioMascot'

export function About() {
  const mascot = useRef<HTMLButtonElement>(null)
  const football = useRef<HTMLSpanElement>(null)

  return (
    <section className="about-layout">
      <div className="max-[360px]:contents">
        <div className="about-heading">
          <h1 className="whitespace-nowrap">
            <span id="given-name">Rodrigo</span>{' '}
            <span id="family-name">Teixeira</span>
            <span
              ref={football}
              aria-hidden="true"
              className="pointer-events-none relative z-[6] ml-[0.55em] inline-block align-[0.125em] text-[0.2em]/none tracking-normal select-none"
            >
              ⚽
            </span>
          </h1>
          <PortfolioMascot mascot={mascot} football={football} />
        </div>
        <div>
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
      </div>
      <DraggablePortrait mascot={mascot} />
    </section>
  )
}
