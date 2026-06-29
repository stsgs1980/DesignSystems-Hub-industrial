# DesignSystems Hub

> Единый центр дизайн-систем. Исследуйте, сравнивайте и выбирайте идеальные дизайн-системы для ваших проектов.


[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square)](https://www.typescriptlang.org)
[![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square)](https://tailwindcss.com)
[![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat-square)](https://vuejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)


## Table of Contents

- [Дизайн-система: Industrial Minimalism](#дизайн-система:-industrial-minimalism)
- [Структура проекта](#структура-проекта)
- [Технологический стек](#технологический-стек)
- [Запуск проекта](#запуск-проекта)
- [Установка зависимостей](#установка-зависимостей)
- [Инициализация базы данных](#инициализация-базы-данных)
- [Запуск в development режиме](#запуск-в-development-режиме)
- [Проверка линтером](#проверка-линтером)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Академия](#академия)
- [Tech Radar](#tech-radar)
- [База данных](#база-данных)
- [UI Компоненты](#ui-компоненты)
- [Правила разработки](#правила-разработки)
- [Ссылки](#ссылки)
- [Автор](#автор)
- [Features](#features)
- [License](#license)

## Дизайн-система: Industrial Minimalism

### Концепция
Индустриальный минимализм — эстетика, вдохновлённая промышленной архитектурой:
- **Сырые материалы**: бетон, сталь, металл
- **Монохром**: чёрный, белый, серый
- **Жёсткие линии**: прямые углы, минимальные скругления
- **Функциональность**: контент важнее декора

### Цветовая палитра
```bash
Основные цвета:
- zinc-900   → Основной текст / Активные элементы
- zinc-500   → Вторичный текст
- zinc-100   → Фон (light mode)
- border     → Разделители, линии

Акценты (минимально):
- emerald    → Success states
- amber      → Warning states  
- red        → Error states
```

### Типографика
```bash
Заголовки: Bold, UPPERCASE, tracking-wider
Основной текст: Normal, leading-relaxed
Мелкий текст: text-xs, text-muted-foreground
```


## Структура проекта

```bash
/home/z/my-project/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Главная страница
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Глобальные стили
│   │   └── api/              # API routes
│   │       ├── systems/      # GET дизайн-системы и библиотеки
│   │       ├── entities/     # GET все сущности
│   │       ├── courses/      # GET курсы академии
│   │       ├── tech-radar/   # GET Tech Radar данные
│   │       ├── tech-stacks/  # GET рекомендуемые стеки
│   │       └── seed/         # POST инициализация БД
│   ├── components/
│   │   └── ui/               # shadcn/ui компоненты (50+)
│   ├── lib/
│   │   ├── data.ts           # Статические данные
│   │   ├── db.ts             # Prisma client
│   │   └── utils.ts          # Утилиты
│   └── hooks/
│       ├── use-mobile.ts     # Mobile detection
│       └── use-toast.ts      # Toast notifications
├── prisma/
│   └── schema.prisma         # Database schema
├── db/
│   └── custom.db             # SQLite database
├── public/                   # Static assets
├── worklog.md                # Журнал изменений
└── README.md                 # Этот файл
```


## Технологический стек

| Категория | Технология | Версия |
|-----------|------------|--------|
| Framework | Next.js | 16 (App Router) |
| UI Library | React | 19 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| UI Components | shadcn/ui | New York style |
| Animations | Framer Motion | 12 |
| Database | Prisma + SQLite | 6 |
| Icons | Lucide React | - |
| Package Manager | Bun | - |


## Запуск проекта

```bash
## Установка зависимостей
bun install

## Инициализация базы данных
bun run db:push

## Запуск в development режиме
bun run dev

## Проверка линтером
bun run lint
```

### Переменные окружения
```env
DATABASE_URL="file:../db/custom.db"
```

## Tech Stack

- **Framework** - Next.js
- **Language** - TypeScript
- **Styling** - Tailwind CSS, CSS
- **Database** - Prisma, SQLite
- **Libraries** - shadcn/ui, Framer Motion
- **Tools** - React, Bun, Vue

## Getting Started

### Prerequisites

- Node.js 20+ or Bun

### Installation

```bash
git clone https://github.com/stsgs1980/DesignSystems-Hub-industrial.git
cd DesignSystems-Hub-industrial
bun install
```

### Run

```bash
bun run dev
```

## API Endpoints

### GET /api/systems
Возвращает дизайн-системы и библиотеки (type: system, library)

**Response:**
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
Возвращает все сущности (systems, libraries, technologies, principles)

### GET /api/tech-radar
Возвращает данные Tech Radar по кольцам

**Response:**
```json
{
  "adopt": {
    "color": "...",
    "level": 1,
    "technologies": [...]
  },
  "trial": {...},
  "assess": {...},
  "hold": {...}
}
```

### GET /api/courses
Возвращает курсы академии

### GET /api/tech-stacks
Возвращает рекомендуемые технологические стеки

### POST /api/seed
Инициализирует базу данных начальными данными


## Академия

### Иерархия обучения

```bash
Уровень 1: НАЧИНАЮЩИЙ
├── Курс: Основы дизайн-систем
│   ├── Модуль: Что такое дизайн-система?
│   ├── Модуль: Зачем нужна дизайн-система?
│   ├── Модуль: Из чего состоит дизайн-система
│   └── Модуль: Примеры успешных систем
└── Курс: Цвет и Типографика
    ├── Модуль: Цветовые модели и теории
    ├── Модуль: Построение цветовой палитры
    ├── Модуль: Типографическая шкала
    └── Модуль: Контраст и доступность

Уровень 2: ПРОДВИНУТЫЙ
├── Курс: Анимации и переходы
└── Курс: Технологии и инструменты

Уровень 3: ЭКСПЕРТ
├── Курс: Компоненты и паттерны
└── Курс: Документация и поддержка
```

### Типы уроков
- `video` — Видеоурок
- `quiz` — Тест
- `article` — Статья
- `practice` — Практическое задание

### Статистика
- **85+ уроков**
- **6 курсов**
- **3 уровня**
- **~24 часа контента**


## Tech Radar

### Кольца радара

| Кольцо | Название | Описание |
|--------|----------|----------|
| ADOPT | Рекомендуемые | Готовы к использованию в production |
| TRIAL | Для экспериментов | Стоит попробовать в экспериментальных проектах |
| ASSESS | Для оценки | Нужно изучить и оценить |
| HOLD | С осторожностью | Не рекомендуются или требуют особого подхода |

### Технологии в радаре

**ADOPT (8):**
- React, Vue.js, Next.js, Astro
- Tailwind CSS, TypeScript
- shadcn/ui, Material Design

**TRIAL (5):**
- Mantine UI, Chakra UI
- Svelte, Framer Motion
- IBM Carbon, Shopify Polaris

**ASSESS (2):**
- Radix UI (headless)

**HOLD (2):**
- Ant Design, Angular


## База данных

### Schema (Prisma)

```prisma
model DesignEntity {
  id                  String   @id
  type                String   // system, library, technology, principle
  name                String
  description         String
  attributes          String   // JSON
  tags                String   // JSON
  popularity          Int
  gradient            String?
  techRadarRing       String?
  techRadarReason     String?
  githubStars         String?
  npmDownloads        String?
  bundleSize          String?
  trend               String?
  // ... ratings
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
  stack           String  // JSON
  useCase         String
  pros            String  // JSON
  timeToLearn     String
}
```


## UI Компоненты

### Используемые в проекте

| Компонент | Использование |
|-----------|---------------|
| Button | CTA, навигация, действия |
| Badge | Теги, статусы, кольца радара |
| Card | Карточки систем, курсов |
| Tabs | Переключение уровней академии |
| Progress | Прогресс обучения |

### Все доступные компоненты (shadcn/ui)
`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toggle`, `tooltip`


## Правила разработки

### Обязательные действия
1. **Бэкап** — сохранять важные файлы перед изменениями
2. **Worklog** — обновлять `worklog.md` после каждой задачи
3. **Git commit** — делать коммиты с понятными сообщениями

### Code Style
- TypeScript strict mode
- ES6+ import/export
- shadcn/ui компоненты предпочтительнее кастомных
- `'use client'` для клиентских компонентов
- Tailwind CSS для стилей

### UI/UX
- Mobile-first подход
- Sticky footer (`min-h-screen flex flex-col`)
- Touch-friendly (минимум 44px touch targets)
- Accessibility (ARIA, alt text, keyboard nav)


## Ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Prisma](https://www.prisma.io/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)


## Автор

DesignSystems Hub — 2025


## Features

- Feature 1 - description
- Feature 2 - description

## License

[MIT](LICENSE)

---
Built with: Next.js + Vue + React + TypeScript
