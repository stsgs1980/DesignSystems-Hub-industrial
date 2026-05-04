# API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## Endpoints

### 1. GET /api/systems

Возвращает список дизайн-систем и UI библиотек.

**Query Parameters:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| type | string | Фильтр по типу: `system`, `library` |

**Response:**
```json
[
  {
    "id": "material-design",
    "type": "system",
    "name": "Google Material Design",
    "description": "Одна из самых влиятельных дизайн-систем...",
    "attributes": "{\"url\":\"https://material.io/design\",\"components_count\":45}",
    "tags": "[\"cross-platform\",\"animation\",\"android\"]",
    "popularity": 98,
    "gradient": "from-blue-500 to-cyan-500",
    "techRadarRing": "adopt",
    "techRadarReason": "Стандарт индустрии",
    "githubStars": "230K",
    "npmDownloads": "220M/нед",
    "bundleSize": "42 KB",
    "trend": "stable",
    "designRating": 8,
    "integrationRating": 10,
    "learningRating": 8,
    "documentationRating": 10,
    "communityRating": 10,
    "performanceRating": 9
  }
]
```

**Status Codes:**
- `200` — Успешный запрос
- `500` — Ошибка сервера

---

### 2. GET /api/entities

Возвращает все сущности базы данных.

**Response:**
```json
[
  {
    "id": "material-design",
    "type": "system",
    "name": "Google Material Design",
    ...
  },
  {
    "id": "react",
    "type": "technology",
    "name": "React",
    ...
  },
  {
    "id": "atomic-design",
    "type": "principle",
    "name": "Атомарный дизайн",
    ...
  }
]
```

**Типы сущностей:**
- `system` — Дизайн-система
- `library` — UI библиотека
- `technology` — Технология/фреймворк
- `principle` — Принцип/методология

---

### 3. GET /api/tech-radar

Возвращает данные для Tech Radar.

**Response:**
```json
{
  "adopt": {
    "color": "#16a34a",
    "level": 1,
    "technologies": [
      {
        "id": "react",
        "name": "React",
        "reason": "Стандарт индустрии",
        "popularity": 98,
        "bundleSize": "42 KB"
      }
    ]
  },
  "trial": {
    "color": "#0ea5e9",
    "level": 2,
    "technologies": [...]
  },
  "assess": {
    "color": "#f59e0b",
    "level": 3,
    "technologies": [...]
  },
  "hold": {
    "color": "#ef4444",
    "level": 4,
    "technologies": [...]
  }
}
```

**Кольца Tech Radar:**
| Кольцо | Level | Описание |
|--------|-------|----------|
| adopt | 1 | Рекомендуемые технологии |
| trial | 2 | Для экспериментов |
| assess | 3 | Для оценки |
| hold | 4 | С осторожностью |

---

### 4. GET /api/courses

Возвращает курсы академии.

**Response:**
```json
[
  {
    "id": "course-1",
    "name": "Основы дизайн-систем",
    "description": "Базовый курс по дизайн-системам",
    "icon": "BookOpen",
    "lessons": 8,
    "category": "basics",
    "order": 1
  }
]
```

**Категории курсов:**
- `basics` — Основы
- `visual` — Визуальный дизайн
- `animation` — Анимации
- `technical` — Технические аспекты
- `components` — Компоненты
- `process` — Процессы

---

### 5. GET /api/tech-stacks

Возвращает рекомендуемые технологические стеки.

**Response:**
```json
[
  {
    "id": "stack-react",
    "name": "React Starter",
    "description": "Идеальный стек для начинающих",
    "difficulty": "easy",
    "stack": "[\"react\",\"tailwind\",\"shadcn-ui\",\"lucide\"]",
    "useCase": "Первое веб-приложение, портфолио",
    "pros": "[\"Много туториалов\",\"Быстрая разработка\"]",
    "timeToLearn": "1-2 месяца",
    "why": "{\"synergy\":\"React + Tailwind — стандарт индустрии\"}",
    "toolsExplanation": "{...}"
  }
]
```

**Уровни сложности:**
- `easy` — Для начинающих
- `medium` — Средний уровень
- `hard` — Продвинутый

---

### 6. POST /api/seed

Инициализирует базу данных начальными данными.

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "message": "Database seeded successfully",
  "entities": 26,
  "courses": 6,
  "stacks": 4
}
```

**Status Codes:**
- `200` — Успешная инициализация
- `500` — Ошибка при заполнении

---

## Error Handling

Все endpoints возвращают ошибки в едином формате:

```json
{
  "error": "Error message",
  "details": "Detailed error description"
}
```

---

## Rate Limiting

В development режиме нет ограничений на количество запросов.

---

## Caching

Данные кэшируются на уровне Prisma Client. Для обновления данных используйте `POST /api/seed`.

