import { useScramble } from 'use-scramble'

const name = 'Rodrigo Teixeira'

export function ScrambledName() {
  const { ref } = useScramble({
    text: name,
    tick: 2,
    scramble: 2,
    seed: 0,
    range: ['a'.charCodeAt(0), 'z'.charCodeAt(0)],
    overdrive: false,
  })

  return (
    <h1 className="relative">
      <span className="motion-safe:opacity-0">{name}</span>
      <span className="brand-accent">.</span>
      <span
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none motion-reduce:hidden"
      />
    </h1>
  )
}
