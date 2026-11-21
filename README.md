# Rodrigo Teixeira’s portfolio

A single-page portfolio built with React, TypeScript, Tailwind CSS and Vite.

Run `npm ci` to install dependencies and `npm run dev` to start the local site.
Use `npm run build`, `npm run lint` and `npm run format:check` to validate changes.

Project descriptions, dates, experience and contact details live in `src/data/portfolio.ts`.
Page sections live in `src/sections` and shared interface components in `src/components`.

The contribution calendar uses the checked-in snapshot in `src/data/github.json`.
Run `npm run activity:refresh` to update that snapshot before building.
