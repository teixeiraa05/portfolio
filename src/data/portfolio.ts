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
  contributions: string[]
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
      'Elio is a terminal RPG about surviving a zombie apocalypse and recovering an artifact. Players choose a character class, fight waves of enemies, and use upgrades to adapt as the encounters get harder. The project brings combat, character progression, and a playable interface together in a Java terminal game.',
  },
  {
    id: 'flow',
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
      'MaxFlow helps scientific conference organizers assign submissions to qualified reviewers without overloading them. It represents papers, reviewers, and capacity limits as a flow network, then uses Ford-Fulkerson and Edmonds-Karp to find as many valid assignments as possible.',
    url: 'https://github.com/teixeiraa05/da-project',
  },
  {
    id: 'color',
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
      'Graph Coloring explores how a compiler can keep more program values in fast CPU registers when only a few registers are available. It models values that are live at the same time as neighbors in a graph, then compares four allocation strategies, including splitting live ranges and moving values to memory when needed. The project received 18.6/20.',
    url: 'https://github.com/teixeiraa05/da-project-2',
  },
  {
    id: 'pulse',
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
      'PulseGym puts gym bookings and day-to-day administration in one web app. Members can find classes, book personal training, and check equipment availability. Trainers can see their schedules and rosters, while administrators manage memberships, class capacity, equipment, and gym-wide activity.',
  },
  {
    id: 'clutch',
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
      'Sushi Slash is a reflex arcade game built to put the input and graphics drivers from the MINIX coursework to use. Players slice flying sushi with the mouse, dodge bombs, and use keyboard sequences to defeat bosses. Seeded rounds let players retry the same starting conditions and compare their results.',
    url: 'https://github.com/teixeiraa05/lcom-sushi-slash',
  },
  {
    ongoing: true,
    id: 'openfloat',
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
    contributions: [
      'Developed a file-transfer application in C over an RS-232 serial link using Stop-and-Wait ARQ.',
      'Worked across packet framing and link-layer reliability, using acknowledgements and retransmissions so the receiver can reconstruct a file when the connection introduces errors.',
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
      'Monitor swimmers and prevent incidents in a high-responsibility environment. Work with fellow lifeguards to protect the public and respond to emergencies, applying clear communication and teamwork.',
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
