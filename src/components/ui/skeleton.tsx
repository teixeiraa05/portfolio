import type { ComponentPropsWithoutRef } from 'react'
import { cn } from 'cn'

export function Skeleton({
  as: Element = 'div',
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { as?: 'div' | 'span' }) {
  return (
    <Element
      data-slot="skeleton"
      className={cn(
        'block rounded-md bg-accent motion-safe:animate-pulse',
        className,
      )}
      {...props}
    />
  )
}
