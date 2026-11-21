import { Header } from './components/Header'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'

export default function App() {
  return (
    <div
      className="mx-auto w-[calc(100%_-_2rem)] max-w-224 outline-none min-[501px]:w-[calc(100%_-_2.4rem)] min-[681px]:w-[calc(100%_-_4rem)]"
      id="home"
      tabIndex={-1}
    >
      <a
        className="sr-only z-10 bg-surface px-4 py-2 focus:not-sr-only focus:absolute"
        href="#content"
      >
        Skip to content
      </a>
      <Header />
      <main id="content">
        <About />
        <Projects />
        <Experience />
      </main>
    </div>
  )
}
