# Mauve Step — Community Frontend

This repository contains the frontend for **Mauve Step**, created as part of my final apprenticeship project in the **Data Technician education programme with a specialization in programming**.

The full project consists of three connected parts: this frontend application, a backend API hosted in a separate repository, and the **Mauve Step** game developed by my project partner. The frontend serves as the community platform for the game, where players can interact, access useful information, and stay updated on the latest developments.

The application is designed to support the player community by providing features such as forums, leaderboards, game mechanics documentation, support pages, user profiles, and news. Its goal is to create a central hub around the game and improve the overall player experience outside of gameplay.

## Features

- **Forum** — Discuss strategies, share tips, and connect with other players by category.
- **Leaderboard** — Browse and compare high scores from players around the world.
- **Game Mechanics** — In-depth documentation on gameplay mechanics to help you master the dungeon.
- **Support** — Submit bug reports, send feedback, browse the FAQ, or contact the team.
- **User Profiles** — Manage your account and view your stats.
- **News** — Stay updated with the latest announcements and patch notes.
- **Admin Panel** — Tools for moderators to manage community content.

## Tech Stack

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — Type-safe JavaScript
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first styling
- [Axios](https://axios-http.com) — HTTP client for API communication
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/                  # Next.js App Router pages
  forum/              # Forum pages (by category)
  highscore/          # Leaderboard page
  game-mechanics/     # Game mechanics documentation
  support/            # Support pages (FAQ, bug report, feedback, contact)
  profile/            # User profile page
  register/           # Registration page
  admin/              # Admin panel
components/           # Reusable UI components
  layout/             # Page layout components (Header, Footer, Sidebar, etc.)
  forum/              # Forum-specific components
  shared/             # Shared components used across pages
lib/                  # Utilities, API clients, hooks, services, and types
public/               # Static assets
```
