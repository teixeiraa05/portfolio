export function SectionTitle({
  id,
  title,
  aside,
}: {
  id: string
  title: string
  aside?: string
}) {
  return (
    <div className="mb-5 flex items-center gap-3 min-[681px]:gap-5">
      <h2 id={id}>{title}</h2>
      <span className="h-px flex-1 bg-line" />
      {aside && (
        <span className="font-mono text-xs whitespace-nowrap text-muted">
          {aside}
        </span>
      )}
    </div>
  )
}
