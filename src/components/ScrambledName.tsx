import { useScramble } from 'use-scramble'

function NameWord({ word }: { word: 'Rodrigo' | 'Teixeira' }) {
  const { ref } = useScramble({
    text: word,
    speed: 0.8,
    tick: 2,
    scramble: 5,
    seed: 3,
    range: ['0'.charCodeAt(0), '9'.charCodeAt(0)],
    overdrive: false,
  })

  return (
    <span className="relative inline-block">
      <span className="motion-safe:opacity-0">{word}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none motion-reduce:hidden"
      />
    </span>
  )
}

export function ScrambledName() {
  return (
    <h1>
      <NameWord word="Rodrigo" /> <NameWord word="Teixeira" />
      <span className="brand-accent">.</span>
    </h1>
  )
}
