import { useState } from 'react'
import type { Project } from '../data/portfolio'
import { ScreenshotGallery } from './ScreenshotGallery'

export function ProjectMedia({ project }: { project: Project }) {
  const { galleries = [], youtubeId, videoPoster } = project
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(!videoPoster)
  const gallery = galleries[index]

  return (
    <div className="min-w-0">
      <div className="media-strip flex items-end gap-2 overflow-x-auto px-1 pt-7 pb-2">
        {videoPoster && youtubeId && (
          <button
            type="button"
            className="media-thumb relative aspect-video cursor-pointer"
            aria-expanded={playing}
            onClick={() => setPlaying(!playing)}
          >
            <img
              src={videoPoster}
              alt=""
              loading="lazy"
              className="block size-full rounded-[inherit] object-cover"
            />
            <span
              className="action-pill action-icon absolute top-1/2 left-1/2 -translate-1/2"
              aria-hidden="true"
            >
              {playing ? '×' : '▶'}
            </span>
            <span className="sr-only">
              {playing ? 'Close walkthrough' : 'Play walkthrough'}
            </span>
          </button>
        )}
        {gallery && (
          <ScreenshotGallery
            key={gallery.title}
            screenshots={gallery.screenshots}
            portrait={gallery.portrait}
          />
        )}
      </div>
      {playing && youtubeId && (
        <iframe
          className="mt-2 block aspect-video w-full rounded-md border-0 bg-surface"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0${videoPoster ? '&autoplay=1' : ''}`}
          title={`${project.title} walkthrough`}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
      {galleries.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {galleries.map(({ title }, position) => (
            <button
              type="button"
              key={title}
              aria-pressed={position === index}
              onClick={() => setIndex(position)}
              className="action-pill gallery-filter"
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
