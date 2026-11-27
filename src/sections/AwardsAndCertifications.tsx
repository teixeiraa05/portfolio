import { SectionTitle } from '../components/SectionTitle'
import { academicMeritAwards, awardsAndCertifications } from '../data/portfolio'

export function AwardsAndCertifications() {
  return (
    <section className="mb-10 sm:mb-13" aria-labelledby="awards">
      <SectionTitle id="awards" title="Awards & Certifications" />
      <ul className="list-none divide-y divide-line p-0">
        {awardsAndCertifications.map(({ title, issuer, logo, dates }) => (
          <li key={title} className="py-3 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3>{title}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {dates}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              {logo && (
                <img
                  className="organization-logo h-4 w-5 shrink-0 object-contain"
                  src={logo}
                  alt=""
                  loading="lazy"
                />
              )}
              {issuer}
            </p>
          </li>
        ))}
        <li className="pt-3">
          <h3>{academicMeritAwards.title}</h3>
          <ul className="mt-1 list-none space-y-1 p-0 text-sm text-muted-foreground">
            {academicMeritAwards.awards.map(({ school, dates }) => (
              <li key={school}>
                {school} · {dates}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  )
}
