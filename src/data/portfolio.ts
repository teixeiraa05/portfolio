import type { Technology } from './technologies'

export const profile = {
  website: 'https://rteixeira.pt/',
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
  homeTitle?: string
  summary: string
  date: string
  month: string
  technologies: Technology[]
  course?: string
  contributions: string[]
  homeContributions?: string[]
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
    homeContributions: [
      'Implemented enemy wave progression and sword combat in Java.',
      'Built the HUD manager and added JUnit tests for melee and ranged attacks.',
    ],
    contributions: [
      'Contributed to a Java terminal role-playing game in which players choose a character class and fight increasingly difficult waves of enemies.',
      'The project brought combat, character progression, and the terminal interface together so players could adapt their strategy through upgrades.',
    ],
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
      'Elio is a terminal RPG about surviving a zombie apocalypse and recovering an artifact. Players choose a character class and unlock upgrades as the encounters get harder.',
  },
  {
    id: 'flow',
    homeContributions: [
      'Implemented Ford–Fulkerson in C++ and added a menu for choosing between it and Edmonds–Karp.',
      'Exported assignment networks to Graphviz DOT so reviewer matches could be visualized.',
    ],
    contributions: [
      'Worked on translating conference reviewer assignment into a network-flow problem, with constraints for reviewer capacity and subject expertise.',
      'Used Ford-Fulkerson and Edmonds-Karp to maximize valid assignments while respecting reviewer workloads.',
    ],
    title: 'MaxFlow',
    date: 'Mar 2026',
    month: '2026-03',
    summary: 'Matching conference papers with reviewers.',
    technologies: ['C++'],
    course: 'DA Project 1',
    detail:
      'MaxFlow helps scientific conference organizers assign as many submissions as possible to qualified reviewers while respecting each reviewer’s workload limit.',
    url: 'https://github.com/teixeiraa05/da-project',
  },
  {
    id: 'color',
    homeContributions: [
      'Implemented DSATUR graph coloring in C++ to assign registers to live values.',
      'Refined live-range splitting and added split and spill counters to compare allocation strategies.',
    ],
    contributions: [
      'Compared four compiler register-allocation strategies in C++ and used interference graphs to model which values are live at the same time.',
      'Examined how live-range splitting and spilling values to memory affect allocation when registers are limited.',
    ],
    title: 'Graph Coloring',
    date: 'May 2026',
    month: '2026-05',
    summary: 'Compiler register allocation through graph coloring.',
    technologies: ['C++'],
    course: 'DA Project 2',
    detail:
      'Graph Coloring compares four strategies a compiler can use to keep program values in a limited number of CPU registers. Values that are live at the same time are represented as neighbors in an interference graph. The project received 18.6/20.',
    url: 'https://github.com/teixeiraa05/da-project-2',
  },
  {
    id: 'pulse',
    homeContributions: [
      'Implemented sign-up, login, and logout with PHP sessions.',
      'Added live search for users, equipment, and classes using JavaScript fetch requests and parameterized SQLite queries in PHP.',
      'Added personal-training reviews with SQLite storage, PHP validation, and ratings on the member dashboard.',
    ],
    contributions: [
      'Contributed to a gym management application built with where members book classes and personal training.',
      'Helped design workflows for trainers to manage schedules and rosters and for administrators to oversee memberships, capacity, and equipment.',
    ],
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
      'PulseGym is a web app for gym bookings and administration. Members book classes and personal training, trainers manage schedules and rosters, and administrators oversee memberships and equipment.',
  },
  {
    id: 'clutch',
    homeContributions: [
      'Led backlog prioritization and wrote user stories as Product Owner on a three-person Scrum team.',
      'Implemented badge criteria and scheduled weekly leaderboard awards in Convex, with unit tests.',
      'Added public-profile navigation from the React Native leaderboard and tutoring sessions, with Maestro end-to-end tests.',
    ],
    contributions: [
      'Served as Product Owner and developer on a three-person Agile/Scrum team, clarifying requirements, writing user stories, and prioritizing the backlog.',
      'Coordinated with teammates in sprint planning, reviews, and retrospectives.',
      'Implemented features for a mobile app that connects course-based tutoring requests with live chat and QR-code session verification.',
    ],
    youtubeId: 'JZyJXNlv0VE',
    videoPoster: '/projects/clutch/walkthrough-poster.webp',
    title: 'Clutch',
    date: 'Feb-Jun 2026',
    month: '2026-06',
    summary:
      'A campus peer-tutoring app built by a three-person Software Engineering team.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Convex'],
    detail:
      'Clutch is a campus peer-tutoring app for FEUP students. A student requests help for a course, uses the map and chat to meet a peer, and verifies the session with a QR code.',
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
    homeContributions: [
      'Implemented the boss encounter, keyboard combo handling, and boss UI in C.',
      'Fixed mouse-rendering lag on MINIX by reworking input handling in the game loop.',
    ],
    contributions: [
      'Applied MINIX coursework on input and graphics drivers to a playable arcade game in C.',
      'Contributed to a project that combines mouse-driven slicing and keyboard-controlled boss encounters. Seeded rounds let players replay the same starting conditions and compare results.',
    ],
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
      'Sushi Slash is a MINIX arcade game where players slice flying sushi and dodge bombs. They can replay a round with the same seed to compare scores.',
    url: 'https://github.com/teixeiraa05/lcom-sushi-slash',
  },
  {
    ongoing: true,
    id: 'openfloat',
    homeContributions: [
      'Built Laravel admin tools for filtering and editing users and inspecting their inventories.',
      'Implemented listing moderation and report review, with Laravel feature tests for moderation actions.',
    ],
    contributions: [
      'Developing an open-source marketplace for Counter-Strike 2 items. The project translates collector needs into listings that show item-specific details. The marketplace is designed to support buying, selling, and auctions.',
      'Worked on the backoffice for administration of the platform, including user management, item moderation, and analytics.',
    ],
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
    homeContributions: [
      'Implemented packet validation and Stop-and-Wait ARQ in C, including timeout and retry handling.',
      'Evaluated protocol efficiency with Python and plotted the results using Matplotlib.',
    ],
    contributions: [
      'Developed a file-transfer application in C over an RS-232 serial link using Stop-and-Wait ARQ.',
    ],
    title: 'File Transfer Application',
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
    homeTitle: 'FTP Client & Network Analysis',
    contributions: [
      'Developed a command-line FTP client in C that parses an FTP URL, resolves and signs in to the server, then saves the file locally over a separate passive-mode TCP data connection.',
      'The network experiments cover IP addressing and subnetting, two switch bridges, routing between subnets with Linux, NAT on a MikroTik router, and DNS. Packet captures show how ARP, ICMP, and DNS behave in the lab network.',
      'The final experiment tests the downloader end to end and uses Wireshark to trace the FTP control and data connections, study TCP retransmissions and congestion control, and measure how a second download affects throughput.',
    ],
    title: 'RC Lab 2',
    date: 'Nov 2026',
    month: '2026-11',
    summary: 'An FTP downloader in C and a hands-on study of a routed network.',
    technologies: ['C', 'Sockets'],
    detail:
      'A two-part Computer Networks lab that pairs building an FTP client with configuring and analyzing the network it runs on.',
  },
]

export const experience = [
  {
    role: 'Technology Department Member',
    responsibilities:
      'Contributing to an environmental report platform for Quercus as a full-stack developer on a six-person team.',
    organizations: [{ name: 'JuniFEUP', logo: '/organizations/junifeup.png' }],
    start: 'Oct 2026',
    context: 'Porto',
  },
  {
    role: 'Seasonal Lifeguard',
    responsibilities:
      'Monitor swimmers and prevent incidents in a high-responsibility environment. Protect the public and respond to emergencies, applying clear communication and teamwork.',
    organizations: [
      {
        name: 'Associação Humanitária de Bombeiros Voluntários de Valadares',
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
]

export const education = [
  {
    school: 'Faculty of Engineering, University of Porto',
    logo: '/organizations/feup.webp',
    qualification: 'BSc in Informatics and Computing Engineering',
    dates: 'Sep 2024 - present',
    expectedGraduation: 'Jun 2027',
    average: '16.03/20',
  },
  {
    school: 'Escola Secundária da Maia',
    qualification:
      'Science and Technologies with Chemistry and Informatics Applications',
    dates: '2021 - 2024',
  },
]

export const awardsAndCertifications = [
  {
    title: 'Cambridge C2 Proficiency in English · Grade B',
    issuer: 'Cambridge English',
    dates: '2025',
  },
  {
    title: 'Gulbenkian Merit Scholarship',
    issuer: 'Fundação Calouste Gulbenkian',
    logo: '/organizations/gulbenkian.svg',
    dates: '2024 - present',
  },
  {
    title: 'Lifeguard Certification',
    issuer: 'Instituto de Socorros a Náufragos',
    logo: '/organizations/isn.png',
    dates: '2025 - 2028',
  },
]

export const academicMeritAwards = {
  title: 'Merit Awards for Academic Excellence',
  awards: [
    { school: 'Colégio Externato Imaculada Conceição', dates: '2016' },
    { school: 'Escola EB2/3 de Gueifães', dates: '2017 - 2021' },
    { school: 'Escola Secundária da Maia', dates: '2022, 2023, 2024' },
  ],
}
