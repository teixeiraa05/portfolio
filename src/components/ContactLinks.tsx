import { profile } from '../data/portfolio'
import { Icon } from './Icon'

export function ContactLinks({
  showDetails = false,
}: {
  showDetails?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3">
      {showDetails}
      <a
        className="flex items-center gap-1.5 text-sm no-underline hover:underline"
        href={`mailto:${profile.email}`}
      >
        <Icon name="mail" />
        {showDetails ? profile.email : 'Email'}
      </a>
      <a
        className="flex items-center gap-1.5 text-sm no-underline hover:underline"
        href={profile.github}
      >
        <Icon name="github" />
        GitHub
      </a>
      <a
        className="flex items-center gap-1.5 text-sm no-underline hover:underline"
        href={profile.linkedin}
      >
        <Icon name="linkedin" />
        {showDetails ? profile.linkedin.split('/').at(-1) : 'LinkedIn'}
      </a>
    </div>
  )
}
