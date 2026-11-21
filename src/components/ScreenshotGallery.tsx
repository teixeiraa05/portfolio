import { useRef, useState } from 'react'
import type { Screenshot } from '../data/portfolio'
import { Icon } from './Icon'

const controlClass = 'action-pill action-icon pointer-events-auto'

export function ScreenshotGallery({
  screenshots,
  portrait = false,
}: {
  screenshots: Screenshot[]
  portrait?: boolean
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const current = screenshots[index]
  const hasNavigation = screenshots.length > 1

  function openImage(next: number) {
    setIndex(next)
    dialog.current?.showModal()
  }

  function move(direction: number) {
    setIndex(
      (current) =>
        (current + direction + screenshots.length) % screenshots.length,
    )
  }

  return (
    <>
      {screenshots.map(({ src, caption }, position) => (
        <button
          key={src}
          type="button"
          className={`media-thumb cursor-zoom-in ${portrait ? 'aspect-[9/19]' : 'aspect-[8/5]'}`}
          onClick={() => openImage(position)}
        >
          <span className="sr-only">Enlarge </span>
          <img
            className="block size-full rounded-[inherit] object-contain"
            src={src}
            alt={caption}
            loading="lazy"
            decoding="async"
          />
        </button>
      ))}
      <dialog
        ref={dialog}
        className="image-lightbox fixed inset-0 m-auto w-fit max-w-[min(64rem,calc(100%-1.5rem))] overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-sm"
        aria-label="Screenshot viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        onKeyDown={(event) => {
          if (
            !hasNavigation ||
            !['ArrowLeft', 'ArrowRight'].includes(event.key)
          )
            return
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }}
      >
        <div className="group/lightbox relative">
          <div aria-live="polite">
            <img
              className="block max-h-[calc(100dvh-1.5rem)] max-w-full object-contain"
              src={current?.src}
              alt={current?.caption}
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-2 top-2 flex items-center justify-between gap-2 transition-opacity motion-reduce:transition-none [@media(hover:hover)]:opacity-0 group-hover/lightbox:opacity-100 has-[:focus-visible]:opacity-100">
            <div className="flex gap-2">
              {hasNavigation && (
                <>
                  <button
                    type="button"
                    className={controlClass}
                    onClick={() => move(-1)}
                  >
                    <Icon name="chevron-left" />
                    <span className="sr-only">Previous screenshot</span>
                  </button>
                  <button
                    type="button"
                    className={controlClass}
                    onClick={() => move(1)}
                  >
                    <Icon name="chevron-right" />
                    <span className="sr-only">Next screenshot</span>
                  </button>
                </>
              )}
            </div>
            <button
              type="button"
              className={controlClass}
              onClick={() => dialog.current?.close()}
            >
              <Icon name="close" />
              <span className="sr-only">Close lightbox</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
