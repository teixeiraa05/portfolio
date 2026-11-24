declare module 'virtual:github-calendar' {
  export type Snapshot = {
    start: string
    end: string
    total: number
    levels: string
    counts: (number | null)[]
  }

  const calendar: Snapshot | null
  export default calendar
}
