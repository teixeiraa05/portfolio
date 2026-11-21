import type { Technology } from './technologies'

export const profile = {
  github: 'https://github.com/teixeiraa05',
  linkedin: 'https://www.linkedin.com/in/rodrigofteixeira',
  email: 'rodrigoteixeira0913@gmail.com',
}

export type Screenshot = { src: string; caption: string }

export type ProjectGallery = {
  title: string
  screenshots: Screenshot[]
  portrait?: boolean
}

export type Project = {
  id: string
  title: string
  summary: string
  date: string
  month: string
  technologies: Technology[]
  course?: string
  detail: string
  url?: string
  ongoing?: boolean
  playUrl?: string
  youtubeId?: string
  videoPoster?: string
  galleries?: ProjectGallery[]
}

export const projects: Project[] = [
  {
    id: 'elio',
    galleries: [
      {
        title: 'Screenshots',
        screenshots: [
          { src: '/projects/elio/menu.webp', caption: 'Elio title screen' },
          {
            src: '/projects/elio/gameplay.webp',
            caption: 'Surviving the first wave',
          },
        ],
      },
    ],
    title: 'Elio',
    date: 'Dec 2025',
    month: '2025-12',
    summary: 'A terminal RPG set in a zombie apocalypse.',
    technologies: ['Java', 'Gradle'],
    detail:
      'Elio is a terminal RPG about surviving a zombie apocalypse and recovering an artifact. Players choose a character class, fight waves of enemies, and use upgrades to adapt as the encounters get harder. The project brings combat, character progression, and a playable interface together in a Java terminal game.',
  },
  {
    id: 'flow',
    title: 'MaxFlow',
    date: 'Mar 2026',
    month: '2026-03',
    summary: 'Matching conference papers with reviewers.',
    technologies: ['C++'],
    course: 'DA Project 1',
    detail:
      'MaxFlow helps scientific conference organizers assign submissions to qualified reviewers without overloading them. It represents papers, reviewers, and capacity limits as a flow network, then uses Ford–Fulkerson and Edmonds–Karp to find as many valid assignments as possible.',
    url: 'https://github.com/teixeiraa05/da-project',
  },
  {
    id: 'color',
    title: 'Graph Coloring',
    date: 'May 2026',
    month: '2026-05',
    summary: 'Compiler register allocation through graph coloring.',
    technologies: ['C++'],
    course: 'DA Project 2',
    detail:
      'Graph Coloring explores how a compiler can keep more program values in fast CPU registers when only a few registers are available. It models values that are live at the same time as neighbors in a graph, then compares four allocation strategies, including splitting live ranges and moving values to memory when needed. The project received 18.6/20.',
    url: 'https://github.com/teixeiraa05/da-project-2',
  },
  {
    id: 'pulse',
    galleries: [
      {
        title: 'Public pages',
        screenshots: [
          { src: '/projects/pulse/home.webp', caption: 'Home' },
          { src: '/projects/pulse/classes.webp', caption: 'Group classes' },
          { src: '/projects/pulse/login.webp', caption: 'Sign-in' },
          { src: '/projects/pulse/signup.webp', caption: 'Registration' },
        ],
      },
      {
        title: 'Member account',
        screenshots: [
          {
            src: '/projects/pulse/member-dashboard.webp',
            caption: 'Member dashboard',
          },
          {
            src: '/projects/pulse/member-calendar.webp',
            caption: 'Class calendar',
          },
          {
            src: '/projects/pulse/membership.webp',
            caption: 'Membership plans',
          },
          {
            src: '/projects/pulse/equipment.webp',
            caption: 'Equipment availability',
          },
          {
            src: '/projects/pulse/trainers.webp',
            caption: 'Personal trainers',
          },
          {
            src: '/projects/pulse/trainer-profile.webp',
            caption: 'Trainer profile and booking schedule',
          },
        ],
      },
      {
        title: 'Trainer account',
        screenshots: [
          {
            src: '/projects/pulse/trainer-dashboard.webp',
            caption: 'Trainer dashboard and group classes',
          },
          {
            src: '/projects/pulse/trainer-individual.webp',
            caption: 'Individual training schedule',
          },
        ],
      },
      {
        title: 'Admin account',
        screenshots: [
          {
            src: '/projects/pulse/admin-dashboard.webp',
            caption: 'Admin analytics',
          },
          {
            src: '/projects/pulse/admin-users.webp',
            caption: 'User management',
          },
          {
            src: '/projects/pulse/admin-classes.webp',
            caption: 'Class management',
          },
          {
            src: '/projects/pulse/admin-equipment.webp',
            caption: 'Equipment management',
          },
        ],
      },
    ],
    title: 'PulseGym',
    date: 'May 2026',
    month: '2026-05',
    summary: 'Class scheduling and membership management for a gym.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQLite'],
    detail:
      'PulseGym puts gym bookings and day-to-day administration in one web app. Members can find classes, book personal training, and check equipment availability. Trainers can see their schedules and rosters, while administrators manage memberships, class capacity, equipment, and gym-wide activity.',
  },
  {
    id: 'clutch',
    youtubeId: 'JZyJXNlv0VE',
    videoPoster: '/projects/clutch/walkthrough-poster.webp',
    title: 'Clutch',
    date: 'Feb–Jun 2026',
    month: '2026-06',
    summary:
      'A campus peer-tutoring app built by a three-person Software Engineering team.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Convex'],
    detail:
      'Clutch helps FEUP students who get stuck while studying find someone nearby who can help in person. A student selects a course and sends an SOS, then uses the campus map and live chat to meet a peer. They verify the session by QR code and can review each other afterward. Karma, badges, and leaderboards encourage students to keep helping. The app also supports quiet hours, occupancy information, and a separate admin analytics dashboard.',
    galleries: [
      {
        title: 'Screenshots',
        portrait: true,
        screenshots: [
          {
            src: '/projects/clutch/request-help.webp',
            caption: 'Searching for a nearby tutor in the selected course',
          },
          {
            src: '/projects/clutch/session-chat.webp',
            caption:
              'Active tutoring session with a timer, QR verification, and chat',
          },
          {
            src: '/projects/clutch/leaderboard.webp',
            caption: 'Weekly course and individual karma rankings',
          },
        ],
      },
    ],
  },
  {
    id: 'sushi',
    galleries: [
      {
        title: 'Screenshots',
        screenshots: [
          {
            src: '/projects/sushi/menu.webp',
            caption: 'Sushi Slash title screen',
          },
          {
            src: '/projects/sushi/gameplay.webp',
            caption: 'Single-player round on LCOM Arcade',
          },
          { src: '/projects/sushi/bombs.webp', caption: 'A bomb in play' },
          {
            src: '/projects/sushi/game-over.webp',
            caption: 'Game Over and round statistics',
          },
        ],
      },
    ],
    playUrl: 'https://arcade.rgo.pt/share/dr-sushi-slash',
    title: 'Sushi Slash',
    date: 'Jun 2026',
    month: '2026-06',
    summary: 'A sushi-slicing arcade game built for MINIX.',
    technologies: ['C', 'MINIX'],
    detail:
      'Sushi Slash is a reflex arcade game built to put the input and graphics drivers from the MINIX coursework to use. Players slice flying sushi with the mouse, dodge bombs, and use keyboard sequences to defeat bosses. Seeded rounds let players retry the same starting conditions and compare their results.',
    url: 'https://github.com/teixeiraa05/lcom-sushi-slash',
  },
  {
    ongoing: true,
    id: 'openfloat',
    galleries: [
      {
        title: 'Screenshots',
        screenshots: [
          {
            src: '/projects/openfloat/home.webp',
            caption: 'OpenFloat home page',
          },
          {
            src: '/projects/openfloat/market.webp',
            caption: 'Marketplace listings',
          },
        ],
      },
    ],
    title: 'OpenFloat',
    date: 'Sep 2026',
    month: '2026-09',
    summary: 'An open-source marketplace for Counter-Strike 2 items.',
    technologies: ['Laravel', 'PostgreSQL'],
    detail:
      'OpenFloat is an open-source marketplace in development for Counter-Strike 2 collectors. It is designed to let people browse, buy, sell, and auction skins while comparing the details that distinguish individual items, such as float and paint seed.',
    url: 'https://github.com/getopenfloat/openfloat',
  },
  {
    id: 'serial',
    title: 'RC Lab 1',
    date: 'Nov 2026',
    month: '2026-11',
    summary: 'Reliable file transfer over a serial connection.',
    technologies: ['C'],
    detail:
      'RC Lab 1 demonstrates how two computers can transfer a file over an RS-232 serial link even when the connection introduces errors. The application splits a file into packets, and the link layer uses acknowledgements and retransmissions so the receiver can reconstruct the original file.',
    url: 'https://github.com/teixeiraa05/rc_project',
  },
  {
    ongoing: true,
    id: 'tcp',
    title: 'RC Lab 2',
    date: 'Nov 2026',
    month: '2026-11',
    summary: 'An FTP client that downloads files over TCP.',
    technologies: ['C', 'Sockets'],
    detail:
      'RC Lab 2 builds an FTP downloader in C to show how an application-level protocol works over TCP. It takes an FTP URL, handles the server’s replies, opens a separate passive-mode data connection, and writes the file locally while reporting download progress.',
  },
]

export const experience = [
  {
    role: 'Technology Department Member',
    organizations: [{ name: 'JuniFEUP', logo: '/organizations/junifeup.png' }],
    start: 'Oct 2026',
    context: 'Porto',
  },
  {
    role: 'Seasonal Lifeguard',
    organizations: [
      {
        name: 'Bombeiros Voluntários de Valadares',
        logo: '/organizations/bombeiros-valadares.webp',
      },
      {
        name: 'Instituto de Socorros a Náufragos',
        logo: '/organizations/isn.png',
      },
    ],
    start: 'Jun 2025',
    context: 'Valadares',
  },
  {
    role: 'Gulbenkian Merit Scholar',
    organizations: [
      {
        name: 'Fundação Calouste Gulbenkian',
        logo: '/organizations/gulbenkian.svg',
      },
    ],
    start: 'Sep 2024',
    context: 'Portugal',
  },
  {
    role: 'Informatics and Computing Engineering Student',
    organizations: [
      {
        name: 'Faculty of Engineering, University of Porto',
        logo: '/organizations/feup.webp',
      },
    ],
    start: 'Sep 2024',
    context: 'BSc · Expected Jun 2027',
  },
]
