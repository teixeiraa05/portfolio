import { ContactLinks } from '../components/ContactLinks'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import { experience, projects } from '../data/portfolio'
import portrait from '../assets/rodrigo.webp'
import '../cv.css'

const featured = ['openfloat', 'clutch']
const compactProjectIds = new Set([
  ...featured,
  'sushi',
  'color',
  'pulse',
  'flow',
])
const orderedProjects = [...projects].sort((a, b) => {
  const priority = (id: string) =>
    featured.includes(id) ? featured.indexOf(id) : featured.length
  return priority(a.id) - priority(b.id) || b.month.localeCompare(a.month)
})

export function Cv() {
  const compact =
    new URLSearchParams(location.search).get('print') === 'compact'
  const cvProjects = compact
    ? orderedProjects.filter((project) => compactProjectIds.has(project.id))
    : orderedProjects

  return (
    <div id="home" className="page-shell cv" tabIndex={-1}>
      <a className="sr-only focus:not-sr-only" href="#content">
        Skip to content
      </a>
      <Header cv />
      <main id="content">
        <nav className="cv-pdf-links" aria-label="Curriculum vitae PDFs">
          <a href="/RodrigoTeixeira_CV.pdf" target="_blank" rel="noopener">
            <span>View compact CV</span>
            <small>
              PDF <Icon name="external-link" size={16} />
            </small>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            href="/extended_RodrigoTeixeira_CV.pdf"
            target="_blank"
            rel="noopener"
          >
            <span>View extended CV</span>
            <small>
              PDF <Icon name="external-link" size={16} />
            </small>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </nav>
        <header className="cv-identity">
          <div>
            <h1>Rodrigo Teixeira</h1>
            <p>
              Informatics and Computing Engineering undergraduate · Porto,
              Portugal
            </p>
            <ContactLinks showDetails />
          </div>
          <img src={portrait} alt="Rodrigo Teixeira" />
        </header>
        <section>
          <h2>Education</h2>
          <article>
            <div className="cv-line">
              <h3>Faculty of Engineering, University of Porto</h3>
              <span>Sep 2024 - present · Expected Jun 2027</span>
            </div>
            <p>
              BSc in Informatics and Computing Engineering ·{' '}
              <strong>Average 16.03/20</strong>
            </p>
          </article>
          <article>
            <div className="cv-line">
              <h3>Escola Secundária da Maia</h3>
              <span>2021 - 2024</span>
            </div>
            <p>
              Science and Technologies with Chemistry and Informatics
              Applications
            </p>
          </article>
        </section>
        <section>
          <h2>Experience</h2>
          <ol className="cv-experience list-none p-0">
            {experience
              .filter((item) => item.responsibilities)
              .map(({ role, organizations, start, responsibilities }) => (
                <li className="timeline-entry" key={role}>
                  <div className="cv-line">
                    <h3>{role}</h3>
                    <span>{start} - present</span>
                  </div>
                  <p className="cv-meta">
                    {organizations.map((org) => org.name).join(' · ')}
                  </p>
                  <ul className="cv-bullets">
                    <li>{responsibilities}</li>
                  </ul>
                </li>
              ))}
          </ol>
        </section>
        <section>
          <h2>Projects</h2>
          {cvProjects.map(
            ({
              id,
              title,
              date,
              technologies,
              contributions,
              ongoing,
              url,
            }) => (
              <article key={id}>
                <div className="cv-line">
                  <h3>{url ? <a href={url}>{title}</a> : title}</h3>
                  <span>
                    {date}
                    {ongoing && ' - present'}
                  </span>
                </div>
                {id === 'clutch' && (
                  <p className="cv-meta">
                    Software Engineering Project · FEUP, University of Porto ·
                    2025/26
                  </p>
                )}
                <p className="cv-meta">
                  <strong>{technologies.join(' · ')}</strong>
                </p>
                <ul className="cv-bullets">
                  {contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
              </article>
            ),
          )}
        </section>
        <section>
          <h2>Skills &amp; languages</h2>
          <p>
            <strong>Technical</strong> · Web development, C/C++, Java, Python,
            SQL
          </p>
          <p>
            <strong>Personal</strong> · Curiosity, proactivity, resilience,
            problem-solving
          </p>
          <p>
            <strong>Languages</strong> · Portuguese (native), English (fluent)
          </p>
        </section>
        <section>
          <h2>Honors &amp; certifications</h2>
          <article>
            <div className="cv-line">
              <div className="cv-award">
                <h3>Cambridge C2 Proficiency in English · Grade B</h3>
                <p className="cv-meta">Cambridge English</p>
              </div>
              <span>2025</span>
            </div>
          </article>
          <article>
            <div className="cv-line">
              <div className="cv-award">
                <h3>Gulbenkian Merit Scholarship</h3>
                <p className="cv-meta">Fundação Calouste Gulbenkian</p>
              </div>
              <span>2024 - present</span>
            </div>
          </article>
          <article>
            <div className="cv-line">
              <div className="cv-award">
                <h3>Lifeguard Certification</h3>
                <p className="cv-meta">Instituto de Socorros a Náufragos</p>
              </div>
              <span>2025 - 2028</span>
            </div>
          </article>
          <article>
            <h3>Merit Awards for Academic Excellence</h3>
            <ul className="cv-bullets">
              <li>Colégio Externato Imaculada Conceição · 2016</li>
              <li>Escola EB2/3 de Gueifães · 2017 - 2021</li>
              <li>Escola Secundária da Maia · 2022, 2023, 2024</li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  )
}
