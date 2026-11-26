const kicks = [0.27, 0.49, 0.71]

// Column order in the full-body sprite atlas.
const poses = [
  'ready',
  'windUp',
  'lift',
  'contact',
  'followThrough',
  'recover',
] as const
const shoeContact = { x: 26 / 128, y: 64 / 128 }

export function faceFootball(
  mascot: HTMLButtonElement,
  sprite: DOMRectReadOnly,
  ball: DOMRectReadOnly,
) {
  const facesRight = ball.left + ball.width / 2 > sprite.left + sprite.width / 2
  mascot.dataset.facing = facesRight ? 'right' : 'left'
  return facesRight
}

export function animateMascotJuggle(
  mascot: HTMLButtonElement,
  football: HTMLSpanElement,
  frames: HTMLSpanElement,
  onFinish: () => void,
) {
  const sprite = mascot.getBoundingClientRect()
  const ball = football.getBoundingClientRect()
  const origin = {
    x: ball.left + ball.width / 2,
    y: ball.top + ball.height / 2,
  }
  const facesRight = faceFootball(mascot, sprite, ball)
  const contact = {
    x:
      sprite.left +
      sprite.width * (facesRight ? 1 - shoeContact.x : shoeContact.x),
    y: sprite.top + sprite.height * shoeContact.y - ball.height / 2,
  }

  const pageTop = -window.scrollY
  const apex = (from: typeof origin, to: typeof origin, height: number) => ({
    x: (from.x + to.x) / 2,
    y: Math.max(
      pageTop + ball.height / 2,
      Math.min(from.y, to.y) - height * sprite.height,
    ),
  })
  const ballPose = (
    position: typeof origin,
    offset: number,
    angle: number,
    easing = 'linear',
  ): Keyframe => ({
    transform: `translate(${position.x - origin.x}px, ${position.y - origin.y}px) rotate(${angle}deg)`,
    offset,
    easing,
  })
  const rising = 'cubic-bezier(0.25, 0.6, 0.6, 1)'
  const falling = 'cubic-bezier(0.4, 0, 0.75, 0.4)'
  const [firstKick, secondKick, thirdKick] = kicks
  const spritePose = (
    pose: (typeof poses)[number],
    offset: number,
  ): Keyframe => ({
    backgroundPositionX: `${(poses.indexOf(pose) / (poses.length - 1)) * 100}%`,
    easing: 'steps(1, end)',
    offset,
  })
  const timing = { duration: 2900 }

  mascot.dataset.juggling = 'true'
  const flight = football.animate(
    [
      ballPose(origin, 0, 0, rising),
      ballPose(apex(origin, contact, 0.4), 0.135, 105, falling),
      ballPose(contact, firstKick, 180, rising),
      ballPose(apex(contact, contact, 0.55), 0.38, 300, falling),
      ballPose(contact, secondKick, 420, rising),
      ballPose(apex(contact, contact, 0.66), 0.6, 515, falling),
      ballPose(contact, thirdKick, 590, rising),
      ballPose(apex(contact, origin, 0.46), 0.855, 675, falling),
      ballPose(origin, 1, 720),
    ],
    timing,
  )
  const juggle = frames.animate(
    [
      spritePose('ready', 0),
      ...kicks.flatMap((offset) => [
        spritePose('windUp', offset - 0.1),
        spritePose('lift', offset - 0.045),
        spritePose('contact', offset),
        spritePose('followThrough', offset + 0.055),
        spritePose('recover', offset + 0.1),
      ]),
      spritePose('ready', 0.89),
      spritePose('ready', 1),
    ],
    timing,
  )

  flight.onfinish = onFinish
  return () => {
    flight.onfinish = null
    flight.cancel()
    juggle.cancel()
    delete mascot.dataset.juggling
  }
}
