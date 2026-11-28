import { PageShell } from './components/PageShell'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Education } from './sections/Education'
import { AwardsAndCertifications } from './sections/AwardsAndCertifications'
import { ContributionActivity } from './sections/ContributionActivity'

export default function App() {
  return (
    <PageShell>
      {(scene) => (
        <main id="content">
          <About />
          <Projects />
          <Experience />
          <Education />
          <AwardsAndCertifications />
          <ContributionActivity scene={scene} />
        </main>
      )}
    </PageShell>
  )
}
