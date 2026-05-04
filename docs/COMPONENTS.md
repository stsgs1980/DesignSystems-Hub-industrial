# UI Components Documentation

## Overview

Проект использует **shadcn/ui** — коллекцию переиспользуемых компонентов, построенных на Radix UI и Tailwind CSS.

**Стиль:** New York  
**Иконки:** Lucide React

---

## Используемые компоненты

### Button

Кнопки для действий и навигации.

```tsx
import { Button } from '@/components/ui/button'

// Варианты
<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Размеры
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// С иконками
<Button className="gap-2">
  <GraduationCap className="w-4 h-4" />
  Начать обучение
</Button>
```

**Использование в проекте:**
- Hero CTA кнопки
- Навигация в header
- Кнопки "Подробнее" в карточках

---

### Badge

Метки для статусов, тегов, категорий.

```tsx
import { Badge } from '@/components/ui/badge'

// Варианты
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>

// Примеры использования
<Badge variant="outline" className="text-[10px] font-mono">
  ADOPT
</Badge>

<Badge variant="secondary" className="text-[10px]">
  cross-platform
</Badge>
```

**Использование в проекте:**
- Tech Radar кольца (ADOPT, TRIAL, ASSESS, HOLD)
- Теги дизайн-систем
- Категории курсов
- Bundle size метки

---

### Card

Карточки для контента.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
    <CardDescription>Описание</CardDescription>
  </CardHeader>
  <CardContent>
    Контент карточки
  </CardContent>
</Card>
```

**Использование в проекте:**
- Карточки дизайн-систем
- Карточки курсов академии
- Карточки Tech Radar

---

### Tabs

Вкладки для переключения контента.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="beginner" onValueChange={setSelectedLevelId}>
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="beginner">Начинающий</TabsTrigger>
    <TabsTrigger value="advanced">Продвинутый</TabsTrigger>
    <TabsTrigger value="expert">Эксперт</TabsTrigger>
  </TabsList>
  
  <TabsContent value="beginner">
    Контент для начинающих
  </TabsContent>
</Tabs>
```

**Использование в проекте:**
- Переключение уровней академии
- Переключение вкладок в Tech Radar

---

### Progress

Индикатор прогресса.

```tsx
import { Progress } from '@/components/ui/progress'

<Progress value={66} />
```

**Потенциальное использование:**
- Прогресс прохождения курса
- Прогресс обучения

---

## Все доступные компоненты

### Layout & Navigation
| Компонент | Описание |
|-----------|----------|
| `Accordion` | Сворачиваемые секции |
| `Breadcrumb` | Хлебные крошки |
| `NavigationMenu` | Навигационное меню |
| `Pagination` | Пагинация |
| `Sidebar` | Боковая панель |
| `Tabs` | Вкладки |

### Forms
| Компонент | Описание |
|-----------|----------|
| `Button` | Кнопка |
| `Checkbox` | Чекбокс |
| `Form` | Форма с валидацией |
| `Input` | Текстовое поле |
| `InputOTP` | OTP ввод |
| `Label` | Метка поля |
| `RadioGroup` | Радио кнопки |
| `Select` | Выпадающий список |
| `Slider` | Слайдер |
| `Switch` | Переключатель |
| `Textarea` | Многострочное поле |

### Feedback
| Компонент | Описание |
|-----------|----------|
| `Alert` | Уведомление |
| `AlertDialog` | Диалог подтверждения |
| `Dialog` | Модальное окно |
| `Drawer` | Выдвижная панель |
| `HoverCard` | Карточка при наведении |
| `Popover` | Всплывающее окно |
| `Sheet` | Боковая панель |
| `Toast` | Toast уведомление |
| `Tooltip` | Подсказка |

### Data Display
| Компонент | Описание |
|-----------|----------|
| `Avatar` | Аватар |
| `Badge` | Метка/тег |
| `Calendar` | Календарь |
| `Card` | Карточка |
| `Carousel` | Карусель |
| `Chart` | Графики |
| `Progress` | Прогресс |
| `Separator` | Разделитель |
| `Skeleton` | Заглушка загрузки |
| `Table` | Таблица |

### Overlay
| Компонент | Описание |
|-----------|----------|
| `ContextMenu` | Контекстное меню |
| `DropdownMenu` | Выпадающее меню |
| `Menubar` | Меню бар |

### Utility
| Компонент | Описание |
|-----------|----------|
| `AspectRatio` | Соотношение сторон |
| `Collapsible` | Сворачиваемый блок |
| `Command` | Command palette |
| `Resizable` | Изменяемые панели |
| `ScrollArea` | Область прокрутки |
| `Toggle` | Переключатель |
| `ToggleGroup` | Группа переключателей |

---

## Стилизация

### Tailwind классы

Компоненты используют Tailwind CSS для стилизации:

```tsx
// Hover эффекты
<Card className="hover:shadow-lg transition-shadow">

// Адаптивность
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Состояния
<Button className="hover:bg-zinc-800 data-[state=active]:bg-zinc-900">
```

### CSS переменные

Тема настраивается через CSS переменные в `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --border: 240 5.9% 90%;
}
```

---

## Framer Motion

Для анимаций используется Framer Motion:

```tsx
import { motion, AnimatePresence } from 'framer-motion'

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Контент
</motion.div>

// Stagger children
<motion.div
  variants={{
    animate: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.name}
    </motion.div>
  ))}
</motion.div>

// AnimatePresence для условного рендеринга
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      Контент
    </motion.div>
  )}
</AnimatePresence>
```

---

## Lucide Icons

Иконки из библиотеки Lucide React:

```tsx
import {
  Layout,
  Palette,
  BookOpen,
  Zap,
  Code2,
  Star,
  ChevronRight,
  ArrowRight,
  // ...
} from 'lucide-react'

// Использование
<Star className="w-4 h-4 text-amber-500" />
<BookOpen className="w-4 h-4" />
```

**Популярные иконки в проекте:**
- `Layout` — Логотип
- `BookOpen` — Курсы/уроки
- `GraduationCap` — Академия
- `Star` — Рейтинги
- `ChevronRight` — Навигация
- `ArrowRight` — CTA кнопки
- `Zap` — Анимации
- `Code2` — Технологии
- `Layers` — Компоненты

