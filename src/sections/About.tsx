import { useRef, useState } from 'react'
import { DraggablePortrait } from '../components/DraggablePortrait'
import { ContactLinks } from '../components/ContactLinks'
import { PortfolioMascot } from '../components/PortfolioMascot'
import { ScrambledName } from '../components/ScrambledName'

export function About() {
  const mascot = useRef<HTMLButtonElement>(null)
  const interrupt = useRef<(() => void) | null>(null)
  const [mascotHeld, setMascotHeld] = useState(false)

  return (
    <section className="about-layout">
      <div>
        <div className="min-[681px]:relative min-[681px]:w-fit">
          <ScrambledName />
          <PortfolioMascot
            mascot={mascot}
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
