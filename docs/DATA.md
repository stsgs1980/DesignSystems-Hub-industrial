# Data Structure Documentation

## Overview

Проект использует Prisma ORM с SQLite базой данных. Данные хранятся в `/db/custom.db`.

---

## Models

### DesignEntity

Основная модель для хранения всех сущностей (системы, библиотеки, технологии, принципы).

```prisma
model DesignEntity {
  id                  String   @id @default(cuid())
  type                String   // system, library, technology, principle
  name                String
  description         String   @db.Text
  attributes          String   @db.Text  // JSON
  tags                String   @db.Text  // JSON
  source              String?
  popularity          Int      @default(0)
  gradient            String?
  techRadarRing       String?
  techRadarReason     String?
  techRadarCategory   String?
  
  // Ratings (1-10)
  designRating        Int      @default(0)
  integrationRating   Int      @default(0)
  learningRating      Int      @default(0)
  documentationRating Int      @default(0)
  communityRating     Int      @default(0)
  performanceRating   Int      @default(0)
  
  // Stats
  githubStars         String?
  npmDownloads        String?
  bundleSize          String?
  bundleSizeBytes     Int      @default(0)
  lastUpdate          String?
  contributors        String?
  releases            String?
  securityScore       String?
  dependencies        String?
  
  // Flags
  difficulty          Int      @default(1)
  trend               String?
  recommended         Boolean  @default(false)
  beginnerFriendly    Boolean  @default(false)
  maintained          Boolean  @default(true)
  openSource          Boolean  @default(true)
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

#### Типы сущностей (type)

| Значение | Описание | Примеры |
|----------|----------|---------|
| `system` | Дизайн-система | Material Design, Apple HIG, Carbon |
| `library` | UI библиотека | shadcn/ui, Mantine, Chakra UI |
| `technology` | Технология/фреймворк | React, Vue, Next.js, Tailwind |
| `principle` | Принцип/методология | Atomic Design, Design Tokens |

#### Кольца Tech Radar (techRadarRing)

| Значение | Описание |
|----------|----------|
| `adopt` | Рекомендуемые |
| `trial` | Для экспериментов |
| `assess` | Для оценки |
| `hold` | С осторожностью |

#### JSON поля

**attributes:**
```json
{
  "url": "https://material.io/design",
  "components_count": 45,
  "features": ["Полный набор компонентов", "Иконки"],
  "color": "#4285f4",
  "maintainer": "Google",
  "platforms": ["iOS", "android", "Web"]
}
```

**tags:**
```json
["cross-platform", "animation", "android", "material-you"]
```

---

### Course

Модель для курсов академии.

```prisma
model Course {
  id          String   @id @default(cuid())
  name        String
  description String   @db.Text
  icon        String
  lessons     Int      @default(0)
  category    String
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Категории (category)

| Значение | Описание |
|----------|----------|
| `basics` | Основы дизайн-систем |
| `visual` | Цвет и типографика |
| `animation` | Анимации и переходы |
| `technical` | Технологии и инструменты |
| `components` | Компоненты и паттерны |
| `process` | Документация и поддержка |

#### Иконки (icon)

Используются иконки из Lucide React:
- `BookOpen` — Основы
- `Palette` — Цвет/Типографика
- `Zap` — Анимации
- `Code2` — Технологии
- `Layers` — Компоненты
- `FileText` — Документация

---

### TechStack

Модель для рекомендуемых технологических стеков.

```prisma
model TechStack {
  id              String   @id @default(cuid())
  name            String
  description     String   @db.Text
  difficulty      String
  stack           String   @db.Text  // JSON
  useCase         String   @db.Text
  pros            String   @db.Text  // JSON
  timeToLearn     String   @db.Text
  why             String   @db.Text  // JSON
  toolsExplanation String  @db.Text  // JSON
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

#### JSON поля

**stack:**
```json
["react", "tailwind", "shadcn-ui", "lucide"]
```

**pros:**
```json
["Много туториалов", "Быстрая разработка", "Полный контроль кода"]
```

**why:**
```json
{
  "synergy": "React + Tailwind — стандарт индустрии",
  "problem": "Решает проблему 'с чего начать'",
  "alternative": "НЕ выбирай, если нужен SSR/SEO"
}
```

**toolsExplanation:**
```json
{
  "framework": "React — самая популярная библиотека",
  "styling": "Tailwind CSS — utility-first подход",
  "components": "shadcn-ui — НЕ npm пакет! Код копируется",
  "icons": "Lucide — 1000+ иконок, tree-shakeable"
}
```

---

## Initial Data

Данные для инициализации базы находятся в `/src/lib/data.ts`.

### Экспорты

```typescript
// Дизайн-системы, библиотеки, технологии, принципы
export const designEntitiesData: DesignEntity[] = [...]

// Шаги обучения
export const learningStepsData: LearningStep[] = [...]

// Курсы академии
export const coursesData: Course[] = [...]

// Технологические стеки
export const techStacksData: TechStack[] = [...]
```

### Количество записей

| Коллекция | Количество |
|-----------|------------|
| designEntitiesData | 26 |
| learningStepsData | 6 |
| coursesData | 6 |
| techStacksData | 4 |

---

## Database Operations

### Инициализация

```bash
bun run db:push
```

### Seed данных

```bash
curl -X POST http://localhost:3000/api/seed
```

### Prisma Studio

```bash
bunx prisma studio
```

---

## Relationships

На данный момент связи между таблицами не реализованы. Данные связаны логически через `id` и JSON поля.

### Планируемые связи

```
Course 1:N Module 1:N Lesson
TechStack N:M DesignEntity (через tags)
```

