import './christmas-scene.css'

const tree = [
  '         \\ | /',
  '       --- * ---',
  '         / | \\',
  '          /\\',
  "         /.'\\",
  '        /o-+.\\',
  '        /.,o.\\',
  '       /+..,-.\\',
  '       /,.-.@.\\',
  '      <__.\\_\\__>',
  '      /&..o.,+.\\',
  '      /o.-@..&.\\',
  '     /.,--.__.@.\\',
  '    /.+.;o...&-..\\',
  '    /..&.,-+...o.\\',
  '   <__..@._+.\\____>',
  '   /+._,---.o..&..\\',
  '   /.,o.@...-+..o.\\',
  '  /..o._,.+...\\..@.\\',
  ' /@.,+..&.,-._.o.+..\\',
  ' /..&..o.-.,..@...+..\\',
  '<___...@___.&____.+___>',
  '         |:|',
  '    +    |:|     @',
  '   [=+]  |:|   [@=]',
  '___[__]__[_]___[__]___',
].join('\n')

const fireplace = [
  '                 : ~',
  '            :  ~~',
  '               ~ :',
  '             :~',
  '          ___________',
  '         |___________|',
  '          |[]=[]=[]|',
  '          |=[]=[]==|',
  '          |[]=[]=[]|',
  '  _________________________',
  ' /_________________________\\',
  '|[]=[]=[]=[]=[]=[]=[]=[]=[]=|',
  '|=[]=[]=[]=[]=[]=[]=[]=[]=[]|',
  '|[]=[]|               |[]=[]|',
  '|=[]==|               |==[]=|',
  '|[]=[]|               |[]=[]|',
  '|=[]==|               |==[]=|',
  '|[]=[]|               |[]=[]|',
  '|=[]==|               |==[]=|',
  '|[]=[]|    ##+++####  |[]=[]|',
  '|=[]==|   __#___#__   |==[]=|',
  '|_____|_______________|_____|',
  '/___________________________\\',
].join('\n')

const fireFrames = [
  [
    "        '",
    '    .   ^    .',
    '    ^  )&  ^',
    '   (o (^% (&)',
    '  (^%(%#%(^%v)',
    '  v+@%##%@%+v',
  ],
  [
    "     '    .",
    '     ^',
    '    (&   ^ .',
    '   (%%) (^%v',
    '  (^%#%&%#%@)',
    '  v+@%##%%@+v',
  ],
  [
    "          '",
    '    .    ^',
    '    ^   (&  .',
    '   (&) (^%) ^',
    '  (^%&(%##%@v)',
    '  v+%@%##%@+v',
  ],
  [
    '       .',
    "       ^     '",
    "   '  (&  ^",
    '   ^ (^%)(&)',
    '  (&(%#%%^%#v)',
    '  v+@%###%@+v',
  ],
].map((rows) => rows.join('\n'))

const treeAccents: Record<string, string> = {
  '*': 'star',
  '&': 'light violet',
  ',': 'garland',
  '-': 'garland',
  ';': 'garland',
  o: 'light red',
  '+': 'light gold',
  '@': 'light blue',
  ':': 'bark',
  '|': 'bark',
  '[': 'bark',
  ']': 'bark',
  '=': 'bark',
}

const fireplaceAccents: Record<string, string> = {
  '=': 'stone-seam',
  '~': 'smoke',
  ':': 'smoke',
  '#': 'log',
  '+': 'ember',
}

const flameAccents: Record<string, string> = {
  '^': 'flame-tip',
  '&': 'flame-core',
  '%': 'flame-hot',
  '#': 'flame-hot',
  '@': 'flame-hot',
  v: 'flame-edge',
  o: 'flame-edge',
  '(': 'flame-edge',
  ')': 'flame-edge',
  '+': 'ember',
  '.': 'spark',
  "'": 'spark',
}

function AsciiFigure({
  art,
  accents,
  className,
}: {
  art: string
  accents: Record<string, string>
  className: string
}) {
  return (
    <pre className={className}>
      {Array.from(art, (glyph, index) => {
        const accent = accents[glyph]
        return accent ? (
          <span key={index} className={accent}>
            {glyph}
          </span>
        ) : (
          glyph
        )
      })}
    </pre>
  )
}

export function ChristmasScene() {
  return (
    <div className="christmas-scene" aria-hidden="true">
      <AsciiFigure art={tree} accents={treeAccents} className="tree" />
      <div className="fireplace">
        <AsciiFigure
          art={fireplace}
          accents={fireplaceAccents}
          className="hearth"
        />
        {fireFrames.map((frame) => (
          <AsciiFigure
            key={frame}
            art={frame}
            accents={flameAccents}
            className="fire-frame"
          />
        ))}
      </div>
    </div>
  )
}
