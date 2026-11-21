import { useRef, useState } from 'react'
import { DraggablePortrait } from '../components/DraggablePortrait'
import { ContactLinks } from '../components/ContactLinks'
import { PortfolioMascot } from '../components/PortfolioMascot'

export function About() {
  const mascot = useRef<HTMLButtonElement>(null)
  const interrupt = useRef<(() => void) | null>(null)
  const [mascotHeld, setMascotHeld] = useState(false)

  return (
    <section className="about relative gap-[clamp(1.4rem,6vw,5rem)] py-11 min-[681px]:px-[0.15rem] min-[681px]:pt-[4.2rem] min-[681px]:pb-[3.85rem] min-[501px]:grid min-[501px]:grid-cols-[1fr_auto] min-[501px]:items-center">
      <div>
        <div className="min-[681px]:relative min-[681px]:w-fit">
          <h1>
            Rodrigo Teixeira<span className="brand-accent">.</span>
          </h1>
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
