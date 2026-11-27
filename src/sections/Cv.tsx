import { ContactLinks } from '../components/ContactLinks'
import { Header } from '../components/Header'
import { Icon } from '../components/Icon'
import {
  academicMeritAwards,
  awardsAndCertifications,
  education,
  experience,
  projects,
} from '../data/portfolio'
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
            <ContactLinks showDetails showPortfolio />
          </div>
          <img src={portrait} alt="Rodrigo Teixeira" />
        </header>
        <section>
          <h2>Education</h2>
          {education.map(
            ({ school, qualification, dates, expectedGraduation, average }) => (
              <article key={school}>
                <div className="cv-line">
                  <h3>{school}</h3>
                  <span>
                    {dates}
                    {expectedGraduation && (
                      <> · Expected {expectedGraduation}</>
                    )}
                  </span>
                </div>
                <p>
                  {qualification}
                  {average && (
                    <>
                      {' '}
                      · <strong>Average {average}</strong>
                    </>
                  )}
                </p>
              </article>
            ),
          )}
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
          {awardsAndCertifications.map(({ title, issuer, dates }) => (
            <article key={title}>
              <div className="cv-line">
                <div className="cv-award">
                  <h3>{title}</h3>
                  <p className="cv-meta">{issuer}</p>
                </div>
                <span>{dates}</span>
              </div>
            </article>
          ))}
          <article>
            <h3>{academicMeritAwards.title}</h3>
            <ul className="cv-bullets">
              {academicMeritAwards.awards.map(({ school, dates }) => (
                <li key={school}>
                  {school} · {dates}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  )
}
