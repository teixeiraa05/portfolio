import { Header } from './components/Header'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { GitHubActivity } from './sections/GitHubActivity'

export default function App() {
  return (
    <div className="page-shell outline-none" id="home" tabIndex={-1}>
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
        <GitHubActivity />
      </main>
    </div>
  )
}
