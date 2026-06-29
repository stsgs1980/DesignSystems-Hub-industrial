# DesignSystems Hub

Central hub for exploring, comparing, and selecting design systems for your projects. Features a Tech Radar, Academy with 85+ lessons across 6 courses, a design system catalog with popularity metrics, and an Industrial Minimalism visual theme built with Next.js 16 and shadcn/ui.

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square)](https://www.typescriptlang.org)
[![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square)](https://tailwindcss.com)
[![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat-square)](https://vuejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Tech Radar](#tech-radar)
- [Academy](#academy)
- [Design System](#design-system)
- [Database Schema](#database-schema)
- [Development Rules](#development-rules)
- [License](#license)

## Features

- Design system catalog with systems and libraries, popularity scores, GitHub stars, bundle sizes, and Tech Radar placement
- Tech Radar with 4 rings (Adopt, Trial, Assess, Hold) covering 17+ technologies
- Academy with 6 courses, 85+ lessons, 3 skill levels (Beginner, Advanced, Expert), and ~24 hours of content
- 4 lesson types: video, quiz, article, practice
- 50+ shadcn/ui components (New York style) with full set including accordion, dialog, sidebar, command, and more
- API endpoints for systems, entities, courses, tech radar, tech stacks, and database seeding
- Recommended tech stacks with difficulty ratings, pros/cons, and use cases
- Industrial Minimalism design theme with zinc palette, bold uppercase headings, and functional aesthetics
- Prisma + SQLite database with DesignEntity, Course, and TechStack models
- Mobile-first responsive layout with accessibility support (ARIA, alt text, keyboard navigation)

## Tech Stack

- **Framework** - Next.js 16 (App Router)
- **UI Library** - React 19
- **Language** - TypeScript 5
- **Styling** - Tailwind CSS 4
- **UI Components** - shadcn/ui (New York style)
- **Animations** - Framer Motion
- **Database** - Prisma ORM + SQLite
- **Icons** - Lucide React
- **Package Manager** - Bun

## Getting Started

### Prerequisites

- Bun

### Installation

```bash
git clone https://github.com/stsgs1980/DesignSystems-Hub-industrial.git
cd DesignSystems-Hub-industrial
bun install
bun run db:push
```

### Run

```bash
bun run dev
```

## Project Structure

- `src/app/page.tsx` - Main page
- `src/app/layout.tsx` - Root layout
- `src/app/globals.css` - Global styles
- `src/app/api/systems/` - GET design systems and libraries
- `src/app/api/entities/` - GET all entities (systems, libraries, technologies, principles)
- `src/app/api/courses/` - GET Academy courses
- `src/app/api/tech-radar/` - GET Tech Radar data
- `src/app/api/tech-stacks/` - GET recommended tech stacks
- `src/app/api/seed/` - POST database initialization
- `src/components/ui/` - shadcn/ui components (50+)
- `src/lib/data.ts` - Static data
- `src/lib/db.ts` - Prisma client
- `src/lib/utils.ts` - Utilities
- `src/hooks/use-mobile.ts` - Mobile detection
- `src/hooks/use-toast.ts` - Toast notifications
- `prisma/schema.prisma` - Database schema
- `db/custom.db` - SQLite database

## API Reference

### GET /api/systems

Returns design systems and libraries (type: system, library).

```json
[
  {
    "id": "material-design",
    "type": "system",
    "name": "Google Material Design",
    "description": "...",
    "popularity": 98,
    "techRadarRing": "adopt",
    "githubStars": "230K",
    "bundleSize": "42 KB"
  }
]
```

### GET /api/entities

Returns all entities (systems, libraries, technologies, principles).

### GET /api/tech-radar

Returns Tech Radar data organized by rings.

```json
{
  "adopt": {
    "color": "...",
    "level": 1,
    "technologies": ["..."]
  },
  "trial": {},
  "assess": {},
  "hold": {}
}
```

### GET /api/courses

Returns Academy courses.

### GET /api/tech-stacks

Returns recommended technology stacks.

### POST /api/seed

Initializes the database with seed data.

## Tech Radar

### Rings

| Ring | Name | Description |
|------|------|-------------|
| ADOPT | Recommended | Ready for production use |
| TRIAL | Experimental | Worth trying in experimental projects |
| ASSESS | Evaluate | Needs study and evaluation |
| HOLD | Cautious | Not recommended or requires special approach |

### Technologies

**ADOPT (8):** React, Vue.js, Next.js, Astro, Tailwind CSS, TypeScript, shadcn/ui, Material Design

**TRIAL (5):** Mantine UI, Chakra UI, Svelte, Framer Motion, IBM Carbon, Shopify Polaris

**ASSESS (2):** Radix UI (headless)

**HOLD (2):** Ant Design, Angular

## Academy

### Learning Hierarchy

**Level 1: Beginner**
- Course: Design System Fundamentals (4 modules: What is a design system, Why you need one, What it consists of, Examples of successful systems)
- Course: Color and Typography (4 modules: Color models and theories, Building a color palette, Typographic scale, Contrast and accessibility)

**Level 2: Advanced**
- Course: Animations and Transitions
- Course: Technologies and Tools

**Level 3: Expert**
- Course: Components and Patterns
- Course: Documentation and Support

### Lesson Types

- `video` - Video lesson
- `quiz` - Quiz
- `article` - Article
- `practice` - Practical assignment

### Statistics

- 85+ lessons
- 6 courses
- 3 levels
- ~24 hours of content

## Design System

Industrial Minimalism -- an aesthetic inspired by industrial architecture:
- Raw materials: concrete, steel, metal
- Monochrome: black, white, gray
- Hard lines: right angles, minimal rounding
- Functionality: content over decoration

**Color palette:**
- zinc-900: primary text / active elements
- zinc-500: secondary text
- zinc-100: background (light mode)
- border: dividers, lines
- emerald: success states
- amber: warning states
- red: error states

**Typography:**
- Headings: Bold, UPPERCASE, tracking-wider
- Body: Normal, leading-relaxed
- Small: text-xs, text-muted-foreground

## Database Schema

```prisma
model DesignEntity {
  id                  String   @id
  type                String
  name                String
  description         String
  attributes          String
  tags                String
  popularity          Int
  gradient            String?
  techRadarRing       String?
  techRadarReason     String?
  githubStars         String?
  npmDownloads        String?
  bundleSize          String?
  trend               String?
}

model Course {
  id          String @id
  name        String
  description String
  icon        String
  lessons     Int
  category    String
  order       Int
}

model TechStack {
  id              String @id
  name            String
  description     String
  difficulty      String
  stack           String
  useCase         String
  pros            String
  timeToLearn     String
}
```

## Development Rules

1. Backup important files before making changes
2. Update `worklog.md` after each task
3. Commit with clear messages
4. TypeScript strict mode
5. ES6+ import/export
6. Prefer shadcn/ui components over custom ones
7. Use `'use client'` for client components
8. Tailwind CSS for all styling
9. Mobile-first approach with sticky footer (`min-h-screen flex flex-col`)
10. Touch-friendly (minimum 44px touch targets)
11. Accessibility (ARIA, alt text, keyboard navigation)

## License

[MIT](LICENSE)

---
Built with: Next.js + React + TypeScript + Tailwind CSS