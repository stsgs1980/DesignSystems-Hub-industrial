'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layout,
  Palette,
  BookOpen,
  Zap,
  Code2,
  Sparkles,
  Star,
  Layers,
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  Database,
  Settings,
  Compass,
  ArrowRight,
  ArrowLeft,
  Target,
  Clock,
  Award,
  FileText,
  Lock,
  CheckCircle2,
  Play,
  FileCheck,
  ChevronDown,
  ExternalLink,
  Brackets,
  Square,
  Info,
  TrendingUp,
  Package,
  Users,
  Braces,
  User,
  Download,
} from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ThemeToggle } from '@/components/theme/theme-toggle'

// Types
interface DesignEntity {
  id: string
  type: string
  name: string
  description: string
  attributes: string
  tags: string
  popularity: number
  gradient: string
  techRadarRing: string
  techRadarReason: string
  githubStars: string
  npmDownloads: string
  bundleSize: string
  trend: string
}

interface TechRadarData {
  adopt: { color: string; level: number; technologies: Array<{ id: string; name: string; reason: string; popularity: number; bundleSize: string }> }
  trial: { color: string; level: number; technologies: Array<{ id: string; name: string; reason: string; popularity: number; bundleSize: string }> }
  assess: { color: string; level: number; technologies: Array<{ id: string; name: string; reason: string; popularity: number; bundleSize: string }> }
  hold: { color: string; level: number; technologies: Array<{ id: string; name: string; reason: string; popularity: number; bundleSize: string }> }
}

// Brand SVG Logos
const BrandLogos = {
  // Material Design (Google)
  MaterialDesign: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#757575" d="M2.5 4v16h4v-8l5 6 5-6v8h4V4l-9 11-9-11z"/>
    </svg>
  ),
  
  // Apple
  Apple: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  
  // IBM Carbon
  Carbon: () => (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <path fill="#161616" d="M8 2v4h16V2H8zm0 6v4h16V8H8zm0 6v4h16v-4H8zm0 6v4h16v-4H8zm0 6v4h16v-4H8z"/>
    </svg>
  ),
  
  // Salesforce
  Salesforce: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#00A1E0" d="M10.01 4.6c1.1-1.2 2.7-1.9 4.4-1.9 2.4 0 4.5 1.3 5.6 3.3 1-.3 2-.2 2.9.2 1.1.5 1.9 1.5 2.1 2.7 1.3.4 2.3 1.6 2.3 3 0 1.8-1.4 3.2-3.2 3.2H5.2c-2.3 0-4.2-1.9-4.2-4.2 0-2.1 1.5-3.8 3.5-4.1.4-2.1 2.3-3.7 4.5-3.7.4 0 .7 0 1.1.1.2.1.3.2.5.3.1.1.2.1.3.2.1-.1.2-.1.2-.1z"/>
    </svg>
  ),
  
  // Fluent UI (Microsoft)
  FluentUI: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#7FBA00" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  
  // Ant Design
  AntDesign: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#1890FF" d="M12 2L2 19h5.5l1.5-3h6l1.5 3H22L12 2zm0 5.5L14.5 13h-5L12 7.5z"/>
    </svg>
  ),
  
  // Chakra UI
  ChakraUI: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#319795" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path fill="#319795" d="M6.5 12l4.5-6v4h3l-4.5 6v-4h-3z"/>
    </svg>
  ),
  
  // Mantine
  Mantine: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="#339AF0"/>
      <path fill="white" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),
  
  // Tailwind
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#38BDF8" d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5 0.76 0.19 1.31 0.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-0.76-0.19-1.3-0.74-1.91-1.35C15.61 7.15 14.48 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5 0.76 0.19 1.3 0.74 1.91 1.35C8.39 16.85 9.52 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-0.76-0.19-1.3-0.74-1.91-1.35C10.61 13.15 9.48 12 7 12z"/>
    </svg>
  ),
  
  // shadcn/ui
  Shadcn: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="currentColor" d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z"/>
    </svg>
  ),
  
  // Radix UI
  RadixUI: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="3" fill="#7C3AED"/>
      <circle cx="12" cy="5" r="2" fill="#7C3AED"/>
      <circle cx="12" cy="19" r="2" fill="#7C3AED"/>
      <circle cx="5" cy="12" r="2" fill="#7C3AED"/>
      <circle cx="19" cy="12" r="2" fill="#7C3AED"/>
    </svg>
  ),
  
  // Headless UI
  HeadlessUI: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#66E3FF" strokeWidth="2"/>
      <rect x="8" y="8" width="8" height="8" rx="1" fill="#66E3FF"/>
    </svg>
  ),
  
  // Material UI (MUI)
  MUI: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="#1976D2" d="M2.5 4v11.5l3.5-2V9l4.5 2.5L15 9v4.5l-4.5 2.5v4l4.5-2.5 4.5 2.5V4l-8.5 5L2.5 4z"/>
      <path fill="#1976D2" d="M2.5 17v3l8.5 5v-4l-8.5-4z"/>
    </svg>
  ),
}

// Industrial Minimalism Color Palette
const industrial = {
  concrete: 'bg-zinc-100 dark:bg-zinc-900',
  steel: 'bg-zinc-200 dark:bg-zinc-800',
  metal: 'bg-zinc-300 dark:bg-zinc-700',
  dark: 'bg-zinc-900 dark:bg-zinc-100',
  rust: 'bg-amber-600',
  copper: 'bg-orange-500',
}

// Tech Radar Ring - Unified Industrial Style
const ringConfig = {
  adopt: { label: 'ADOPT', desc: 'Рекомендуемые', ring: 1 },
  trial: { label: 'TRIAL', desc: 'Для экспериментов', ring: 2 },
  assess: { label: 'ASSESS', desc: 'Для оценки', ring: 3 },
  hold: { label: 'HOLD', desc: 'С осторожностью', ring: 4 },
}

// UI Libraries for comparison
const uiLibraries = [
  { id: 'shadcn', name: 'shadcn/ui', color: 'foreground', popular: true },
  { id: 'mui', name: 'Material UI', color: 'blue', popular: true },
  { id: 'chakra', name: 'Chakra UI', color: 'teal', popular: true },
  { id: 'mantine', name: 'Mantine', color: 'indigo', popular: true },
  { id: 'ant', name: 'Ant Design', color: 'red', popular: true },
]

// Preview modes for second level tabs
const previewModes = [
  { id: 'preview', name: 'Preview', icon: Layers },
  { id: 'code', name: 'Code', icon: Code2 },
  { id: 'props', name: 'Props', icon: Braces },
]

// Components data with multi-library support
const uiComponents = {
  categories: [
    {
      id: 'layout',
      name: 'Layout & Navigation',
      icon: Layers,
      components: [
        { 
          name: 'Accordion', 
          desc: 'Сворачиваемые панели контента',
          code: {
            shadcn: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>`,
            mui: `import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

<Accordion>
  <AccordionSummary expandIcon={<ExpandMore />}>
    Section 1
  </AccordionSummary>
  <AccordionDetails>Content here</AccordionDetails>
</Accordion>`,
            chakra: `import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

<Accordion>
  <AccordionItem>
    <AccordionButton>
      Section 1 <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>Content here</AccordionPanel>
  </AccordionItem>
</Accordion>`,
            mantine: `import { Accordion } from '@mantine/core'

<Accordion>
  <Accordion.Item value="item-1">
    <Accordion.Control>Section 1</Accordion.Control>
    <Accordion.Panel>Content here</Accordion.Panel>
  </Accordion.Item>
</Accordion>`,
            ant: `import { Collapse } from 'antd'

<Collapse>
  <Collapse.Panel header="Section 1" key="1">
    Content here
  </Collapse.Panel>
</Collapse>`
          }
        },
        { 
          name: 'Breadcrumb', 
          desc: 'Навигационные хлебные крошки',
          code: {
            shadcn: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
            mui: `import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

<Breadcrumbs>
  <Link href="/">Home</Link>
  <Link href="/components">Components</Link>
</Breadcrumbs>`,
            chakra: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/components">Components</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>`,
            mantine: `import { Breadcrumb } from '@mantine/core'

<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
</Breadcrumb>`,
            ant: `import { Breadcrumb } from 'antd'

<Breadcrumb>
  <Breadcrumb.Item>Home</Breadcrumb.Item>
  <Breadcrumb.Item>Components</Breadcrumb.Item>
</Breadcrumb>`
          }
        },
        { 
          name: 'Navigation Menu', 
          desc: 'Горизонтальное навигационное меню',
          code: {
            shadcn: `import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/">Home</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about">About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
            mui: `import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

<Menu anchorEl={anchorEl} open={open}>
  <MenuItem>Home</MenuItem>
  <MenuItem>About</MenuItem>
</Menu>`,
            chakra: `import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

<Menu>
  <MenuButton>Navigation</MenuButton>
  <MenuList>
    <MenuItem>Home</MenuItem>
    <MenuItem>About</MenuItem>
  </MenuList>
</Menu>`,
            mantine: `import { Menu } from '@mantine/core'

<Menu>
  <Menu.Target>
    <Button>Navigation</Button>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Item>Home</Menu.Item>
    <Menu.Item>About</Menu.Item>
  </Menu.Dropdown>
</Menu>`,
            ant: `import { Menu } from 'antd'

<Menu mode="horizontal">
  <Menu.Item key="home">Home</Menu.Item>
  <Menu.Item key="about">About</Menu.Item>
</Menu>`
          }
        },
        { 
          name: 'Pagination', 
          desc: 'Пагинация для списков',
          code: {
            shadcn: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
            mui: `import Pagination from '@mui/material/Pagination'

<Pagination count={10} page={1} onChange={handleChange} />`,
            chakra: `import { Pagination } from '@chakra-ui/react'

<Pagination count={10} page={1} onChange={handleChange} />`,
            mantine: `import { Pagination } from '@mantine/core'

<Pagination total={10} value={1} onChange={handleChange} />`,
            ant: `import { Pagination } from 'antd'

<Pagination current={1} total={100} onChange={handleChange} />`
          }
        },
        { 
          name: 'Sidebar', 
          desc: 'Боковая панель навигации',
          code: {
            shadcn: `import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

<Sidebar>
  <SidebarContent>
    <SidebarMenu>
      <SidebarMenuItem>Dashboard</SidebarMenuItem>
      <SidebarMenuItem>Settings</SidebarMenuItem>
    </SidebarMenu>
  </SidebarContent>
</Sidebar>`,
            mui: `import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

<Drawer open={open}>
  <List>
    <ListItem>Dashboard</ListItem>
    <ListItem>Settings</ListItem>
  </List>
</Drawer>`,
            chakra: `import { Drawer, DrawerBody, VStack } from '@chakra-ui/react'

<Drawer isOpen={isOpen}>
  <DrawerBody>
    <VStack>
      <Button>Dashboard</Button>
      <Button>Settings</Button>
    </VStack>
  </DrawerBody>
</Drawer>`,
            mantine: `import { Navbar } from '@mantine/core'

<Navbar>
  <Navbar.Section>Dashboard</Navbar.Section>
  <Navbar.Section>Settings</Navbar.Section>
</Navbar>`,
            ant: `import { Menu } from 'antd'

<Menu mode="inline" style={{ width: 256 }}>
  <Menu.Item>Dashboard</Menu.Item>
  <Menu.Item>Settings</Menu.Item>
</Menu>`
          }
        },
        { 
          name: 'Tabs', 
          desc: 'Вкладки для переключения контента',
          code: {
            shadcn: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
            mui: `import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

<Tabs value={value} onChange={handleChange}>
  <Tab label="Tab 1" />
  <Tab label="Tab 2" />
</Tabs>`,
            chakra: `import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>`,
            mantine: `import { Tabs } from '@mantine/core'

<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>`,
            ant: `import { Tabs } from 'antd'

<Tabs items={[
  { key: '1', label: 'Tab 1', children: 'Content 1' },
  { key: '2', label: 'Tab 2', children: 'Content 2' },
]} />`
          }
        },
      ]
    },
    {
      id: 'forms',
      name: 'Forms',
      icon: FileText,
      components: [
        { 
          name: 'Button', 
          desc: 'Кнопка для действий',
          code: {
            shadcn: `import { Button } from "@/components/ui/button"

<Button variant="outline">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>`,
            mui: `import Button from '@mui/material/Button'

<Button variant="outlined">Click me</Button>
<Button variant="contained">Primary</Button>
<Button size="small">Small</Button>`,
            chakra: `import { Button } from '@chakra-ui/react'

<Button variant="outline">Click me</Button>
<Button colorScheme="red">Delete</Button>
<Button size="sm">Small</Button>`,
            mantine: `import { Button } from '@mantine/core'

<Button variant="outline">Click me</Button>
<Button color="red">Delete</Button>
<Button size="sm">Small</Button>`,
            ant: `import { Button } from 'antd'

<Button type="default">Click me</Button>
<Button danger>Delete</Button>
<Button size="small">Small</Button>`
          }
        },
        { 
          name: 'Input', 
          desc: 'Текстовое поле ввода',
          code: {
            shadcn: `import { Input } from "@/components/ui/input"

<Input placeholder="Enter text..." />
<Input type="email" />`,
            mui: `import TextField from '@mui/material/TextField'

<TextField placeholder="Enter text..." />
<TextField type="email" />`,
            chakra: `import { Input } from '@chakra-ui/react'

<Input placeholder="Enter text..." />
<Input type="email" />`,
            mantine: `import { TextInput } from '@mantine/core'

<TextInput placeholder="Enter text..." />`,
            ant: `import { Input } from 'antd'

<Input placeholder="Enter text..." />`
          }
        },
        { 
          name: 'Checkbox', 
          desc: 'Чекбокс для множественного выбора',
          code: {
            shadcn: `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox id="terms" />
<label htmlFor="terms">Accept terms</label>`,
            mui: `import Checkbox from '@mui/material/Checkbox'

<Checkbox checked={checked} onChange={handleChange} />`,
            chakra: `import { Checkbox } from '@chakra-ui/react'

<Checkbox>Accept terms</Checkbox>`,
            mantine: `import { Checkbox } from '@mantine/core'

<Checkbox label="Accept terms" checked={checked} onChange={handleChange} />`,
            ant: `import { Checkbox } from 'antd'

<Checkbox checked={checked} onChange={handleChange}>Accept terms</Checkbox>`
          }
        },
        { 
          name: 'Form', 
          desc: 'Форма с валидацией (react-hook-form)',
          code: {
            shadcn: `import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

const form = useForm()

<Form {...form}>
  <FormField name="username" render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl><Input {...field} /></FormControl>
    </FormItem>
  )} />
</Form>`,
            mui: `import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'

<form onSubmit={handleSubmit(onSubmit)}>
  <TextField {...register('username')} label="Username" />
</form>`,
            chakra: `import { useForm } from 'react-hook-form'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

<form onSubmit={handleSubmit(onSubmit)}>
  <FormControl>
    <FormLabel>Username</FormLabel>
    <Input {...register('username')} />
  </FormControl>
</form>`,
            mantine: `import { useForm } from '@mantine/form'
import { TextInput, Button } from '@mantine/core'

const form = useForm({ initialValues: { username: '' } })

<form onSubmit={form.onSubmit(onSubmit)}>
  <TextInput label="Username" {...form.getInputProps('username')} />
</form>`,
            ant: `import { Form, Input } from 'antd'

<Form form={form} onFinish={onSubmit}>
  <Form.Item name="username" label="Username">
    <Input />
  </Form.Item>
</Form>`
          }
        },
        { 
          name: 'Input OTP', 
          desc: 'Поле для OTP кода',
          code: {
            shadcn: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
</InputOTP>`,
            mui: `import TextField from '@mui/material/TextField'

<TextField inputProps={{ maxLength: 6 }} placeholder="Enter OTP" />`,
            chakra: `import { HStack, Input } from '@chakra-ui/react'

<HStack>
  <Input maxLength={1} w="40px" />
  <Input maxLength={1} w="40px" />
  <Input maxLength={1} w="40px" />
</HStack>`,
            mantine: `import { PinInput } from '@mantine/core'

<PinInput length={6} />`,
            ant: `import { Input } from 'antd'

<Input.OTP length={6} />`
          }
        },
        { 
          name: 'Label', 
          desc: 'Метка для поля формы',
          code: {
            shadcn: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`,
            mui: `import InputLabel from '@mui/material/InputLabel'

<InputLabel htmlFor="email">Email</InputLabel>`,
            chakra: `import { FormLabel } from '@chakra-ui/react'

<FormLabel htmlFor="email">Email</FormLabel>`,
            mantine: `import { Label } from '@mantine/core'

<Label htmlFor="email">Email</Label>`,
            ant: `import { Form } from 'antd'

<Form.Item label="Email">
  <Input />
</Form.Item>`
          }
        },
        { 
          name: 'Radio Group', 
          desc: 'Группа радио-кнопок',
          code: {
            shadcn: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>`,
            mui: `import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

<RadioGroup value={value} onChange={handleChange}>
  <FormControlLabel value="opt1" control={<Radio />} label="Option 1" />
  <FormControlLabel value="opt2" control={<Radio />} label="Option 2" />
</RadioGroup>`,
            chakra: `import { Radio, RadioGroup } from '@chakra-ui/react'

<RadioGroup defaultValue="opt1">
  <Radio value="opt1">Option 1</Radio>
  <Radio value="opt2">Option 2</Radio>
</RadioGroup>`,
            mantine: `import { Radio } from '@mantine/core'

<Radio.Group defaultValue="opt1">
  <Radio value="opt1" label="Option 1" />
  <Radio value="opt2" label="Option 2" />
</Radio.Group>`,
            ant: `import { Radio } from 'antd'

<Radio.Group defaultValue="opt1">
  <Radio value="opt1">Option 1</Radio>
  <Radio value="opt2">Option 2</Radio>
</Radio.Group>`
          }
        },
        { 
          name: 'Select', 
          desc: 'Выпадающий список выбора',
          code: {
            shadcn: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Option 1</SelectItem>
    <SelectItem value="opt2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
            mui: `import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

<Select value={value} onChange={handleChange}>
  <MenuItem value="opt1">Option 1</MenuItem>
  <MenuItem value="opt2">Option 2</MenuItem>
</Select>`,
            chakra: `import { Select } from '@chakra-ui/react'

<Select placeholder="Select option">
  <option value="opt1">Option 1</option>
  <option value="opt2">Option 2</option>
</Select>`,
            mantine: `import { Select } from '@mantine/core'

<Select
  data={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]}
/>`,
            ant: `import { Select } from 'antd'

<Select defaultValue="opt1">
  <Select.Option value="opt1">Option 1</Select.Option>
  <Select.Option value="opt2">Option 2</Select.Option>
</Select>`
          }
        },
        { 
          name: 'Slider', 
          desc: 'Слайдер для выбора значения',
          code: {
            shadcn: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,
            mui: `import Slider from '@mui/material/Slider'

<Slider defaultValue={50} aria-label="Default" />`,
            chakra: `import { Slider } from '@chakra-ui/react'

<Slider defaultValue={50}>
  <SliderTrack>
    <SliderFilledTrack />
  </SliderTrack>
  <SliderThumb />
</Slider>`,
            mantine: `import { Slider } from '@mantine/core'

<Slider defaultValue={50} />`,
            ant: `import { Slider } from 'antd'

<Slider defaultValue={50} />`
          }
        },
        { 
          name: 'Switch', 
          desc: 'Переключатель on/off',
          code: {
            shadcn: `import { Switch } from "@/components/ui/switch"

<Switch />`,
            mui: `import Switch from '@mui/material/Switch'

<Switch checked={checked} onChange={handleChange} />`,
            chakra: `import { Switch } from '@chakra-ui/react'

<Switch isChecked={checked} onChange={handleChange} />`,
            mantine: `import { Switch } from '@mantine/core'

<Switch checked={checked} onChange={handleChange} />`,
            ant: `import { Switch } from 'antd'

<Switch checked={checked} onChange={handleChange} />`
          }
        },
        { 
          name: 'Textarea', 
          desc: 'Многострочное текстовое поле',
          code: {
            shadcn: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Enter your message" />`,
            mui: `import TextField from '@mui/material/TextField'

<TextField multiline rows={4} placeholder="Enter your message" />`,
            chakra: `import { Textarea } from '@chakra-ui/react'

<Textarea placeholder="Enter your message" />`,
            mantine: `import { Textarea } from '@mantine/core'

<Textarea placeholder="Enter your message" rows={4} />`,
            ant: `import { Input } from 'antd'

<Input.TextArea rows={4} placeholder="Enter your message" />`
          }
        },
      ]
    },
    {
      id: 'feedback',
      name: 'Feedback',
      icon: Zap,
      components: [
        { 
          name: 'Alert', 
          desc: 'Уведомление о статусе',
          code: {
            shadcn: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Внимание!</AlertTitle>
  <AlertDescription>
    Это важное уведомление.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Ошибка</AlertTitle>
  <AlertDescription>Что-то пошло не так.</AlertDescription>
</Alert>`,
            mui: `import Alert from '@mui/material/Alert'

<Alert severity="warning">Внимание!</Alert>
<Alert severity="error">Ошибка!</Alert>`,
            chakra: `import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

<Alert status="warning">
  <AlertIcon />
  <AlertTitle>Внимание!</AlertTitle>
</Alert>`,
            mantine: `import { Alert } from '@mantine/core'

<Alert title="Внимание!" color="yellow">
  Это важное уведомление.
</Alert>`,
            ant: `import { Alert } from 'antd'

<Alert message="Внимание!" type="warning" />
<Alert message="Ошибка!" type="error" />`
          }
        },
        { 
          name: 'Dialog', 
          desc: 'Модальное окно',
          code: {
            shadcn: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Открыть</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Заголовок</DialogTitle>
      <DialogDescription>
        Описание диалога
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
            mui: `import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Заголовок</DialogTitle>
  <DialogContent>Контент</DialogContent>
</Dialog>`,
            chakra: `import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react'

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Заголовок</ModalHeader>
    <ModalBody>Контент</ModalBody>
  </ModalContent>
</Modal>`,
            mantine: `import { Modal } from '@mantine/core'

<Modal opened={opened} onClose={close} title="Заголовок">
  Контент модального окна
</Modal>`,
            ant: `import { Modal } from 'antd'

<Modal title="Заголовок" open={isOpen} onOk={handleOk}>
  Контент модального окна
</Modal>`
          }
        },
        { 
          name: 'Toast', 
          desc: 'Всплывающее уведомление',
          code: {
            shadcn: `import { useToast } from "@/components/ui/use-toast"

const toast = useToast()

toast({
  title: "Успешно!",
  description: "Данные сохранены.",
})`,
            mui: `import { useSnackbar } from 'notistack'

const { enqueueSnackbar } = useSnackbar()
enqueueSnackbar('Успешно!', { variant: 'success' })`,
            chakra: `import { useToast } from '@chakra-ui/react'

const toast = useToast()
toast({
  title: 'Успешно!',
  status: 'success',
  duration: 3000,
})`,
            mantine: `import { useMantineTheme, notifications } from '@mantine/notifications'

notifications.show({
  title: 'Успешно!',
  message: 'Данные сохранены',
  color: 'green',
})`,
            ant: `import { message } from 'antd'

message.success('Успешно!')
message.error('Ошибка!')`
          }
        },
        { 
          name: 'Tooltip', 
          desc: 'Подсказка при наведении',
          code: {
            shadcn: `import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Наведи</TooltipTrigger>
    <TooltipContent>
      <p>Подсказка</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
            mui: `import Tooltip from '@mui/material/Tooltip'

<Tooltip title="Подсказка">
  <Button>Наведи</Button>
</Tooltip>`,
            chakra: `import { Tooltip } from '@chakra-ui/react'

<Tooltip label="Подсказка">
  <Button>Наведи</Button>
</Tooltip>`,
            mantine: `import { Tooltip } from '@mantine/core'

<Tooltip label="Подсказка">
  <Button>Наведи</Button>
</Tooltip>`,
            ant: `import { Tooltip } from 'antd'

<Tooltip title="Подсказка">
  <Button>Наведи</Button>
</Tooltip>`
          }
        },
        { 
          name: 'Alert Dialog', 
          desc: 'Диалог подтверждения действия',
          code: {
            shadcn: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

<AlertDialog open={open}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
            mui: `import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

<Dialog open={open}>
  <DialogContent>Are you sure?</DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogActions>
</Dialog>`,
            chakra: `import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'

<AlertDialog isOpen={isOpen} onClose={onClose}>
  <AlertDialogOverlay>
    <AlertDialogContent>
      <AlertDialogHeader>Are you sure?</AlertDialogHeader>
      <AlertDialogBody>This action cannot be undone.</AlertDialogBody>
      <AlertDialogFooter>
        <Button onClick={onClose}>Cancel</Button>
        <Button colorScheme="red" ml={3}>Delete</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogOverlay>
</AlertDialog>`,
            mantine: `import { Modal, Button } from '@mantine/core'

<Modal opened={opened} onClose={close} title="Are you sure?">
  This action cannot be undone.
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>`,
            ant: `import { Modal } from 'antd'

<Modal title="Are you sure?" open={isOpen} onOk={handleConfirm} onCancel={handleClose}>
  This action cannot be undone.
</Modal>`
          }
        },
        { 
          name: 'Drawer', 
          desc: 'Выдвижная панель снизу/сбоку',
          code: {
            shadcn: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

<Drawer open={open} onClose={handleClose}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>Drawer description</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>Close</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
            mui: `import Drawer from '@mui/material/Drawer'

<Drawer anchor="left" open={open} onClose={handleClose}>
  <List>
    <ListItem>Menu Item 1</ListItem>
    <ListItem>Menu Item 2</ListItem>
  </List>
</Drawer>`,
            chakra: `import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react'

<Drawer isOpen={isOpen} onClose={onClose}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerHeader>Drawer Title</DrawerHeader>
    <DrawerBody>Drawer content</DrawerBody>
  </DrawerContent>
</Drawer>`,
            mantine: `import { Drawer, Button } from '@mantine/core'

<Drawer opened={opened} onClose={close} title="Drawer Title">
  Drawer content
</Drawer>`,
            ant: `import { Drawer } from 'antd'

<Drawer title="Drawer Title" open={isOpen} onClose={handleClose}>
  Drawer content
</Drawer>`
          }
        },
        { 
          name: 'Hover Card', 
          desc: 'Карточка при наведении',
          code: {
            shadcn: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="font-bold">Title</h4>
      <p className="text-sm">Description text</p>
    </div>
  </HoverCardContent>
</HoverCard>`,
            mui: `import Popover from '@mui/material/Popover'

<Popover
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
>
  <Typography>Content</Typography>
</Popover>`,
            chakra: `import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react'

<Popover>
  <PopoverTrigger>
    <Button>Hover me</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>Title</PopoverHeader>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>`,
            mantine: `import { HoverCard, Text } from '@mantine/core'

<HoverCard>
  <HoverCard.Target>
    <Button>Hover me</Button>
  </HoverCard.Target>
  <HoverCard.Dropdown>
    <Text>Content</Text>
  </HoverCard.Dropdown>
</HoverCard>`,
            ant: `import { Popover } from 'antd'

<Popover content="Content" title="Title">
  <Button>Hover me</Button>
</Popover>`
          }
        },
        { 
          name: 'Popover', 
          desc: 'Всплывающее окно',
          code: {
            shadcn: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>
    <div className="grid gap-4">
      <h4 className="font-medium">Popover Title</h4>
      <p className="text-sm text-muted-foreground">Content</p>
    </div>
  </PopoverContent>
</Popover>`,
            mui: `import Popover from '@mui/material/Popover'

<Popover open={open} anchorEl={anchorEl}>
  <Typography>Content</Typography>
</Popover>`,
            chakra: `import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react'

<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverBody>Content</PopoverBody>
  </PopoverContent>
</Popover>`,
            mantine: `import { Popover, Text } from '@mantine/core'

<Popover>
  <Popover.Target>
    <Button>Open</Button>
  </Popover.Target>
  <Popover.Dropdown>
    <Text>Content</Text>
  </Popover.Dropdown>
</Popover>`,
            ant: `import { Popover } from 'antd'

<Popover content="Content" title="Title">
  <Button>Open</Button>
</Popover>`
          }
        },
        { 
          name: 'Sheet', 
          desc: 'Боковая выдвижная панель',
          code: {
            shadcn: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description</SheetDescription>
    </SheetHeader>
    <div className="mt-4">Sheet content</div>
  </SheetContent>
</Sheet>`,
            mui: `import Drawer from '@mui/material/Drawer'

<Drawer anchor="right" open={open} onClose={handleClose}>
  <Box sx={{ width: 250 }}>
    <Typography>Sheet content</Typography>
  </Box>
</Drawer>`,
            chakra: `import { Drawer, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react'

<Drawer placement="right" isOpen={isOpen} onClose={onClose}>
  <DrawerContent>
    <DrawerHeader>Sheet Title</DrawerHeader>
    <DrawerBody>Sheet content</DrawerBody>
  </DrawerContent>
</Drawer>`,
            mantine: `import { Drawer } from '@mantine/core'

<Drawer opened={opened} onClose={close} position="right" title="Sheet Title">
  Sheet content
</Drawer>`,
            ant: `import { Drawer } from 'antd'

<Drawer title="Sheet Title" placement="right" open={isOpen} onClose={handleClose}>
  Sheet content
</Drawer>`
          }
        },
      ]
    },
    {
      id: 'data',
      name: 'Data Display',
      icon: Database,
      components: [
        { 
          name: 'Avatar', 
          desc: 'Аватар пользователя',
          code: {
            shadcn: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
            mui: `import Avatar from '@mui/material/Avatar'

<Avatar src="/avatar.png">JD</Avatar>
<Avatar>SX</Avatar>`,
            chakra: `import { Avatar } from '@chakra-ui/react'

<Avatar src="/avatar.png" name="John Doe" />
<Avatar name="Jane Doe" />`,
            mantine: `import { Avatar } from '@mantine/core'

<Avatar src="/avatar.png" alt="John Doe" />
<Avatar color="blue">JD</Avatar>`,
            ant: `import { Avatar } from 'antd'

<Avatar src="/avatar.png" />
<Avatar>JD</Avatar>`
          }
        },
        { 
          name: 'Badge', 
          desc: 'Метка или тег',
          code: {
            shadcn: `import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
            mui: `import Badge from '@mui/material/Badge'

<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>`,
            chakra: `import { Badge } from '@chakra-ui/react'

<Badge>Default</Badge>
<Badge colorScheme="green">Success</Badge>
<Badge colorScheme="red">Error</Badge>`,
            mantine: `import { Badge } from '@mantine/core'

<Badge>Default</Badge>
<Badge color="green">Success</Badge>
<Badge color="red">Error</Badge>`,
            ant: `import { Badge } from 'antd'

<Badge count={5}>
  <MailOutlined />
</Badge>`
          }
        },
        { 
          name: 'Card', 
          desc: 'Карточка контента',
          code: {
            shadcn: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
    <CardDescription>Описание</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
</Card>`,
            mui: `import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

<Card>
  <CardContent>
    <Typography variant="h5">Заголовок</Typography>
    <Typography>Содержимое</Typography>
  </CardContent>
</Card>`,
            chakra: `import { Card, CardHeader, CardBody } from '@chakra-ui/react'

<Card>
  <CardHeader>Заголовок</CardHeader>
  <CardBody>Содержимое карточки</CardBody>
</Card>`,
            mantine: `import { Card, Text } from '@mantine/core'

<Card shadow="sm" padding="lg">
  <Text weight={500}>Заголовок</Text>
  <Text size="sm">Содержимое карточки</Text>
</Card>`,
            ant: `import { Card } from 'antd'

<Card title="Заголовок">
  Содержимое карточки
</Card>`
          }
        },
        { 
          name: 'Progress', 
          desc: 'Индикатор прогресса',
          code: {
            shadcn: `import { Progress } from "@/components/ui/progress"

<Progress value={66} />`,
            mui: `import LinearProgress from '@mui/material/LinearProgress'

<LinearProgress variant="determinate" value={66} />`,
            chakra: `import { Progress } from '@chakra-ui/react'

<Progress value={66} />
<Progress value={66} colorScheme="green" />`,
            mantine: `import { Progress } from '@mantine/core'

<Progress value={66} />
<Progress value={66} color="green" />`,
            ant: `import { Progress } from 'antd'

<Progress percent={66} />`
          }
        },
        { name: 'Calendar', desc: 'Календарь для выбора даты', code: {} },
        { name: 'Carousel', desc: 'Карусель слайдов', code: {} },
        { name: 'Chart', desc: 'Графики и диаграммы (Recharts)', code: {} },
        { name: 'Separator', desc: 'Разделитель', code: {} },
        { name: 'Skeleton', desc: 'Заглушка при загрузке', code: {} },
        { name: 'Table', desc: 'Таблица данных', code: {} },
      ]
    },
    {
      id: 'overlay',
      name: 'Overlay',
      icon: Brackets,
      components: [
        { name: 'Context Menu', desc: 'Контекстное меню (правый клик)', code: {} },
        { name: 'Dropdown Menu', desc: 'Выпадающее меню', code: {} },
        { name: 'Menubar', desc: 'Меню бар как в приложениях', code: {} },
      ]
    },
    {
      id: 'utility',
      name: 'Utility',
      icon: Settings,
      components: [
        { name: 'Aspect Ratio', desc: 'Контейнер с соотношением сторон', code: {} },
        { name: 'Collapsible', desc: 'Сворачиваемый контейнер', code: {} },
        { name: 'Command', desc: 'Command palette (cmd+k)', code: {} },
        { name: 'Resizable', desc: 'Изменяемые панели', code: {} },
        { name: 'Scroll Area', desc: 'Кастомная прокрутка', code: {} },
        { name: 'Toggle', desc: 'Кнопка-переключатель', code: {} },
        { name: 'Toggle Group', desc: 'Группа переключателей', code: {} },
      ]
    },
  ]
}

// Detailed Academy Structure with full hierarchy
const academyStructure = {
  levels: [
    {
      id: 'beginner',
      level: 1,
      title: 'НАЧИНАЮЩИЙ',
      description: 'Основы дизайн-систем и базовые концепции',
      color: 'from-zinc-600 to-zinc-500',
      borderColor: 'border-zinc-500',
      courses: [
        {
          id: 'course-basics',
          name: 'Основы дизайн-систем',
          icon: BookOpen,
          duration: '3 часа',
          lessons: 8,
          modules: [
            {
              id: 'mod-1-1',
              name: 'Что такое дизайн-система?',
              lessons: [
                { id: 'l-1-1-1', name: 'Определение и назначение', duration: '10 мин', type: 'video' },
                { id: 'l-1-1-2', name: 'История возникновения', duration: '15 мин', type: 'video' },
                { id: 'l-1-1-3', name: 'Тест по модулю', duration: '5 мин', type: 'quiz' },
              ]
            },
            {
              id: 'mod-1-2',
              name: 'Зачем нужна дизайн-система?',
              lessons: [
                { id: 'l-1-2-1', name: 'Проблемы без системы', duration: '12 мин', type: 'video' },
                { id: 'l-1-2-2', name: 'Бизнес-ценность', duration: '15 мин', type: 'video' },
                { id: 'l-1-2-3', name: 'ROI дизайн-системы', duration: '10 мин', type: 'article' },
              ]
            },
            {
              id: 'mod-1-3',
              name: 'Из чего состоит дизайн-система',
              lessons: [
                { id: 'l-1-3-1', name: 'Design Tokens', duration: '20 мин', type: 'video' },
                { id: 'l-1-3-2', name: 'Компоненты', duration: '18 мин', type: 'video' },
                { id: 'l-1-3-3', name: 'Паттерны', duration: '15 мин', type: 'video' },
                { id: 'l-1-3-4', name: 'Документация', duration: '12 мин', type: 'article' },
              ]
            },
            {
              id: 'mod-1-4',
              name: 'Примеры успешных систем',
              lessons: [
                { id: 'l-1-4-1', name: 'Material Design', duration: '15 мин', type: 'video' },
                { id: 'l-1-4-2', name: 'Apple HIG', duration: '15 мин', type: 'video' },
                { id: 'l-1-4-3', name: 'Carbon Design', duration: '12 мин', type: 'video' },
              ]
            },
          ]
        },
        {
          id: 'course-color-typo',
          name: 'Цвет и Типографика',
          icon: Palette,
          duration: '5 часов',
          lessons: 12,
          modules: [
            {
              id: 'mod-2-1',
              name: 'Цветовые модели и теории',
              lessons: [
                { id: 'l-2-1-1', name: 'RGB, HSL, LAB', duration: '20 мин', type: 'video' },
                { id: 'l-2-1-2', name: 'Цветовой круг', duration: '15 мин', type: 'video' },
                { id: 'l-2-1-3', name: 'Психология цвета', duration: '18 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-2-2',
              name: 'Построение цветовой палитры',
              lessons: [
                { id: 'l-2-2-1', name: 'Primary & Secondary', duration: '25 мин', type: 'video' },
                { id: 'l-2-2-2', name: 'Semantic colors', duration: '20 мин', type: 'video' },
                { id: 'l-2-2-3', name: 'Практика: создаём палитру', duration: '30 мин', type: 'practice' },
              ]
            },
            {
              id: 'mod-2-3',
              name: 'Типографическая шкала',
              lessons: [
                { id: 'l-2-3-1', name: 'Модульная шкала', duration: '22 мин', type: 'video' },
                { id: 'l-2-3-2', name: 'Выбор шрифтов', duration: '25 мин', type: 'video' },
                { id: 'l-2-3-3', name: 'Line height & spacing', duration: '18 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-2-4',
              name: 'Контраст и доступность',
              lessons: [
                { id: 'l-2-4-1', name: 'WCAG контраст', duration: '20 мин', type: 'video' },
                { id: 'l-2-4-2', name: 'Инструменты проверки', duration: '15 мин', type: 'video' },
                { id: 'l-2-4-3', name: 'Практика: audit цветов', duration: '25 мин', type: 'practice' },
              ]
            },
          ]
        },
      ]
    },
    {
      id: 'advanced',
      level: 2,
      title: 'ПРОДВИНУТЫЙ',
      description: 'Компоненты, токены и паттерны',
      color: 'from-zinc-500 to-zinc-400',
      borderColor: 'border-zinc-400',
      courses: [
        {
          id: 'course-animation',
          name: 'Анимации и переходы',
          icon: Zap,
          duration: '2.5 часа',
          lessons: 6,
          modules: [
            {
              id: 'mod-3-1',
              name: 'Принципы анимации UI',
              lessons: [
                { id: 'l-3-1-1', name: '12 принципов Disney', duration: '25 мин', type: 'video' },
                { id: 'l-3-1-2', name: 'Анимация в интерфейсах', duration: '20 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-3-2',
              name: 'Timing и Easing функции',
              lessons: [
                { id: 'l-3-2-1', name: 'Кривые Безье', duration: '22 мин', type: 'video' },
                { id: 'l-3-2-2', name: 'Duration guidelines', duration: '18 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-3-3',
              name: 'Микро-взаимодействия',
              lessons: [
                { id: 'l-3-3-1', name: 'Hover & Focus states', duration: '20 мин', type: 'video' },
                { id: 'l-3-3-2', name: 'Loading & Success', duration: '15 мин', type: 'video' },
              ]
            },
          ]
        },
        {
          id: 'course-tech',
          name: 'Технологии и инструменты',
          icon: Code2,
          duration: '4 часа',
          lessons: 10,
          modules: [
            {
              id: 'mod-4-1',
              name: 'Фреймворки: React, Vue, Angular',
              lessons: [
                { id: 'l-4-1-1', name: 'Сравнение подходов', duration: '30 мин', type: 'video' },
                { id: 'l-4-1-2', name: 'React экосистема', duration: '25 мин', type: 'video' },
                { id: 'l-4-1-3', name: 'Vue экосистема', duration: '25 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-4-2',
              name: 'Библиотеки компонентов',
              lessons: [
                { id: 'l-4-2-1', name: 'Shadcn/UI подход', duration: '25 мин', type: 'video' },
                { id: 'l-4-2-2', name: 'Mantine, Chakra', duration: '20 мин', type: 'video' },
                { id: 'l-4-2-3', name: 'Headless библиотеки', duration: '22 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-4-3',
              name: 'Инструменты разработки',
              lessons: [
                { id: 'l-4-3-1', name: 'Storybook', duration: '30 мин', type: 'video' },
                { id: 'l-4-3-2', name: 'Figma Tokens', duration: '25 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-4-4',
              name: 'CI/CD для дизайн-систем',
              lessons: [
                { id: 'l-4-4-1', name: 'Versioning стратегии', duration: '20 мин', type: 'video' },
                { id: 'l-4-4-2', name: 'Automated testing', duration: '18 мин', type: 'video' },
              ]
            },
          ]
        },
      ]
    },
    {
      id: 'expert',
      level: 3,
      title: 'ЭКСПЕРТ',
      description: 'Архитектура и документация',
      color: 'from-zinc-400 to-zinc-300',
      borderColor: 'border-zinc-300',
      courses: [
        {
          id: 'course-components',
          name: 'Компоненты и паттерны',
          icon: Layers,
          duration: '6 часов',
          lessons: 14,
          modules: [
            {
              id: 'mod-5-1',
              name: 'Атомарный дизайн',
              lessons: [
                { id: 'l-5-1-1', name: 'Атомы и молекулы', duration: '25 мин', type: 'video' },
                { id: 'l-5-1-2', name: 'Организмы и шаблоны', duration: '30 мин', type: 'video' },
                { id: 'l-5-1-3', name: 'Страницы', duration: '20 мин', type: 'video' },
                { id: 'l-5-1-4', name: 'Критика методологии', duration: '15 мин', type: 'article' },
              ]
            },
            {
              id: 'mod-5-2',
              name: 'Компонентный подход',
              lessons: [
                { id: 'l-5-2-1', name: 'API компонентов', duration: '28 мин', type: 'video' },
                { id: 'l-5-2-2', name: 'Props и variants', duration: '25 мин', type: 'video' },
                { id: 'l-5-2-3', name: 'Compound Components', duration: '30 мин', type: 'video' },
                { id: 'l-5-2-4', name: 'Render Props', duration: '22 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-5-3',
              name: 'UI паттерны',
              lessons: [
                { id: 'l-5-3-1', name: 'Form patterns', duration: '25 мин', type: 'video' },
                { id: 'l-5-3-2', name: 'Navigation patterns', duration: '28 мин', type: 'video' },
                { id: 'l-5-3-3', name: 'Data display patterns', duration: '25 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-5-4',
              name: 'Compound Components Deep Dive',
              lessons: [
                { id: 'l-5-4-1', name: 'Контекст и состояние', duration: '30 мин', type: 'video' },
                { id: 'l-5-4-2', name: 'Практика: строим Tabs', duration: '40 мин', type: 'practice' },
                { id: 'l-5-4-3', name: 'Практика: строим Accordion', duration: '35 мин', type: 'practice' },
              ]
            },
          ]
        },
        {
          id: 'course-docs',
          name: 'Документация и поддержка',
          icon: FileText,
          duration: '3.5 часа',
          lessons: 8,
          modules: [
            {
              id: 'mod-6-1',
              name: 'Документирование компонентов',
              lessons: [
                { id: 'l-6-1-1', name: 'Структура документации', duration: '20 мин', type: 'video' },
                { id: 'l-6-1-2', name: 'Usage examples', duration: '25 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-6-2',
              name: 'Storybook и аналоги',
              lessons: [
                { id: 'l-6-2-1', name: 'Настройка Storybook', duration: '30 мин', type: 'video' },
                { id: 'l-6-2-2', name: 'Stories best practices', duration: '25 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-6-3',
              name: 'Versioning дизайн-систем',
              lessons: [
                { id: 'l-6-3-1', name: 'Semantic Versioning', duration: '18 мин', type: 'video' },
                { id: 'l-6-3-2', name: 'Breaking changes', duration: '22 мин', type: 'video' },
              ]
            },
            {
              id: 'mod-6-4',
              name: 'Управление изменениями',
              lessons: [
                { id: 'l-6-4-1', name: 'RFC процесс', duration: '20 мин', type: 'video' },
                { id: 'l-6-4-2', name: 'Community feedback', duration: '15 мин', type: 'video' },
              ]
            },
          ]
        },
      ]
    },
  ]
}

// ═══════════════════════════════════════════════════════════════════════════
// UI STACK GUIDE DATA
// ═══════════════════════════════════════════════════════════════════════════

// Headless Libraries
const headlessLibraries = [
  { name: 'Shadcn/ui', type: 'headless', size: '~50KB', components: '50+', compatibility: 'Tailwind (Родная)', feature: 'Копипаст кода, Radix + Tailwind', verdict: 'Лучший выбор для уникального дизайна' },
  { name: 'Radix UI', type: 'headless', size: '~30KB', components: '28+', compatibility: 'Tailwind (Рекомендуется)', feature: 'Примитивы, макс. доступность', verdict: 'Основа для своей библиотеки' },
  { name: 'Headless UI', type: 'headless', size: '~45KB', components: '10', compatibility: 'Tailwind (Родная)', feature: 'Официальный партнёр Tailwind', verdict: 'Минимализм, надёжность, простые проекты' },
]

// Styled Libraries
const styledLibraries = [
  { name: 'Material UI', type: 'styled', size: '~320KB', components: '70+', compatibility: 'CSS Modules (с Tailwind сложно)', feature: 'Material Design (Google)' },
  { name: 'Mantine', type: 'styled', size: '~250KB', components: '100+', compatibility: 'CSS Modules (Native CSS v7)', feature: 'Мощный хук-инструментарий' },
  { name: 'Chakra UI', type: 'styled', size: '~180KB', components: '55', compatibility: 'CSS-in-JS (Emotion)', feature: 'Accessibility-first' },
  { name: 'Ant Design', type: 'styled', size: '~450KB', components: '65+', compatibility: 'CSS Modules (с Tailwind сложно)', feature: 'Enterprise стандарт' },
]

// Recommended Stacks
const recommendedStacks = [
  { id: 'modern', name: 'Современный стандарт', library: 'Shadcn/ui', type: 'headless', size: '~50KB', compatibility: 'Tailwind (Родная)', useCase: 'SaaS, стартапы, маркетинг, уникальный дизайн', description: 'Shadcn/ui помещает исходный код (.tsx) прямо в проект. Полный контроль типов и стилей, без чёрного ящика.' },
  { id: 'control', name: 'Контроль и Кастомизация', library: 'Radix UI', type: 'headless', size: '~30KB', compatibility: 'Tailwind (Рекомендуется)', useCase: 'Создание собственной Design System с нуля', description: 'Берёте только движок (Radix) и сами верстаете UI. Максимальная гибкость, но трудоёмко.' },
  { id: 'minimal', name: 'Минимализм и Скорость', library: 'Headless UI', type: 'headless', size: '~45KB', compatibility: 'Tailwind (Родная)', useCase: 'Лендинги, простые приложения, блоги', description: 'Создан авторами Tailwind. Малый вес, 10 компонентов покрывают 90% базовых нужд.' },
  { id: 'enterprise', name: 'Корпоративный Enterprise', library: 'Ant Design', type: 'styled', size: '~450KB', compatibility: 'CSS Modules', useCase: 'CRM, ERP, банковские системы, сложные админки', description: 'Решение для сложных таблиц и форм. Размер оправдан экономией времени на логику.' },
  { id: 'functional', name: 'Функциональный комбайн', library: 'Mantine', type: 'styled', size: '~250KB', compatibility: 'CSS Modules (Нативно)', useCase: 'Быстрые прототипы, проекты с данными и графиками', description: 'Mantine v7 перешёл на нативный CSS. 100+ компонентов и хуков из коробки.' },
]

// Radix Use Cases
const radixUseCases = [
  { title: 'Вы НЕ используете Tailwind CSS', description: 'Если ваш стек — Styled Components, Emotion или CSS Modules, Shadcn/ui будет неудобен. Radix UI нейтрален к стилям.' },
  { title: 'Создание собственной Design System', description: 'Для библиотеки компонентов большой компании Radix даёт идеальную базу — доступность, фокус, клавиатура — без навязывания внешнего вида.' },
  { title: 'Нужны специфические примитивы', description: 'Radix имеет более широкий набор низкоуровневых компонентов (ScrollArea, AspectRatio, Collapsible), чем Headless UI.' },
]

// Radar Data for comparison
const radarData = [
  { criterion: 'Лёгкость', shadcn: 95, radix: 90, headlessUI: 85, mui: 60, antd: 50, mantine: 75 },
  { criterion: 'Гибкость', shadcn: 95, radix: 100, headlessUI: 85, mui: 55, antd: 45, mantine: 70 },
  { criterion: 'Скорость', shadcn: 80, radix: 60, headlessUI: 75, mui: 90, antd: 95, mantine: 95 },
  { criterion: 'Документация', shadcn: 90, radix: 85, headlessUI: 80, mui: 95, antd: 90, mantine: 95 },
  { criterion: 'Компоненты', shadcn: 85, radix: 70, headlessUI: 50, mui: 95, antd: 95, mantine: 100 },
  { criterion: 'Бандл', shadcn: 90, radix: 95, headlessUI: 90, mui: 40, antd: 30, mantine: 50 },
]

// Library Stats
const libraryStats = [
  { name: 'Shadcn/ui', stars: '83K', weeklyDownloads: '420K', year: '2023', license: 'MIT' },
  { name: 'Radix UI', stars: '16K', weeklyDownloads: '3.2M', year: '2020', license: 'MIT' },
  { name: 'Headless UI', stars: '25K', weeklyDownloads: '1.8M', year: '2020', license: 'MIT' },
  { name: 'Material UI', stars: '94K', weeklyDownloads: '4.5M', year: '2014', license: 'MIT' },
  { name: 'Mantine', stars: '26K', weeklyDownloads: '850K', year: '2021', license: 'MIT' },
  { name: 'Chakra UI', stars: '38K', weeklyDownloads: '620K', year: '2019', license: 'MIT' },
  { name: 'Ant Design', stars: '92K', weeklyDownloads: '1.2M', year: '2015', license: 'MIT' },
]

// Compatibility Matrix (Heatmap)
const compatibilityMatrix = [
  { library: 'Shadcn/ui', tailwind: 100, cssModules: 30, cssInJs: 20, styledComponents: 25 },
  { library: 'Radix UI', tailwind: 95, cssModules: 90, cssInJs: 85, styledComponents: 90 },
  { library: 'Headless UI', tailwind: 100, cssModules: 40, cssInJs: 30, styledComponents: 35 },
  { library: 'Material UI', tailwind: 35, cssModules: 80, cssInJs: 90, styledComponents: 70 },
  { library: 'Mantine', tailwind: 40, cssModules: 95, cssInJs: 50, styledComponents: 45 },
  { library: 'Chakra UI', tailwind: 45, cssModules: 60, cssInJs: 95, styledComponents: 85 },
  { library: 'Ant Design', tailwind: 30, cssModules: 90, cssInJs: 70, styledComponents: 65 },
]

// Comparison Data with Winners
const comparisonData = [
  { criterion: 'Лёгкость', winner: 'Shadcn/ui', score: 95, desc: 'Простота внедрения' },
  { criterion: 'Гибкость', winner: 'Radix UI', score: 100, desc: 'Контроль над UI' },
  { criterion: 'Скорость', winner: 'Ant Design', score: 95, desc: 'Быстрота разработки' },
  { criterion: 'Документация', winner: 'Mantine', score: 95, desc: 'Качество docs' },
  { criterion: 'Компоненты', winner: 'Mantine', score: 100, desc: 'Количество готовых' },
  { criterion: 'Бандл', winner: 'Radix UI', score: 95, desc: 'Малый размер' },
]

// Design Scenarios
const designScenarios = [
  { title: 'СЦЕНАРИЙ: Уникальный дизайн', headlessRating: 5, styledRating: 1, headlessDesc: 'Отлично. Просто пишете Tailwind классы. Никто не мешает. Результат идеален.', styledDesc: 'Сложно. Приходится переопределять дефолтные стили, сбрасывать отступы, бороться с !important.', conclusion: 'Если дизайн уникальный, Headless-стек экономит нервы.' },
  { title: 'СЦЕНАРИЙ: Типовой дизайн', headlessRating: 2, styledRating: 5, headlessDesc: 'Долго. Придётся верстать таблицу, пагинацию и стили форм с нуля.', styledDesc: 'Отлично. Всё готово, просто ставите компоненты.', conclusion: 'Если дизайн типовой, Styled-стек экономит время.' },
]

// Full Stack Data
const fullStackData = [
  { stack: 'Next + TS + Tailwind + Shadcn/ui', library: 'Shadcn/ui', type: 'headless', size: '~50KB', styling: 'Tailwind', compatibility: 'Родная', useCase: 'Уникальный дизайн, SaaS, Стартапы' },
  { stack: 'Next + TS + Tailwind + Radix UI', library: 'Radix UI', type: 'headless', size: '~30KB', styling: 'Tailwind', compatibility: 'Рекомендуется', useCase: 'Своя библиотека компонентов' },
  { stack: 'Next + TS + Tailwind + Headless UI', library: 'Headless UI', type: 'headless', size: '~45KB', styling: 'Tailwind', compatibility: 'Родная', useCase: 'Минимализм, лендинги' },
  { stack: 'Next + TS + CSS Modules + Mantine', library: 'Mantine', type: 'styled', size: '~250KB', styling: 'CSS Modules', compatibility: 'Нативно', useCase: 'Быстрые MVP, графики, сложная логика' },
  { stack: 'Next + TS + CSS Modules + MUI', library: 'Material UI', type: 'styled', size: '~320KB', styling: 'CSS Modules', compatibility: 'Рекомендуется', useCase: 'Проекты в стиле Material Design' },
  { stack: 'Next + TS + CSS Modules + Ant Design', library: 'Ant Design', type: 'styled', size: '~450KB', styling: 'CSS Modules', compatibility: 'Рекомендуется', useCase: 'Enterprise, CRM, ERP системы' },
]

// Decision Algorithm
const decisionAlgorithm = [
  { condition: 'Важен уникальный дизайн и скорость отрисовки', result: 'Shadcn/ui' },
  { condition: 'Нужна быстрая сборка стандартной админки', result: 'Ant Design или MUI' },
  { condition: 'Нужен мощный функционал (hooks, utils) и скорость', result: 'Mantine' },
  { condition: 'Пишете свой UI Kit без Tailwind', result: 'Radix UI' },
]

// Systems Catalog - Radar Chart Data
const systemsRadarData = [
  { metric: 'Популярность', shadcn: 95, mui: 98, ant: 96, mantine: 78, chakra: 82 },
  { metric: 'Документация', shadcn: 90, mui: 95, ant: 88, mantine: 98, chakra: 85 },
  { metric: 'Гибкость', shadcn: 95, mui: 60, ant: 55, mantine: 75, chakra: 70 },
  { metric: 'Бандл', shadcn: 95, mui: 45, ant: 35, mantine: 50, chakra: 55 },
  { metric: 'Компоненты', shadcn: 70, mui: 95, ant: 98, mantine: 92, chakra: 75 },
  { metric: 'TypeScript', shadcn: 100, mui: 95, ant: 90, mantine: 100, chakra: 90 },
]

// Systems Categories
const systemsCategories = [
  { id: 'headless', label: 'Headless', desc: 'Только логика, стили пишете сами' },
  { id: 'styled', label: 'Styled', desc: 'Готовый дизайн и логика' },
  { id: 'utility', label: 'Utility-first', desc: 'Утилитарные классы' },
]

// Detailed Systems Comparison
const systemsComparison = [
  { name: 'Shadcn/ui', type: 'headless', stars: '83K', downloads: '420K/w', bundle: '~50KB', components: 50, ts: true, tailwind: true, cssInJs: false, logoComponent: <BrandLogos.Shadcn />, logoBg: 'bg-zinc-100 dark:bg-zinc-800' },
  { name: 'Radix UI', type: 'headless', stars: '16K', downloads: '3.2M/w', bundle: '~30KB', components: 28, ts: true, tailwind: true, cssInJs: true, logoComponent: <BrandLogos.RadixUI />, logoBg: 'bg-violet-50 dark:bg-violet-950' },
  { name: 'Headless UI', type: 'headless', stars: '25K', downloads: '1.8M/w', bundle: '~45KB', components: 12, ts: true, tailwind: true, cssInJs: false, logoComponent: <BrandLogos.HeadlessUI />, logoBg: 'bg-slate-900' },
  { name: 'Material UI', type: 'styled', stars: '94K', downloads: '4.5M/w', bundle: '~320KB', components: 85, ts: true, tailwind: false, cssInJs: true, logoComponent: <BrandLogos.MUI />, logoBg: 'bg-blue-50 dark:bg-blue-950' },
  { name: 'Mantine', type: 'styled', stars: '26K', downloads: '850K/w', bundle: '~250KB', components: 120, ts: true, tailwind: false, cssInJs: false, logoComponent: <BrandLogos.Mantine />, logoBg: 'bg-blue-50 dark:bg-blue-950' },
  { name: 'Ant Design', type: 'styled', stars: '92K', downloads: '1.2M/w', bundle: '~450KB', components: 70, ts: true, tailwind: false, cssInJs: false, logoComponent: <BrandLogos.AntDesign />, logoBg: 'bg-blue-50 dark:bg-blue-950' },
  { name: 'Chakra UI', type: 'styled', stars: '38K', downloads: '620K/w', bundle: '~180KB', components: 55, ts: true, tailwind: false, cssInJs: true, logoComponent: <BrandLogos.ChakraUI />, logoBg: 'bg-teal-50 dark:bg-teal-950' },
]

// Systems by Use Case
const systemsByUseCase = [
  { useCase: 'Уникальный дизайн', recommended: ['Shadcn/ui', 'Radix UI'], reason: 'Полный контроль над стилями' },
  { useCase: 'Быстрый MVP', recommended: ['Mantine', 'Material UI'], reason: 'Готовые компоненты из коробки' },
  { useCase: 'Enterprise CRM/ERP', recommended: ['Ant Design', 'Material UI'], reason: 'Сложные таблицы, формы, графики' },
  { useCase: 'SaaS Startup', recommended: ['Shadcn/ui', 'Mantine'], reason: 'Баланс скорости и гибкости' },
  { useCase: 'Минимализм', recommended: ['Headless UI', 'Radix UI'], reason: 'Минимальный бандл, только логика' },
]

// Design Systems (not UI libraries - design guidelines, tokens, documentation)
const designSystems = [
  { 
    name: 'Material Design', 
    company: 'Google', 
    type: 'corporate', 
    year: 2014, 
    description: 'Комплексная система дизайна с принципами, компонентами и инструментами. Основана на физическом мире и его текстурах.',
    tokens: ['Colors', 'Typography', 'Elevation', 'Shape', 'Motion'],
    platforms: ['Web', 'Android', 'iOS', 'Flutter'],
    url: 'material.io',
    logoComponent: <BrandLogos.MaterialDesign />,
    logoBg: 'bg-gray-100 dark:bg-gray-800'
  },
  { 
    name: 'Apple HIG', 
    company: 'Apple', 
    type: 'corporate', 
    year: 1987, 
    description: 'Human Interface Guidelines — руководства по дизайну для всех платформ Apple. Фокус на пользовательском опыте.',
    tokens: ['Colors', 'Typography', 'Icons', 'Spacing', 'Materials'],
    platforms: ['iOS', 'macOS', 'watchOS', 'tvOS'],
    url: 'developer.apple.com/design',
    logoComponent: <BrandLogos.Apple />,
    logoBg: 'bg-gray-100 dark:bg-gray-800'
  },
  { 
    name: 'IBM Carbon', 
    company: 'IBM', 
    type: 'corporate', 
    year: 2017, 
    description: 'Open-source дизайн-система для enterprise продуктов. Модульный подход, основанный на сетке.',
    tokens: ['Colors', 'Grid', 'Typography', 'Icons', 'Motion', 'Spacing'],
    platforms: ['Web', 'React', 'Vue', 'Angular', 'iOS', 'Android'],
    url: 'carbondesignsystem.com',
    logoComponent: <BrandLogos.Carbon />,
    logoBg: 'bg-white dark:bg-zinc-900'
  },
  { 
    name: 'Salesforce Lightning', 
    company: 'Salesforce', 
    type: 'corporate', 
    year: 2015, 
    description: 'Дизайн-система для CRM приложений. Богатый набор компонентов для enterprise.',
    tokens: ['Colors', 'Typography', 'Spacing', 'Icons', 'Utility classes'],
    platforms: ['Web', 'Mobile'],
    url: 'lightningdesignsystem.com',
    logoComponent: <BrandLogos.Salesforce />,
    logoBg: 'bg-blue-50 dark:bg-blue-950'
  },
  { 
    name: 'Fluent UI', 
    company: 'Microsoft', 
    type: 'corporate', 
    year: 2017, 
    description: 'Open-source дизайн-система Microsoft. Адаптивная и доступная по умолчанию.',
    tokens: ['Colors', 'Typography', 'Icons', 'Motion', 'Depth'],
    platforms: ['Web', 'React', 'iOS', 'Android', 'Windows'],
    url: 'fluentui.dev',
    logoComponent: <BrandLogos.FluentUI />,
    logoBg: 'bg-green-50 dark:bg-green-950'
  },
  { 
    name: 'Ant Design', 
    company: 'Alibaba', 
    type: 'corporate', 
    year: 2015, 
    description: 'Дизайн-система для enterprise приложений. Богатый набор компонентов и шаблонов.',
    tokens: ['Colors', 'Typography', 'Icons', 'Layout', 'Motion'],
    platforms: ['Web', 'React', 'Vue', 'Angular', 'Mobile'],
    url: 'ant.design',
    logoComponent: <BrandLogos.AntDesign />,
    logoBg: 'bg-blue-50 dark:bg-blue-950'
  },
  { 
    name: 'Chakra UI', 
    company: 'Segun Adebayo', 
    type: 'community', 
    year: 2019, 
    description: 'Простая, модульная и доступная библиотека компонентов. Отличная DX.',
    tokens: ['Colors', 'Typography', 'Spacing', 'Shadows', 'Border radius'],
    platforms: ['Web', 'React', 'Vue'],
    url: 'chakra-ui.com',
    logoComponent: <BrandLogos.ChakraUI />,
    logoBg: 'bg-teal-50 dark:bg-teal-950'
  },
  { 
    name: 'Mantine', 
    company: 'Vitaly Rtishchev', 
    type: 'community', 
    year: 2021, 
    description: 'Полнофункциональная React библиотека с hooks, утилитами и 120+ компонентами.',
    tokens: ['Colors', 'Typography', 'Spacing', 'Shadows', 'Radius'],
    platforms: ['Web', 'React'],
    url: 'mantine.dev',
    logoComponent: <BrandLogos.Mantine />,
    logoBg: 'bg-blue-50 dark:bg-blue-950'
  },
  { 
    name: 'Tailwind UI', 
    company: 'Tailwind Labs', 
    type: 'commercial', 
    year: 2020, 
    description: 'Готовые компоненты и шаблоны на базе Tailwind CSS. Платная, но качественная.',
    tokens: ['Colors', 'Typography', 'Spacing', 'Shadows', 'Radius'],
    platforms: ['Web', 'React', 'Vue', 'Alpine'],
    url: 'tailwindui.com',
    logoComponent: <BrandLogos.Tailwind />,
    logoBg: 'bg-sky-50 dark:bg-sky-950'
  },
]

// UI Libraries Logos with SVG components
const libraryLogos: Record<string, { logoComponent: React.ReactNode; logoBg: string }> = {
  'Shadcn/ui': { logoComponent: <BrandLogos.Shadcn />, logoBg: 'bg-zinc-100 dark:bg-zinc-800' },
  'Radix UI': { logoComponent: <BrandLogos.RadixUI />, logoBg: 'bg-violet-50 dark:bg-violet-950' },
  'Headless UI': { logoComponent: <BrandLogos.HeadlessUI />, logoBg: 'bg-slate-900' },
  'Material UI': { logoComponent: <BrandLogos.MUI />, logoBg: 'bg-blue-50 dark:bg-blue-950' },
  'Mantine': { logoComponent: <BrandLogos.Mantine />, logoBg: 'bg-blue-50 dark:bg-blue-950' },
  'Ant Design': { logoComponent: <BrandLogos.AntDesign />, logoBg: 'bg-blue-50 dark:bg-blue-950' },
  'Chakra UI': { logoComponent: <BrandLogos.ChakraUI />, logoBg: 'bg-teal-50 dark:bg-teal-950' },
}

// Design Tokens Data
const tokensCategories = [
  { id: 'colors', label: 'Цвета', desc: 'Палитры, акценты, состояния' },
  { id: 'typography', label: 'Типографика', desc: 'Шрифты, размеры, начертания' },
  { id: 'spacing', label: 'Отступы', desc: 'Масштаб spacing, margins, paddings' },
  { id: 'radii', label: 'Радиусы', desc: 'Скругления углов' },
  { id: 'shadows', label: 'Тени', desc: 'Elevation, depth' },
  { id: 'motion', label: 'Анимация', desc: 'Timing, easing, transitions' },
]

// Color Tokens
const colorTokens = {
  brands: [
    { name: 'Primary', light: '#18181B', dark: '#FAFAFA', desc: 'Основной цвет бренда' },
    { name: 'Secondary', light: '#71717A', dark: '#A1A1AA', desc: 'Вторичный цвет' },
    { name: 'Accent', light: '#F97316', dark: '#FB923C', desc: 'Акцентный цвет' },
    { name: 'Muted', light: '#F4F4F5', dark: '#27272A', desc: 'Приглушённый фон' },
  ],
  semantics: [
    { name: 'Success', light: '#22C55E', dark: '#4ADE80', desc: 'Успешное действие' },
    { name: 'Warning', light: '#EAB308', dark: '#FACC15', desc: 'Предупреждение' },
    { name: 'Error', light: '#EF4444', dark: '#F87171', desc: 'Ошибка' },
    { name: 'Info', light: '#3B82F6', dark: '#60A5FA', desc: 'Информация' },
  ],
  surfaces: [
    { name: 'Background', light: '#FFFFFF', dark: '#09090B', desc: 'Основной фон' },
    { name: 'Foreground', light: '#09090B', dark: '#FAFAFA', desc: 'Основной текст' },
    { name: 'Card', light: '#FFFFFF', dark: '#18181B', desc: 'Фон карточки' },
    { name: 'Border', light: '#E4E4E7', dark: '#27272A', desc: 'Границы' },
  ],
}

// Typography Tokens
const typographyTokens = {
  fonts: [
    { name: 'Sans', value: 'Inter, system-ui, sans-serif', desc: 'Основной шрифт' },
    { name: 'Mono', value: 'JetBrains Mono, monospace', desc: 'Моноширинный' },
    { name: 'Display', value: 'Inter, system-ui, sans-serif', desc: 'Заголовки' },
  ],
  sizes: [
    { name: 'xs', value: '0.75rem', px: '12px', example: 'Мелкий текст' },
    { name: 'sm', value: '0.875rem', px: '14px', example: 'Вторичный текст' },
    { name: 'base', value: '1rem', px: '16px', example: 'Основной текст' },
    { name: 'lg', value: '1.125rem', px: '18px', example: 'Важный текст' },
    { name: 'xl', value: '1.25rem', px: '20px', example: 'Подзаголовок' },
    { name: '2xl', value: '1.5rem', px: '24px', example: 'Малый заголовок' },
    { name: '3xl', value: '1.875rem', px: '30px', example: 'Заголовок' },
    { name: '4xl', value: '2.25rem', px: '36px', example: 'Большой заголовок' },
    { name: '5xl', value: '3rem', px: '48px', example: 'Hero заголовок' },
  ],
  weights: [
    { name: 'Normal', value: '400', desc: 'Обычный текст' },
    { name: 'Medium', value: '500', desc: 'Акцентный текст' },
    { name: 'Semibold', value: '600', desc: 'Подзаголовки' },
    { name: 'Bold', value: '700', desc: 'Заголовки' },
  ],
  lineHeights: [
    { name: 'Tight', value: '1.25', desc: 'Заголовки' },
    { name: 'Normal', value: '1.5', desc: 'Основной текст' },
    { name: 'Relaxed', value: '1.75', desc: 'Длинный текст' },
  ],
}

// Spacing Tokens
const spacingTokens = [
  { name: '0', value: '0', px: '0px', desc: 'Без отступа' },
  { name: '1', value: '0.25rem', px: '4px', desc: 'Микро-отступ' },
  { name: '2', value: '0.5rem', px: '8px', desc: 'Малый отступ' },
  { name: '3', value: '0.75rem', px: '12px', desc: 'Средний отступ' },
  { name: '4', value: '1rem', px: '16px', desc: 'Стандартный' },
  { name: '5', value: '1.25rem', px: '20px', desc: 'Увеличенный' },
  { name: '6', value: '1.5rem', px: '24px', desc: 'Большой' },
  { name: '8', value: '2rem', px: '32px', desc: 'Крупный' },
  { name: '10', value: '2.5rem', px: '40px', desc: 'Секционный' },
  { name: '12', value: '3rem', px: '48px', desc: 'Межсекционный' },
  { name: '16', value: '4rem', px: '64px', desc: 'Большой блок' },
  { name: '20', value: '5rem', px: '80px', desc: 'Крупный блок' },
]

// Radii Tokens
const radiiTokens = [
  { name: 'none', value: '0', desc: 'Без скругления', example: '□' },
  { name: 'sm', value: '0.125rem', desc: 'Микро', example: '▢' },
  { name: 'DEFAULT', value: '0.25rem', desc: 'Стандарт', example: '▣' },
  { name: 'md', value: '0.375rem', desc: 'Средний', example: '▤' },
  { name: 'lg', value: '0.5rem', desc: 'Большой', example: '▥' },
  { name: 'xl', value: '0.75rem', desc: 'Крупный', example: '▦' },
  { name: '2xl', value: '1rem', desc: 'Очень крупный', example: '▧' },
  { name: 'full', value: '9999px', desc: 'Круг/овал', example: '●' },
]

// Shadow Tokens
const shadowTokens = [
  { name: 'sm', value: '0 1px 2px rgba(0,0,0,0.05)', desc: 'Микро-тень', elevation: 1 },
  { name: 'DEFAULT', value: '0 1px 3px rgba(0,0,0,0.1)', desc: 'Стандартная', elevation: 2 },
  { name: 'md', value: '0 4px 6px rgba(0,0,0,0.1)', desc: 'Средняя', elevation: 3 },
  { name: 'lg', value: '0 10px 15px rgba(0,0,0,0.1)', desc: 'Большая', elevation: 4 },
  { name: 'xl', value: '0 20px 25px rgba(0,0,0,0.1)', desc: 'Крупная', elevation: 5 },
  { name: '2xl', value: '0 25px 50px rgba(0,0,0,0.25)', desc: 'Модальная', elevation: 6 },
]

// Motion Tokens
const motionTokens = {
  durations: [
    { name: 'instant', value: '0ms', desc: 'Мгновенно' },
    { name: 'fast', value: '150ms', desc: 'Быстро' },
    { name: 'normal', value: '300ms', desc: 'Стандарт' },
    { name: 'slow', value: '500ms', desc: 'Медленно' },
    { name: 'slower', value: '700ms', desc: 'Очень медленно' },
  ],
  easings: [
    { name: 'linear', value: 'linear', desc: 'Линейная' },
    { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', desc: 'Ускорение' },
    { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', desc: 'Замедление' },
    { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Плавная' },
    { name: 'bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', desc: 'Отскок' },
  ],
}

// Tokens comparison across systems
const tokensComparison = [
  { system: 'Material UI', colors: 265, typography: 13, spacing: 20, radii: 7, shadows: 25, motion: 15 },
  { system: 'Chakra UI', colors: 147, typography: 12, spacing: 13, radii: 8, shadows: 24, motion: 9 },
  { system: 'Mantine', colors: 245, typography: 14, spacing: 16, radii: 6, shadows: 30, motion: 12 },
  { system: 'Ant Design', colors: 135, typography: 15, spacing: 18, radii: 5, shadows: 20, motion: 10 },
  { system: 'Tailwind', colors: 362, typography: 9, spacing: 21, radii: 8, shadows: 26, motion: 13 },
  { system: 'shadcn/ui', colors: 93, typography: 9, spacing: 21, radii: 8, shadows: 6, motion: 4 },
]

// Tokens tabs
const tokensTabs = [
  { id: 'overview', label: 'Обзор' },
  { id: 'colors', label: 'Цвета' },
  { id: 'typography', label: 'Типографика' },
  { id: 'spacing', label: 'Отступы' },
  { id: 'radii', label: 'Радиусы' },
  { id: 'shadows', label: 'Тени' },
  { id: 'motion', label: 'Motion' },
  { id: 'comparison', label: 'Сравнение' },
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 }
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [componentsViewOpen, setComponentsViewOpen] = useState(false)
  const [guideViewOpen, setGuideViewOpen] = useState(false)
  const [activeGuideSection, setActiveGuideSection] = useState('libraries')
  const [systemsViewOpen, setSystemsViewOpen] = useState(false)
  const [activeSystemsSection, setActiveSystemsSection] = useState('overview')
  const [tokensViewOpen, setTokensViewOpen] = useState(false)
  const [activeTokensSection, setActiveTokensSection] = useState('overview')
  const [selectedLibrary, setSelectedLibrary] = useState('shadcn')
  const [selectedComponent, setSelectedComponent] = useState<any>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<'preview' | 'code' | 'props'>('preview')
  const [systems, setSystems] = useState<DesignEntity[]>([])
  const [techRadar, setTechRadar] = useState<TechRadarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeRadarRing, setActiveRadarRing] = useState<keyof typeof ringConfig>('adopt')
  const [selectedLevelId, setSelectedLevelId] = useState('beginner')
  const [expandedCourses, setExpandedCourses] = useState<string[]>([])
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('hero')

  // Timeline Navigation Sections (with Components as special view)
  const timelineSections = [
    { id: 'hero', label: 'Старт' },
    { id: 'features', label: 'Возможности' },
    { id: 'academy', label: 'Академия' },
  ]

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    )

    timelineSections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const [systemsRes, radarRes] = await Promise.all([
          fetch('/api/systems'),
          fetch('/api/tech-radar'),
        ])
        
        const systemsData = await systemsRes.json()
        const radarData = await radarRes.json()
        
        setSystems(systemsData)
        setTechRadar(radarData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const currentLevel = academyStructure.levels.find(l => l.id === selectedLevelId)
  const totalLessons = academyStructure.levels.reduce((acc, level) => 
    acc + level.courses.reduce((sum, course) => 
      sum + course.modules.reduce((mSum, mod) => mSum + mod.lessons.length, 0), 0
    ), 0
  )

  const totalDuration = academyStructure.levels.reduce((acc, level) => 
    acc + level.courses.reduce((sum, course) => 
      sum + course.modules.reduce((mSum, mod) => 
        mSum + mod.lessons.reduce((lSum, lesson) => {
          const mins = parseInt(lesson.duration)
          return lSum + mins
        }, 0), 0
      ), 0
    ), 0
  )

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-3 h-3" />
      case 'quiz': return <Target className="w-3 h-3" />
      case 'article': return <FileText className="w-3 h-3" />
      case 'practice': return <Code2 className="w-3 h-3" />
      default: return <FileCheck className="w-3 h-3" />
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
    <div className="min-h-screen flex flex-col bg-background">
      {/* Components Full-Page View */}
      <AnimatePresence>
        {componentsViewOpen && (
          <motion.div
            key="components-view"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-background flex"
          >
            {/* 3-Column Grid Layout: Categories | Components | Preview */}
            <div className="grid grid-cols-[240px_280px_1fr] h-full w-full">
              {/* Column 1: Categories */}
              <div className="border-r border-border flex flex-col h-full">
                {/* Header - фиксированная высота */}
                <div className="h-16 px-4 flex items-center gap-3 border-b border-border flex-shrink-0">
                  <button
                    onClick={() => setComponentsViewOpen(false)}
                    className="w-10 h-10 border-2 border-foreground/20 flex items-center justify-center hover:border-foreground transition-all flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="text-base font-bold">UI Компоненты</span>
                </div>
                
                {/* Categories List */}
                <div className="flex-1 overflow-y-auto">
                  {uiComponents.categories.map((category) => {
                    const IconComponent = category.icon
                    const isSelected = selectedCategoryId === category.id
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategoryId(isSelected ? null : category.id)
                          setSelectedComponent(null)
                        }}
                        className={`w-full h-14 px-4 flex items-center gap-3 transition-colors text-left ${
                          isSelected ? 'bg-muted/50' : 'hover:bg-muted/30'
                        }`}
                      >
                        <div className={`w-9 h-9 border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-foreground' : 'border-border'
                        }`}>
                          <IconComponent className="w-4 h-4 flex-shrink-0" />
                        </div>
                        <span className="flex-1 text-sm font-medium truncate">{category.name}</span>
                        <span className="text-sm text-muted-foreground w-6 text-right flex-shrink-0">{category.components.length}</span>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${isSelected ? 'rotate-90' : ''}`} />
                      </button>
                    )
                  })}
                </div>
                
                {/* Footer - фиксированная высота */}
                <div className="h-12 px-4 flex items-center justify-between border-t border-border flex-shrink-0">
                  <ThemeToggle />
                  <a 
                    href="https://ui.shadcn.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    shadcn
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Column 2: Components List */}
              <div className="border-r border-border flex flex-col h-full">
                {/* Header - фиксированная высота */}
                <div className="h-16 px-4 flex items-center border-b border-border flex-shrink-0">
                  <span className="text-base font-bold">
                    {selectedCategoryId 
                      ? uiComponents.categories.find(c => c.id === selectedCategoryId)?.name 
                      : 'Компоненты'}
                  </span>
                </div>
                
                {/* Components List */}
                <div className="flex-1 overflow-y-auto">
                  {selectedCategoryId ? (
                    uiComponents.categories
                      .find(c => c.id === selectedCategoryId)
                      ?.components.map((comp) => (
                        <button
                          key={comp.name}
                          onClick={() => setSelectedComponent({
                            ...comp, 
                            category: uiComponents.categories.find(c => c.id === selectedCategoryId)?.name || ''
                          })}
                          className={`w-full h-16 px-4 text-left transition-colors ${
                            selectedComponent?.name === comp.name 
                              ? 'bg-muted/50 border-l-2 border-foreground' 
                              : 'hover:bg-muted/30 border-l-2 border-transparent'
                          }`}
                        >
                          <div className="text-sm font-medium">{comp.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{comp.desc}</div>
                        </button>
                      ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                      ← Выберите категорию
                    </div>
                  )}
                </div>
              </div>

              {/* Column 3: Preview Panel */}
              <div className="flex flex-col overflow-hidden h-full">
                {/* Preview Header - фиксированная высота, всегда виден */}
                <div className="h-16 px-4 flex items-center border-b border-border flex-shrink-0">
                  {selectedComponent ? (
                    <>
                      <span className="text-sm text-muted-foreground">{selectedComponent.category}</span>
                      <span className="text-muted-foreground mx-2">/</span>
                      <span className="text-base font-bold">{selectedComponent.name}</span>
                    </>
                  ) : (
                    <span className="text-base font-bold">Превью</span>
                  )}
                </div>
                
                {selectedComponent ? (
                  <>
                    
                    {/* Two-Level Tabs - фиксированная высота */}
                    <div className="h-14 flex items-center justify-center gap-4 px-4 border-b border-border flex-shrink-0">
                      {/* Level 1: Library Tabs */}
                      <div className="flex gap-1">
                        {uiLibraries.map((lib) => (
                          <button
                            key={lib.id}
                            onClick={() => setSelectedLibrary(lib.id)}
                            className={`h-9 px-4 text-sm font-medium whitespace-nowrap transition-all ${
                              selectedLibrary === lib.id
                                ? 'bg-foreground text-background'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            {lib.name}
                          </button>
                        ))}
                      </div>
                      
                      {/* Разделитель */}
                      <div className="w-px h-8 bg-border" />
                      
                      {/* Level 2: Mode Tabs */}
                      <div className="flex gap-2">
                        {previewModes.map((mode) => {
                          const IconComponent = mode.icon
                          return (
                            <button
                              key={mode.id}
                              onClick={() => setPreviewMode(mode.id as 'preview' | 'code' | 'props')}
                              className={`h-9 px-4 text-sm font-medium flex items-center gap-2 border transition-all ${
                                previewMode === mode.id
                                  ? 'bg-foreground text-background border-foreground'
                                  : 'text-muted-foreground border-border hover:border-foreground/50'
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                              {mode.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Preview Content based on Mode */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                      {selectedComponent.code && selectedComponent.code[selectedLibrary] ? (
                        <div className="p-6 flex flex-col gap-6 min-h-full">
                          {/* Preview Mode */}
                          {previewMode === 'preview' && (
                            <div className="flex-1 flex flex-col">
                              {/* Component Preview Area - на всю высоту */}
                              <div className="flex-1 border border-border bg-muted/30 flex items-center justify-center">
                                {/* Render actual shadcn/ui components */}
                                {selectedLibrary === 'shadcn' && (
                                  <div className="flex flex-wrap gap-4 items-center justify-center p-8">
                                    {selectedComponent.name === 'Button' && (
                                      <>
                                        <Button variant="outline">Click me</Button>
                                        <Button variant="destructive">Delete</Button>
                                        <Button size="sm">Small</Button>
                                      </>
                                    )}
                                    {selectedComponent.name === 'Input' && (
                                      <div className="flex flex-col gap-3 w-64">
                                        <input 
                                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                          placeholder="Enter text..."
                                        />
                                        <input 
                                          type="email"
                                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                          placeholder="email@example.com"
                                        />
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Badge' && (
                                      <div className="flex gap-2">
                                        <Badge>Default</Badge>
                                        <Badge variant="secondary">Secondary</Badge>
                                        <Badge variant="destructive">Destructive</Badge>
                                        <Badge variant="outline">Outline</Badge>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Card' && (
                                      <Card className="w-64">
                                        <CardHeader>
                                          <CardTitle>Card Title</CardTitle>
                                          <CardDescription>Card description</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-sm">Card content goes here</p>
                                        </CardContent>
                                      </Card>
                                    )}
                                    {selectedComponent.name === 'Progress' && (
                                      <div className="w-64">
                                        <Progress value={66} className="w-full" />
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Accordion' && (
                                      <div className="w-80 border border-border rounded-md">
                                        <div className="p-4 border-b border-border bg-muted/30 font-medium">Section 1</div>
                                        <div className="p-4 text-sm text-muted-foreground">Content for section 1</div>
                                        <div className="p-4 border-t border-b border-border bg-muted/30 font-medium">Section 2</div>
                                        <div className="p-4 text-sm text-muted-foreground">Content for section 2</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Breadcrumb' && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <span className="text-muted-foreground">Home</span>
                                        <span className="text-muted-foreground">/</span>
                                        <span className="text-muted-foreground">Components</span>
                                        <span className="text-muted-foreground">/</span>
                                        <span className="font-medium">Breadcrumb</span>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Tabs' && (
                                      <div className="flex gap-1 border-b border-border pb-2">
                                        <div className="px-4 py-2 bg-foreground text-background text-sm">Tab 1</div>
                                        <div className="px-4 py-2 text-muted-foreground text-sm">Tab 2</div>
                                        <div className="px-4 py-2 text-muted-foreground text-sm">Tab 3</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Alert' && (
                                      <div className="w-80 p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                                        <div className="font-medium">Warning</div>
                                        <div className="text-sm text-muted-foreground">This is a warning alert</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Dialog' && (
                                      <div className="border border-border rounded-lg p-6 bg-background shadow-lg w-72">
                                        <div className="font-bold text-lg mb-2">Dialog Title</div>
                                        <div className="text-sm text-muted-foreground mb-4">Dialog content goes here</div>
                                        <div className="flex gap-2 justify-end">
                                          <Button variant="outline" size="sm">Cancel</Button>
                                          <Button size="sm">Confirm</Button>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Toast' && (
                                      <div className="border border-border rounded-md p-4 bg-background shadow-md flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">✓</div>
                                        <div>
                                          <div className="font-medium text-sm">Success!</div>
                                          <div className="text-xs text-muted-foreground">Changes saved</div>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Avatar' && (
                                      <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">JD</div>
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">AB</div>
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">CD</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Tooltip' && (
                                      <div className="flex flex-col items-center gap-2">
                                        <div className="px-3 py-1.5 bg-foreground text-background text-sm rounded">Hover me</div>
                                        <div className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded border">Tooltip text</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Navigation Menu' && (
                                      <div className="flex gap-1 border-b border-border">
                                        <div className="px-4 py-2 text-sm font-medium hover:bg-muted/50 cursor-pointer">Home</div>
                                        <div className="px-4 py-2 text-sm font-medium bg-muted/50 cursor-pointer">Products</div>
                                        <div className="px-4 py-2 text-sm font-medium hover:bg-muted/50 cursor-pointer">About</div>
                                        <div className="px-4 py-2 text-sm font-medium hover:bg-muted/50 cursor-pointer">Contact</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Pagination' && (
                                      <div className="flex items-center gap-1">
                                        <div className="w-8 h-8 flex items-center justify-center border border-border rounded text-sm cursor-pointer hover:bg-muted/50">←</div>
                                        <div className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded text-sm">1</div>
                                        <div className="w-8 h-8 flex items-center justify-center border border-border rounded text-sm cursor-pointer hover:bg-muted/50">2</div>
                                        <div className="w-8 h-8 flex items-center justify-center border border-border rounded text-sm cursor-pointer hover:bg-muted/50">3</div>
                                        <div className="w-8 h-8 flex items-center justify-center border border-border rounded text-sm cursor-pointer hover:bg-muted/50">→</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Sidebar' && (
                                      <div className="w-48 border border-border rounded-md overflow-hidden">
                                        <div className="p-3 bg-muted/30 border-b border-border font-medium text-sm">Menu</div>
                                        <div className="p-2 text-sm hover:bg-muted/50 cursor-pointer">📊 Dashboard</div>
                                        <div className="p-2 text-sm bg-muted/50 cursor-pointer">⚙️ Settings</div>
                                        <div className="p-2 text-sm hover:bg-muted/50 cursor-pointer">👤 Profile</div>
                                        <div className="p-2 text-sm hover:bg-muted/50 cursor-pointer">🚪 Logout</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Checkbox' && (
                                      <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-foreground bg-foreground flex items-center justify-center">
                                          <span className="text-background text-xs">✓</span>
                                        </div>
                                        <div className="w-5 h-5 border-2 border-border"></div>
                                        <span className="text-sm">Checkboxes</span>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Switch' && (
                                      <div className="flex items-center gap-4">
                                        <div className="w-11 h-6 bg-foreground rounded-full relative">
                                          <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full"></div>
                                        </div>
                                        <div className="w-11 h-6 bg-muted rounded-full relative">
                                          <div className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full"></div>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Slider' && (
                                      <div className="w-64">
                                        <div className="h-2 bg-muted rounded-full relative">
                                          <div className="h-full w-2/3 bg-foreground rounded-full"></div>
                                          <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-4 h-4 bg-foreground rounded-full border-2 border-background"></div>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Textarea' && (
                                      <textarea 
                                        className="w-64 h-24 p-3 border border-border rounded-md bg-background text-sm resize-none"
                                        placeholder="Enter your message..."
                                      />
                                    )}
                                    {selectedComponent.name === 'Select' && (
                                      <div className="w-48 border border-border rounded-md p-2 bg-background flex justify-between items-center cursor-pointer">
                                        <span className="text-sm">Select option</span>
                                        <span className="text-xs">▼</span>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Radio Group' && (
                                      <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                          <div className="w-4 h-4 border-2 border-foreground rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-foreground rounded-full"></div>
                                          </div>
                                          <span className="text-sm">Option 1</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-4 h-4 border-2 border-border rounded-full"></div>
                                          <span className="text-sm">Option 2</span>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Input OTP' && (
                                      <div className="flex gap-2">
                                        <div className="w-10 h-12 border border-border rounded flex items-center justify-center text-lg font-bold">4</div>
                                        <div className="w-10 h-12 border border-border rounded flex items-center justify-center text-lg font-bold">2</div>
                                        <div className="w-10 h-12 border border-border rounded flex items-center justify-center text-lg font-bold">8</div>
                                        <div className="w-10 h-12 border-2 border-foreground rounded flex items-center justify-center"></div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Label' && (
                                      <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <input className="h-10 w-48 border border-border rounded px-3 text-sm" placeholder="example@email.com" />
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Alert Dialog' && (
                                      <div className="border border-border rounded-lg p-6 bg-background shadow-lg w-64">
                                        <div className="font-bold text-lg mb-2 text-center">⚠️ Are you sure?</div>
                                        <div className="text-sm text-muted-foreground mb-4 text-center">This action cannot be undone.</div>
                                        <div className="flex gap-2 justify-center">
                                          <Button variant="outline" size="sm">Cancel</Button>
                                          <Button variant="destructive" size="sm">Delete</Button>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Drawer' && (
                                      <div className="border border-border rounded-lg overflow-hidden w-64">
                                        <div className="bg-muted/30 p-3 border-b border-border font-medium text-sm flex justify-between">
                                          <span>Drawer Title</span>
                                          <span className="cursor-pointer">✕</span>
                                        </div>
                                        <div className="p-4 text-sm text-muted-foreground">Drawer content goes here</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Sheet' && (
                                      <div className="border border-border rounded-lg overflow-hidden w-64">
                                        <div className="bg-muted/30 p-3 border-b border-border font-medium text-sm flex justify-between">
                                          <span>Sheet Title</span>
                                          <span className="cursor-pointer">✕</span>
                                        </div>
                                        <div className="p-4 text-sm text-muted-foreground">Sheet content here</div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Popover' && (
                                      <div className="flex flex-col items-center gap-2">
                                        <div className="px-4 py-2 border border-border rounded text-sm cursor-pointer hover:bg-muted/50">Click me</div>
                                        <div className="border border-border rounded p-3 bg-background shadow-lg text-sm">
                                          <div className="font-medium mb-1">Popover Title</div>
                                          <div className="text-muted-foreground text-xs">Popover content</div>
                                        </div>
                                      </div>
                                    )}
                                    {selectedComponent.name === 'Hover Card' && (
                                      <div className="flex flex-col items-center gap-2">
                                        <div className="px-4 py-2 text-sm cursor-pointer hover:underline">@username</div>
                                        <div className="border border-border rounded p-3 bg-background shadow-lg text-sm w-48">
                                          <div className="font-medium">John Doe</div>
                                          <div className="text-muted-foreground text-xs">Software Engineer</div>
                                        </div>
                                      </div>
                                    )}
                                    {!['Button', 'Input', 'Badge', 'Card', 'Progress', 'Accordion', 'Breadcrumb', 'Tabs', 'Alert', 'Dialog', 'Toast', 'Avatar', 'Tooltip', 'Navigation Menu', 'Pagination', 'Sidebar', 'Checkbox', 'Switch', 'Slider', 'Textarea', 'Select', 'Radio Group', 'Input OTP', 'Label', 'Alert Dialog', 'Drawer', 'Sheet', 'Popover', 'Hover Card'].includes(selectedComponent.name) && (
                                      <div className="text-center">
                                        <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                                        <p className="text-sm text-muted-foreground">Превью компонента</p>
                                        <p className="text-xs text-muted-foreground/50 mt-1">
                                          {selectedComponent.name}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {/* Other libraries - show preview */}
                                {selectedLibrary !== 'shadcn' && (
                                  <div className="flex flex-wrap gap-4 items-center justify-center p-8">
                                    {/* Material UI Preview */}
                                    {selectedLibrary === 'mui' && (
                                      <>
                                        {selectedComponent.name === 'Button' && (
                                          <div className="flex gap-3">
                                            <div className="px-4 py-2 border border-blue-500 text-blue-500 rounded text-sm cursor-pointer hover:bg-blue-50">Outlined</div>
                                            <div className="px-4 py-2 bg-blue-500 text-white rounded text-sm cursor-pointer hover:bg-blue-600">Contained</div>
                                            <div className="px-4 py-2 text-blue-500 text-sm cursor-pointer hover:bg-blue-50">Text</div>
                                          </div>
                                        )}
                                        {selectedComponent.name !== 'Button' && (
                                          <div className="text-center">
                                            <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                                            <p className="text-sm text-muted-foreground">Material UI</p>
                                            <p className="text-xs text-muted-foreground/50 mt-1">{selectedComponent.name}</p>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {/* Chakra UI Preview */}
                                    {selectedLibrary === 'chakra' && (
                                      <>
                                        {selectedComponent.name === 'Button' && (
                                          <div className="flex gap-3">
                                            <div className="px-4 py-2 border border-teal-500 text-teal-500 rounded text-sm">Outline</div>
                                            <div className="px-4 py-2 bg-teal-500 text-white rounded text-sm">Solid</div>
                                            <div className="px-4 py-2 bg-red-500 text-white rounded text-sm">Danger</div>
                                          </div>
                                        )}
                                        {selectedComponent.name !== 'Button' && (
                                          <div className="text-center">
                                            <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                                            <p className="text-sm text-muted-foreground">Chakra UI</p>
                                            <p className="text-xs text-muted-foreground/50 mt-1">{selectedComponent.name}</p>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {/* Mantine Preview */}
                                    {selectedLibrary === 'mantine' && (
                                      <>
                                        {selectedComponent.name === 'Button' && (
                                          <div className="flex gap-3">
                                            <div className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded text-sm">Outline</div>
                                            <div className="px-4 py-2 bg-indigo-500 text-white rounded text-sm">Filled</div>
                                            <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">Default</div>
                                          </div>
                                        )}
                                        {selectedComponent.name !== 'Button' && (
                                          <div className="text-center">
                                            <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                                            <p className="text-sm text-muted-foreground">Mantine</p>
                                            <p className="text-xs text-muted-foreground/50 mt-1">{selectedComponent.name}</p>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {/* Ant Design Preview */}
                                    {selectedLibrary === 'ant' && (
                                      <>
                                        {selectedComponent.name === 'Button' && (
                                          <div className="flex gap-3">
                                            <div className="px-4 py-2 border border-red-500 text-red-500 rounded text-sm">Default</div>
                                            <div className="px-4 py-2 bg-red-500 text-white rounded text-sm">Primary</div>
                                            <div className="px-4 py-2 border border-red-500 text-red-500 rounded text-sm border-dashed">Dashed</div>
                                          </div>
                                        )}
                                        {selectedComponent.name !== 'Button' && (
                                          <div className="text-center">
                                            <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                                            <p className="text-sm text-muted-foreground">Ant Design</p>
                                            <p className="text-xs text-muted-foreground/50 mt-1">{selectedComponent.name}</p>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* Code Mode */}
                          {previewMode === 'code' && (
                            <div className="flex flex-col gap-3 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Код</span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(selectedComponent.code?.[selectedLibrary] || '')
                                  }}
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-border hover:bg-muted/50 transition-colors"
                                >
                                  <FileCheck className="w-3.5 h-3.5" />
                                  Копировать
                                </button>
                              </div>
                              <pre className="p-4 bg-muted/30 border border-border overflow-auto text-sm font-mono leading-relaxed flex-1">
                                <code>{selectedComponent.code[selectedLibrary]}</code>
                              </pre>
                              
                              {/* Dependencies with copy button */}
                              <div className="p-4 border border-border bg-muted/20">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium">Зависимости</span>
                                  <button
                                    onClick={() => {
                                      const depCommand = 
                                        selectedLibrary === 'shadcn' ? 'npm install @radix-ui/react-slot class-variance-authority' :
                                        selectedLibrary === 'mui' ? 'npm install @mui/material @emotion/react @emotion/styled' :
                                        selectedLibrary === 'chakra' ? 'npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion' :
                                        selectedLibrary === 'mantine' ? 'npm install @mantine/core @mantine/hooks' :
                                        selectedLibrary === 'ant' ? 'npm install antd' : ''
                                      navigator.clipboard.writeText(depCommand)
                                    }}
                                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-border hover:bg-muted/50 transition-colors"
                                  >
                                    <FileCheck className="w-3.5 h-3.5" />
                                    Копировать
                                  </button>
                                </div>
                                <code className="text-sm text-muted-foreground">
                                  {selectedLibrary === 'shadcn' && 'npm install @radix-ui/react-slot class-variance-authority'}
                                  {selectedLibrary === 'mui' && 'npm install @mui/material @emotion/react @emotion/styled'}
                                  {selectedLibrary === 'chakra' && 'npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion'}
                                  {selectedLibrary === 'mantine' && 'npm install @mantine/core @mantine/hooks'}
                                  {selectedLibrary === 'ant' && 'npm install antd'}
                                </code>
                              </div>
                            </div>
                          )}
                          
                          {/* Props Mode */}
                          {previewMode === 'props' && (
                            <div className="flex flex-col gap-6">
                              <div className="text-base font-medium">
                                Свойства компонента {selectedComponent.name}
                              </div>
                              
                              {/* Props table */}
                              <div className="border border-border">
                                <table className="w-full text-sm">
                                  <thead className="bg-muted/30">
                                    <tr className="border-b border-border">
                                      <th className="text-left p-4 font-medium">Prop</th>
                                      <th className="text-left p-4 font-medium">Type</th>
                                      <th className="text-left p-4 font-medium">Default</th>
                                      <th className="text-left p-4 font-medium">Описание</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedLibrary === 'shadcn' && (
                                      <>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">variant</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"default"</td>
                                          <td className="p-4 text-muted-foreground">Вариант отображения</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">size</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"default"</td>
                                          <td className="p-4 text-muted-foreground">Размер компонента</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">className</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">—</td>
                                          <td className="p-4 text-muted-foreground">Дополнительные CSS классы</td>
                                        </tr>
                                        <tr>
                                          <td className="p-4 font-mono">disabled</td>
                                          <td className="p-4 font-mono text-muted-foreground">boolean</td>
                                          <td className="p-4 font-mono text-muted-foreground">false</td>
                                          <td className="p-4 text-muted-foreground">Отключить компонент</td>
                                        </tr>
                                      </>
                                    )}
                                    {selectedLibrary === 'mui' && (
                                      <>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">variant</td>
                                          <td className="p-4 font-mono text-muted-foreground">'text' | 'outlined' | 'contained'</td>
                                          <td className="p-4 font-mono text-muted-foreground">"outlined"</td>
                                          <td className="p-4 text-muted-foreground">Вариант отображения</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">color</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"primary"</td>
                                          <td className="p-4 text-muted-foreground">Цвет компонента</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">size</td>
                                          <td className="p-4 font-mono text-muted-foreground">'small' | 'medium' | 'large'</td>
                                          <td className="p-4 font-mono text-muted-foreground">"medium"</td>
                                          <td className="p-4 text-muted-foreground">Размер компонента</td>
                                        </tr>
                                        <tr>
                                          <td className="p-4 font-mono">disabled</td>
                                          <td className="p-4 font-mono text-muted-foreground">boolean</td>
                                          <td className="p-4 font-mono text-muted-foreground">false</td>
                                          <td className="p-4 text-muted-foreground">Отключить компонент</td>
                                        </tr>
                                      </>
                                    )}
                                    {selectedLibrary === 'chakra' && (
                                      <>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">variant</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"solid"</td>
                                          <td className="p-4 text-muted-foreground">Вариант отображения</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">colorScheme</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"blue"</td>
                                          <td className="p-4 text-muted-foreground">Цветовая схема</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">size</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"md"</td>
                                          <td className="p-4 text-muted-foreground">Размер компонента</td>
                                        </tr>
                                        <tr>
                                          <td className="p-4 font-mono">isDisabled</td>
                                          <td className="p-4 font-mono text-muted-foreground">boolean</td>
                                          <td className="p-4 font-mono text-muted-foreground">false</td>
                                          <td className="p-4 text-muted-foreground">Отключить компонент</td>
                                        </tr>
                                      </>
                                    )}
                                    {selectedLibrary === 'mantine' && (
                                      <>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">variant</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"filled"</td>
                                          <td className="p-4 text-muted-foreground">Вариант отображения</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">color</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"blue"</td>
                                          <td className="p-4 text-muted-foreground">Цвет компонента</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">size</td>
                                          <td className="p-4 font-mono text-muted-foreground">string</td>
                                          <td className="p-4 font-mono text-muted-foreground">"sm"</td>
                                          <td className="p-4 text-muted-foreground">Размер компонента</td>
                                        </tr>
                                        <tr>
                                          <td className="p-4 font-mono">disabled</td>
                                          <td className="p-4 font-mono text-muted-foreground">boolean</td>
                                          <td className="p-4 font-mono text-muted-foreground">false</td>
                                          <td className="p-4 text-muted-foreground">Отключить компонент</td>
                                        </tr>
                                      </>
                                    )}
                                    {selectedLibrary === 'ant' && (
                                      <>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">type</td>
                                          <td className="p-4 font-mono text-muted-foreground">'primary' | 'default' | 'dashed' | 'link' | 'text'</td>
                                          <td className="p-4 font-mono text-muted-foreground">"default"</td>
                                          <td className="p-4 text-muted-foreground">Тип кнопки</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">danger</td>
                                          <td className="p-4 font-mono text-muted-foreground">boolean</td>
                                          <td className="p-4 font-mono text-muted-foreground">false</td>
                                          <td className="p-4 text-muted-foreground">Опасное действие</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                          <td className="p-4 font-mono">size</td>
                                          <td className="p-4 font-mono text-muted-foreground">'small' | 'middle' | 'large'</td>
                                          <td className="p-4 font-mono text-muted-foreground">"middle"</td>
                                          <td className="p-4 text-muted-foreground">Размер компонента</td>
                                        </tr>
                                        <tr>
                                          <td className="p-4 font-mono">disabled</td>
                                          <td className="p-4 font-mono text-muted-foreground">boolean</td>
                                          <td className="p-4 font-mono text-muted-foreground">false</td>
                                          <td className="p-4 text-muted-foreground">Отключить компонент</td>
                                        </tr>
                                      </>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center p-6">
                          <div className="text-center">
                            {previewMode === 'preview' ? (
                              <>
                                <Layers className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <p className="text-base text-muted-foreground">Превью недоступно</p>
                                <p className="text-sm text-muted-foreground/50 mt-2">
                                  Для этой библиотеки пока нет превью
                                </p>
                              </>
                            ) : previewMode === 'code' ? (
                              <>
                                <Code2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <p className="text-base text-muted-foreground">Код недоступен</p>
                                <p className="text-sm text-muted-foreground/50 mt-2">
                                  Для этой библиотеки пока нет примера
                                </p>
                              </>
                            ) : (
                              <>
                                <Braces className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <p className="text-base text-muted-foreground">Свойства недоступны</p>
                                <p className="text-sm text-muted-foreground/50 mt-2">
                                  Для этой библиотеки пока нет описания
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* Empty State - по центру */
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Layers className="w-16 h-16 mb-4 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">
                        {selectedCategoryId ? 'Выберите компонент' : 'Выберите категорию'}
                      </p>
                      <p className="text-xs text-muted-foreground/50 mt-1">
                        {selectedCategoryId ? 'из списка слева' : 'для просмотра компонентов'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Full-Page View */}
      <AnimatePresence>
        {guideViewOpen && (
          <motion.div
            key="guide-view"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Guide Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setGuideViewOpen(false)} className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <Compass className="w-5 h-5" />
                <span className="font-bold text-lg">Интерактивный гайд выбора</span>
              </div>
              <Badge variant="outline">Tech Radar + Matrix + Wizard</Badge>
            </div>

            {/* Guide Content */}
            <div className="flex-1 overflow-auto">
              {/* Navigation Tabs */}
              <div className="border-b border-border bg-background sticky top-0 z-10">
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'libraries', label: 'Библиотеки' },
                    { id: 'architecture', label: 'Архитектура' },
                    { id: 'stacks', label: 'Связки' },
                    { id: 'compare', label: 'Сравнение' },
                    { id: 'design', label: 'Дизайн' },
                    { id: 'decision', label: 'Выбор' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveGuideSection(tab.id)}
                      className={`px-4 py-3 text-sm font-medium uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                        activeGuideSection === tab.id 
                          ? 'border-foreground text-foreground' 
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* SECTION: Libraries */}
                {activeGuideSection === 'libraries' && (
                  <div className="space-y-8">
                    {/* Headless */}
                    <div>
                      <div className="mb-6">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Группа А</span>
                        <h2 className="text-2xl font-semibold tracking-tight mt-1">HEADLESS</h2>
                        <p className="text-sm text-muted-foreground mt-2">Гибкость, Tailwind, малый вес. Требуют настройки дизайна, но дают полный контроль.</p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-px bg-border">
                        {headlessLibraries.map((lib) => (
                          <div key={lib.name} className="bg-background p-5 hover:bg-muted/30 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-lg font-semibold tracking-tight">{lib.name}</h3>
                              <span className="text-xs uppercase tracking-wider px-2 py-1 border border-foreground/50 text-foreground">Headless</span>
                            </div>
                            <div className="space-y-3 text-sm">
                              <div className="grid grid-cols-2 gap-4">
                                <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Размер</span><p className="font-mono">{lib.size}</p></div>
                                <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Компоненты</span><p className="font-mono">{lib.components}</p></div>
                              </div>
                              <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Совместимость</span><p>{lib.compatibility}</p></div>
                              <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Особенность</span><p>{lib.feature}</p></div>
                              {lib.verdict && (
                                <div className="pt-3 border-t border-border">
                                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Вердикт</p>
                                  <p className="font-medium">{lib.verdict}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Styled */}
                    <div>
                      <div className="mb-6">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Группа Б</span>
                        <h2 className="text-2xl font-semibold tracking-tight mt-1">STYLED</h2>
                        <p className="text-sm text-muted-foreground mt-2">Скорость, готовый дизайн. Имеют свою дизайн-систему. Сложнее адаптировать под уникальный макет.</p>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                        {styledLibraries.map((lib) => (
                          <div key={lib.name} className="bg-background p-5 hover:bg-muted/30 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-lg font-semibold tracking-tight">{lib.name}</h3>
                              <span className="text-xs uppercase tracking-wider px-2 py-1 border border-border text-muted-foreground">Styled</span>
                            </div>
                            <div className="space-y-3 text-sm">
                              <div className="grid grid-cols-2 gap-4">
                                <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Размер</span><p className="font-mono">{lib.size}</p></div>
                                <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Компоненты</span><p className="font-mono">{lib.components}</p></div>
                              </div>
                              <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Совместимость</span><p>{lib.compatibility}</p></div>
                              <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Особенность</span><p>{lib.feature}</p></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Architecture */}
                {activeGuideSection === 'architecture' && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">АРХИТЕКТУРА</h2>
                      <p className="text-sm text-muted-foreground mt-2">Headless против Styled: фундаментальное влияние на процесс разработки</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-px bg-border">
                      {/* Headless */}
                      <div className="bg-background p-6">
                        <div className="mb-6">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">Группа А</span>
                          <h3 className="text-xl font-semibold tracking-tight mt-1">HEADLESS</h3>
                          <p className="text-sm text-muted-foreground mt-1">Shadcn, Radix, Headless UI</p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Суть</h4>
                            <p className="text-sm leading-relaxed">Библиотека даёт только логику (открытие/закрытие меню, доступность). Стили пишете сами через Tailwind.</p>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Плюсы</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex gap-2"><span className="text-foreground">[+]</span><span>Полный контроль над дизайном</span></li>
                              <li className="flex gap-2"><span className="text-foreground">[+]</span><span>Малый вес бандла</span></li>
                              <li className="flex gap-2"><span className="text-foreground">[+]</span><span>Лёгкая стилизация</span></li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Минусы</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex gap-2"><span className="text-muted-foreground">[-]</span><span>Требует времени на написание CSS</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Styled */}
                      <div className="bg-background p-6">
                        <div className="mb-6">
                          <span className="text-xs uppercase tracking-wider text-muted-foreground">Группа Б</span>
                          <h3 className="text-xl font-semibold tracking-tight mt-1">STYLED</h3>
                          <p className="text-sm text-muted-foreground mt-1">Ant Design, MUI, Mantine</p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Суть</h4>
                            <p className="text-sm leading-relaxed">Библиотека даёт и логику, и готовый внешний вид.</p>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Плюсы</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex gap-2"><span className="text-foreground">[+]</span><span>Высокая скорость разработки</span></li>
                              <li className="flex gap-2"><span className="text-foreground">[+]</span><span>Готовые сложные компоненты</span></li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Минусы</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex gap-2"><span className="text-muted-foreground">[-]</span><span>Большой вес бандла</span></li>
                              <li className="flex gap-2"><span className="text-muted-foreground">[-]</span><span>Сложная перекраска (война стилей)</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Stacks */}
                {activeGuideSection === 'stacks' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">РЕКОМЕНДУЕМЫЕ СВЯЗКИ</h2>
                      <p className="text-sm text-muted-foreground mt-2">С учётом TypeScript — стандарта индустрии, отлично поддерживаемого всеми библиотеками</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                      {recommendedStacks.map((stack, i) => (
                        <div key={stack.id} className="bg-background p-5 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                              <h3 className="text-lg font-semibold tracking-tight">{stack.name}</h3>
                            </div>
                            <span className={`text-xs uppercase tracking-wider px-2 py-1 border ${stack.type === 'headless' ? 'border-foreground/50 text-foreground' : 'border-border text-muted-foreground'}`}>
                              {stack.type === 'headless' ? 'Headless' : 'Styled'}
                            </span>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div><span className="text-muted-foreground uppercase text-xs tracking-wider">Библиотека</span><p className="font-medium">{stack.library}</p></div>
                            <p className="text-muted-foreground leading-relaxed">{stack.description}</p>
                            <div className="pt-3 border-t border-border">
                              <span className="text-muted-foreground uppercase text-xs tracking-wider">Для каких задач</span>
                              <p>{stack.useCase}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Full Stack Table */}
                    <div className="border border-border bg-background overflow-x-auto">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">РЕКОМЕНДУЕМЫЕ СВЯЗКИ</h3>
                        <p className="text-xs text-muted-foreground mt-1">Полный технический стек для разных задач</p>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Стек</th>
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Библиотека</th>
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Тип</th>
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Размер</th>
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Для каких задач</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fullStackData.map((row, i) => (
                            <tr key={row.stack} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/10'}>
                              <td className="px-4 py-3 font-mono text-xs">{row.stack}</td>
                              <td className="px-4 py-3 font-medium">{row.library}</td>
                              <td className="px-4 py-3">
                                <span className={`text-xs uppercase tracking-wider px-2 py-0.5 border ${row.type === 'headless' ? 'border-foreground/30 text-foreground' : 'border-border text-muted-foreground'}`}>
                                  {row.type === 'headless' ? 'Headless' : 'Styled'}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-mono">{row.size}</td>
                              <td className="px-4 py-3 text-muted-foreground">{row.useCase}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SECTION: Compare */}
                {activeGuideSection === 'compare' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">СРАВНЕНИЕ БИБЛИОТЕК</h2>
                      <p className="text-sm text-muted-foreground mt-2">Лидеры по критериям и статистика</p>
                    </div>

                    {/* Leaders by Criteria */}
                    <div className="border border-border bg-background">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">ЛИДЕРЫ ПО КРИТЕРИЯМ</h3>
                        <p className="text-xs text-muted-foreground mt-1">Кто лучше по каждому показателю</p>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                        {comparisonData.map((item) => (
                          <div key={item.criterion} className="bg-background p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{item.criterion}</div>
                                <div className="font-semibold">{item.winner}</div>
                                <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                              </div>
                              <div className="text-2xl font-mono font-medium">{item.score}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Library Stats */}
                    <div className="border border-border bg-background overflow-x-auto">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">Статистика библиотек</h3>
                        <p className="text-xs text-muted-foreground mt-1">GitHub звёзды, загрузки npm, год создания</p>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Библиотека</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">GitHub Stars</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">NPM / неделя</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Год</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Лицензия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {libraryStats.map((lib, i) => (
                            <tr key={lib.name} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/10'}>
                              <td className="px-4 py-3 font-medium">{lib.name}</td>
                              <td className="px-4 py-3 text-center font-mono">{lib.stars}</td>
                              <td className="px-4 py-3 text-center font-mono">{lib.weeklyDownloads}</td>
                              <td className="px-4 py-3 text-center font-mono">{lib.year}</td>
                              <td className="px-4 py-3 text-center">{lib.license}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Heatmap */}
                    <div className="border border-border bg-background">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">МАТРИЦА СОВМЕСТИМОСТИ</h3>
                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Интенсивность показывает качество интеграции</p>
                      </div>
                      <div className="p-6">
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              <th className="text-left pb-3 uppercase text-xs tracking-wider font-medium text-muted-foreground">Библиотека</th>
                              <th className="text-center pb-3 uppercase text-xs tracking-wider font-medium text-muted-foreground">Tailwind</th>
                              <th className="text-center pb-3 uppercase text-xs tracking-wider font-medium text-muted-foreground">CSS Modules</th>
                              <th className="text-center pb-3 uppercase text-xs tracking-wider font-medium text-muted-foreground">CSS-in-JS</th>
                              <th className="text-center pb-3 uppercase text-xs tracking-wider font-medium text-muted-foreground">Styled Comp.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {compatibilityMatrix.map((row, i) => (
                              <tr key={row.library} className={i % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'}>
                                <td className="py-2 pr-4 font-medium">{row.library}</td>
                                <td className="p-1 text-center">
                                  <span className={`inline-block w-12 h-8 leading-8 font-mono text-xs ${row.tailwind >= 90 ? 'bg-foreground text-background' : row.tailwind >= 70 ? 'bg-foreground/70 text-background' : row.tailwind >= 50 ? 'bg-foreground/40 text-foreground' : 'bg-muted/30 text-muted-foreground'}`}>
                                    {row.tailwind}
                                  </span>
                                </td>
                                <td className="p-1 text-center">
                                  <span className={`inline-block w-12 h-8 leading-8 font-mono text-xs ${row.cssModules >= 90 ? 'bg-foreground text-background' : row.cssModules >= 70 ? 'bg-foreground/70 text-background' : row.cssModules >= 50 ? 'bg-foreground/40 text-foreground' : 'bg-muted/30 text-muted-foreground'}`}>
                                    {row.cssModules}
                                  </span>
                                </td>
                                <td className="p-1 text-center">
                                  <span className={`inline-block w-12 h-8 leading-8 font-mono text-xs ${row.cssInJs >= 90 ? 'bg-foreground text-background' : row.cssInJs >= 70 ? 'bg-foreground/70 text-background' : row.cssInJs >= 50 ? 'bg-foreground/40 text-foreground' : 'bg-muted/30 text-muted-foreground'}`}>
                                    {row.cssInJs}
                                  </span>
                                </td>
                                <td className="p-1 text-center">
                                  <span className={`inline-block w-12 h-8 leading-8 font-mono text-xs ${row.styledComponents >= 90 ? 'bg-foreground text-background' : row.styledComponents >= 70 ? 'bg-foreground/70 text-background' : row.styledComponents >= 50 ? 'bg-foreground/40 text-foreground' : 'bg-muted/30 text-muted-foreground'}`}>
                                    {row.styledComponents}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-6 pt-4 border-t border-border">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="uppercase tracking-wider">Шкала:</span>
                            <div className="flex items-center gap-1"><span className="w-4 h-4 bg-muted/30" /><span>Низкая</span></div>
                            <div className="flex items-center gap-1"><span className="w-4 h-4 bg-foreground/40" /><span>Средняя</span></div>
                            <div className="flex items-center gap-1"><span className="w-4 h-4 bg-foreground" /><span>Высокая</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Design */}
                {activeGuideSection === 'design' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">РЕАЛИЗАЦИЯ ДИЗАЙНА</h2>
                      <p className="text-sm text-muted-foreground mt-2">Как выбор связки влияет на реализацию одного и того же макета</p>
                    </div>

                    {designScenarios.map((s, i) => (
                      <div key={i} className="border border-border">
                        <div className="px-5 py-4 border-b border-border bg-muted/10">
                          <h3 className="font-semibold tracking-tight">{s.title}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-px bg-border">
                          <div className="bg-background p-5">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium uppercase tracking-wider">Headless</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <span key={level} className={`w-4 h-4 border ${level <= s.headlessRating ? 'bg-foreground border-foreground' : 'bg-transparent border-border'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.headlessDesc}</p>
                          </div>
                          <div className="bg-background p-5">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium uppercase tracking-wider">Styled</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <span key={level} className={`w-4 h-4 border ${level <= s.styledRating ? 'bg-foreground border-foreground' : 'bg-transparent border-border'}`} />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.styledDesc}</p>
                          </div>
                        </div>
                        <div className="px-5 py-4 bg-muted/5 border-t border-border">
                          <p className="text-sm"><span className="text-xs uppercase tracking-wider text-muted-foreground mr-2">Вывод:</span>{s.conclusion}</p>
                        </div>
                      </div>
                    ))}

                    {/* Radix Section */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold tracking-tight mb-4">КОГДА ПРИМЕНЯТЬ RADIX UI?</h3>
                      <p className="text-sm text-muted-foreground mb-6">Radix UI — это чистый двигатель. Стоит выбирать отдельно от Shadcn/ui в трёх случаях:</p>
                      <div className="border border-border divide-y divide-border">
                        {radixUseCases.map((item, i) => (
                          <div key={i} className="p-5">
                            <div className="flex gap-4">
                              <span className="text-xs font-mono text-muted-foreground">[{i + 1}]</span>
                              <div>
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Decision */}
                {activeGuideSection === 'decision' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">АЛГОРИТМ ВЫБОРА</h2>
                      <p className="text-sm text-muted-foreground mt-2">Быстрый способ принять правильное решение</p>
                    </div>

                    <div className="border border-border divide-y divide-border">
                      {decisionAlgorithm.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/5 transition-colors">
                          <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, '0')}</span>
                          <div className="flex-1">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">Если</span>
                            <p className="font-medium">{item.condition}</p>
                          </div>
                          <span className="text-muted-foreground">--&gt;</span>
                          <span className="text-sm font-mono font-medium">{item.result}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border border-border p-6 bg-muted/5">
                      <h3 className="text-lg font-semibold tracking-tight mb-4">БЫСТРАЯ СПРАВКА</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Headless — выбирайте если:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Нужен уникальный дизайн</span></li>
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Важен малый размер бандла</span></li>
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Используете Tailwind CSS</span></li>
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Хотите полный контроль над UI</span></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Styled — выбирайте если:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Нужна быстрая разработка</span></li>
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Стандартный enterprise-дизайн</span></li>
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Много сложных таблиц и форм</span></li>
                            <li className="flex gap-2"><span className="text-muted-foreground">-</span><span>Нет жёстких требований к дизайну</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Systems Catalog Full-Page View */}
      <AnimatePresence>
        {systemsViewOpen && (
          <motion.div
            key="systems-view"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Systems Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setSystemsViewOpen(false)} className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <Database className="w-5 h-5" />
                <span className="font-bold text-lg">Каталог систем</span>
              </div>
              <Badge variant="outline">Radar + Matrix + Stats</Badge>
            </div>

            {/* Systems Content */}
            <div className="flex-1 overflow-auto">
              {/* Navigation Tabs */}
              <div className="border-b border-border bg-background sticky top-0 z-10">
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Обзор' },
                    { id: 'design', label: 'Дизайн-системы' },
                    { id: 'libraries', label: 'UI Библиотеки' },
                    { id: 'radar', label: 'Radar' },
                    { id: 'stats', label: 'Статистика' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSystemsSection(tab.id)}
                      className={`px-4 py-3 text-sm font-medium uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                        activeSystemsSection === tab.id
                          ? 'border-foreground text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* SECTION: Overview */}
                {activeSystemsSection === 'overview' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">Обзор</h2>
                      <p className="text-sm text-muted-foreground mt-2">UI библиотеки и дизайн-системы для ваших проектов</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                      <div className="bg-background p-5 text-center">
                        <div className="text-2xl font-bold">{systemsComparison.length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">UI Библиотек</div>
                      </div>
                      <div className="bg-background p-5 text-center">
                        <div className="text-2xl font-bold">{designSystems.length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Дизайн-систем</div>
                      </div>
                      <div className="bg-background p-5 text-center">
                        <div className="text-2xl font-bold">{systemsComparison.filter(s => s.type === 'headless').length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Headless</div>
                      </div>
                      <div className="bg-background p-5 text-center">
                        <div className="text-2xl font-bold">{systemsComparison.filter(s => s.type === 'styled').length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Styled</div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="grid md:grid-cols-2 gap-px bg-border">
                      <div className="bg-background p-6 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setActiveSystemsSection('design')}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">Дизайн-системы</h3>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Гайдлайны, токены, принципы дизайна. Корпоративные и open-source системы.</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px]">Material Design</Badge>
                          <Badge variant="secondary" className="text-[10px]">Apple HIG</Badge>
                          <Badge variant="secondary" className="text-[10px]">Carbon</Badge>
                          <Badge variant="secondary" className="text-[10px]">+{designSystems.length - 3}</Badge>
                        </div>
                      </div>
                      <div className="bg-background p-6 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setActiveSystemsSection('libraries')}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold">UI Библиотеки</h3>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Готовые компоненты для React: кнопки, формы, модалки. Headless и Styled решения.</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-[10px]">Shadcn/ui</Badge>
                          <Badge variant="secondary" className="text-[10px]">MUI</Badge>
                          <Badge variant="secondary" className="text-[10px]">Mantine</Badge>
                          <Badge variant="secondary" className="text-[10px]">+{systemsComparison.length - 3}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: UI Libraries */}
                {activeSystemsSection === 'libraries' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">UI Библиотеки</h2>
                      <p className="text-sm text-muted-foreground mt-2">Готовые компоненты для React и Next.js</p>
                    </div>

                    {/* Headless */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Категория А</span>
                        <h3 className="text-lg font-semibold tracking-tight">HEADLESS</h3>
                        <span className="text-xs text-muted-foreground">— Гибкость, Tailwind, малый вес</span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-px bg-border">
                        {systemsComparison.filter(s => s.type === 'headless').map((lib) => (
                          <div key={lib.name} className="bg-background p-5 hover:bg-muted/30 transition-colors">
                            <div className="flex items-start gap-3 mb-3">
                              <div 
                                className={`w-10 h-10 flex items-center justify-center flex-shrink-0 rounded ${lib.logoBg}`}
                              >
                                {lib.logoComponent}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold truncate">{lib.name}</h4>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground text-xs uppercase tracking-wider">GitHub</span>
                                <span className="font-mono">{lib.stars}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground text-xs uppercase tracking-wider">Bundle</span>
                                <span className="font-mono">{lib.bundle}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground text-xs uppercase tracking-wider">Компоненты</span>
                                <span className="font-mono">{lib.components}</span>
                              </div>
                              <div className="flex gap-1 pt-2">
                                {lib.ts && <Badge variant="secondary" className="text-[10px]">TS</Badge>}
                                {lib.tailwind && <Badge variant="secondary" className="text-[10px]">Tailwind</Badge>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Styled */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Категория Б</span>
                        <h3 className="text-lg font-semibold tracking-tight">STYLED</h3>
                        <span className="text-xs text-muted-foreground">— Скорость, готовый дизайн</span>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                        {systemsComparison.filter(s => s.type === 'styled').map((lib) => (
                          <div key={lib.name} className="bg-background p-5 hover:bg-muted/30 transition-colors">
                            <div className="flex items-start gap-3 mb-3">
                              <div 
                                className={`w-10 h-10 flex items-center justify-center flex-shrink-0 rounded ${lib.logoBg}`}
                              >
                                {lib.logoComponent}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold truncate">{lib.name}</h4>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground text-xs uppercase tracking-wider">GitHub</span>
                                <span className="font-mono">{lib.stars}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground text-xs uppercase tracking-wider">Bundle</span>
                                <span className="font-mono">{lib.bundle}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground text-xs uppercase tracking-wider">Компоненты</span>
                                <span className="font-mono">{lib.components}</span>
                              </div>
                              <div className="flex gap-1 pt-2">
                                {lib.ts && <Badge variant="secondary" className="text-[10px]">TS</Badge>}
                                {lib.cssInJs && <Badge variant="secondary" className="text-[10px]">CSS-in-JS</Badge>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Design Systems */}
                {activeSystemsSection === 'design' && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">Дизайн-системы</h2>
                      <p className="text-sm text-muted-foreground mt-2">Гайдлайны, токены и принципы дизайна</p>
                    </div>

                    {designSystems.map((system) => (
                      <div key={system.name} className="border border-border bg-background">
                        <div className="p-5 border-b border-border">
                          <div className="flex items-start gap-4">
                            <div 
                              className={`w-12 h-12 flex items-center justify-center flex-shrink-0 rounded ${system.logoBg}`}
                            >
                              {system.logoComponent}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-lg">{system.name}</h4>
                                  <span className="text-sm text-muted-foreground">{system.company} • {system.year}</span>
                                </div>
                                <Badge variant="outline" className="text-xs uppercase">{system.type === 'corporate' ? 'Корпоративная' : system.type === 'community' ? 'Community' : 'Commercial'}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 space-y-4">
                          <p className="text-sm text-muted-foreground">{system.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">Design Tokens</span>
                              <div className="flex flex-wrap gap-1">
                                {system.tokens.map((token) => (
                                  <Badge key={token} variant="secondary" className="text-[10px]">{token}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">Платформы</span>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {system.platforms.map((p) => (
                                  <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-border">
                            <a 
                              href={`https://${system.url}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between text-xs text-[#0000FF] hover:underline transition-colors group"
                            >
                              <span>{system.url}</span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SECTION: Radar */}
                {activeSystemsSection === 'radar' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">Radar сравнение</h2>
                      <p className="text-sm text-muted-foreground mt-2">Визуальное сравнение библиотек по ключевым метрикам</p>
                    </div>

                    {/* Radar Chart */}
                    <div className="border border-border bg-background p-6">
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={systemsRadarData}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--foreground))', fontSize: 14, fontWeight: 600 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                            <Radar name="Shadcn" dataKey="shadcn" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground))" fillOpacity={0.2} strokeWidth={2} />
                            <Radar name="MUI" dataKey="mui" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.1} strokeWidth={2} />
                            <Radar name="Mantine" dataKey="mantine" stroke="#34d399" fill="#34d399" fillOpacity={0.1} strokeWidth={2} />
                            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-px bg-border">
                      {[
                        { name: 'Shadcn/ui', color: 'bg-foreground' },
                        { name: 'Material UI', color: 'bg-[#60a5fa]' },
                        { name: 'Ant Design', color: 'bg-[#1890ff]' },
                        { name: 'Mantine', color: 'bg-[#34d399]' },
                        { name: 'Chakra UI', color: 'bg-[#319795]' },
                      ].map((item) => (
                        <div key={item.name} className="bg-background p-3 flex items-center gap-2">
                          <div className={`w-3 h-3 ${item.color}`} />
                          <span className="text-xs">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SECTION: Compare */}
                {activeSystemsSection === 'compare' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">ТАБЛИЦА СРАВНЕНИЯ</h2>
                      <p className="text-sm text-muted-foreground mt-2">Детальное сравнение характеристик</p>
                    </div>

                    {/* Comparison Table */}
                    <div className="border border-border bg-background overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-4 py-3 text-left uppercase text-xs tracking-wider font-medium">Библиотека</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Тип</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Stars</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">NPM/w</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Bundle</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Комп.</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">TS</th>
                            <th className="px-4 py-3 text-center uppercase text-xs tracking-wider font-medium">Tailwind</th>
                          </tr>
                        </thead>
                        <tbody>
                          {systemsComparison.map((lib, i) => (
                            <tr key={lib.name} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/10'}>
                              <td className="px-4 py-3 font-medium">{lib.name}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`text-xs uppercase tracking-wider px-2 py-0.5 border ${lib.type === 'headless' ? 'border-foreground/30 text-foreground' : 'border-border text-muted-foreground'}`}>
                                  {lib.type}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center font-mono">{lib.stars}</td>
                              <td className="px-4 py-3 text-center font-mono">{lib.downloads}</td>
                              <td className="px-4 py-3 text-center font-mono">{lib.bundle}</td>
                              <td className="px-4 py-3 text-center font-mono">{lib.components}</td>
                              <td className="px-4 py-3 text-center">
                                {lib.ts ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground">-</span>}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {lib.tailwind ? <span className="text-emerald-500">✓</span> : <span className="text-muted-foreground">-</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Use Case Recommendations */}
                    <div className="border border-border bg-background">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">РЕКОМЕНДАЦИИ ПО ЗАДАЧАМ</h3>
                      </div>
                      <div className="divide-y divide-border">
                        {systemsByUseCase.map((item, i) => (
                          <div key={i} className="p-5 hover:bg-muted/5 transition-colors">
                            <div className="flex items-start gap-4">
                              <span className="text-xs font-mono text-muted-foreground">[{i + 1}]</span>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{item.useCase}</h4>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {item.recommended.map((lib) => (
                                    <Badge key={lib} variant="outline" className="text-xs">{lib}</Badge>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{item.reason}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION: Stats */}
                {activeSystemsSection === 'stats' && (
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">Статистика</h2>
                      <p className="text-sm text-muted-foreground mt-2">GitHub звёзды, загрузки npm, лицензии</p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
                      <div className="bg-background p-6 text-center">
                        <Database className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">{systemsComparison.length}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Библиотек</div>
                      </div>
                      <div className="bg-background p-6 text-center">
                        <Star className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">434K</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Всего Stars</div>
                      </div>
                      <div className="bg-background p-6 text-center">
                        <Download className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">12.6M</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Загрузок/w</div>
                      </div>
                      <div className="bg-background p-6 text-center">
                        <Layers className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <div className="text-2xl font-bold">420</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Компонентов</div>
                      </div>
                    </div>

                    {/* GitHub Stars Chart */}
                    <div className="border border-border bg-background">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">GITHUB STARS</h3>
                      </div>
                      <div className="p-6 space-y-3">
                        {systemsComparison.sort((a, b) => parseInt(b.stars) - parseInt(a.stars)).map((lib) => {
                          const maxStars = 94
                          const width = (parseInt(lib.stars) / maxStars) * 100
                          return (
                            <div key={lib.name} className="flex items-center gap-4">
                              <span className="w-24 text-sm font-medium truncate">{lib.name}</span>
                              <div className="flex-1 h-2 bg-muted/30 relative">
                                <motion.div
                                  className="h-full bg-foreground"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${width}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                              </div>
                              <span className="w-16 text-right font-mono text-sm">{lib.stars}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Bundle Size Chart */}
                    <div className="border border-border bg-background">
                      <div className="px-5 py-4 border-b border-border">
                        <h3 className="font-semibold tracking-tight">РАЗМЕР БАНДЛА (меньше = лучше)</h3>
                      </div>
                      <div className="p-6 space-y-3">
                        {systemsComparison.sort((a, b) => parseInt(a.bundle.replace('~', '').replace('KB', '')) - parseInt(b.bundle.replace('~', '').replace('KB', ''))).map((lib) => {
                          const maxSize = 450
                          const size = parseInt(lib.bundle.replace('~', '').replace('KB', ''))
                          const width = (size / maxSize) * 100
                          return (
                            <div key={lib.name} className="flex items-center gap-4">
                              <span className="w-24 text-sm font-medium truncate">{lib.name}</span>
                              <div className="flex-1 h-2 bg-muted/30 relative">
                                <motion.div
                                  className={`h-full ${size < 100 ? 'bg-emerald-500' : size < 200 ? 'bg-amber-500' : 'bg-red-500'}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${width}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                              </div>
                              <span className="w-16 text-right font-mono text-sm">{lib.bundle}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border bg-muted/30 px-6 py-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider">DesignSystems Hub</span>
                  <span>Каталог v2.0 • {systemsComparison.length} библиотек</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tokens View Overlay */}
      <AnimatePresence>
        {tokensViewOpen && (
          <motion.div
            key="tokens-view"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Tokens Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setTokensViewOpen(false)} className="p-2 hover:bg-muted/50 rounded transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <Settings className="w-5 h-5" />
                <span className="font-bold text-lg">Design Tokens</span>
              </div>
              <Badge variant="outline">Colors • Typography • Spacing • Motion</Badge>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-border bg-muted/20">
              <div className="flex overflow-x-auto">
                {tokensTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTokensSection(tab.id)}
                    className={`px-4 py-3 text-sm font-medium uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                      activeTokensSection === tab.id
                        ? 'border-foreground text-foreground'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                {/* Overview */}
                {activeTokensSection === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Design Tokens</h2>
                      <p className="text-muted-foreground">Система визуальных переменных для консистентного дизайна</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {tokensCategories.map((cat) => (
                        <div key={cat.id} className="border border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setActiveTokensSection(cat.id)}>
                          <div className="text-2xl font-bold mb-1">
                            {cat.id === 'colors' && '362'}
                            {cat.id === 'typography' && '15'}
                            {cat.id === 'spacing' && '21'}
                            {cat.id === 'radii' && '8'}
                            {cat.id === 'shadows' && '26'}
                            {cat.id === 'motion' && '13'}
                          </div>
                          <div className="text-sm font-medium">{cat.label}</div>
                          <div className="text-xs text-muted-foreground">{cat.desc}</div>
                        </div>
                      ))}
                    </div>

                    {/* Preview Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Colors Preview */}
                      <div className="border border-border p-5">
                        <h3 className="font-semibold tracking-tight mb-4 flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                          Цвета
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {['#18181B', '#F97316', '#22C55E', '#EF4444'].map((color) => (
                            <div key={color} className="aspect-square rounded" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </div>

                      {/* Typography Preview */}
                      <div className="border border-border p-5">
                        <h3 className="font-semibold tracking-tight mb-4">Типографика</h3>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">Заголовок</div>
                          <div className="text-base">Основной текст</div>
                          <div className="text-xs text-muted-foreground">Мелкий текст</div>
                        </div>
                      </div>

                      {/* Spacing Preview */}
                      <div className="border border-border p-5">
                        <h3 className="font-semibold tracking-tight mb-4">Отступы</h3>
                        <div className="space-y-2">
                          {[4, 8, 16, 24].map((size) => (
                            <div key={size} className="flex items-center gap-2">
                              <div className="bg-primary w-4 h-4" style={{ marginLeft: `${size}px` }} />
                              <span className="text-xs text-muted-foreground">{size}px</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Colors */}
                {activeTokensSection === 'colors' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Цвета</h2>
                      <p className="text-muted-foreground">Цветовые токены для брендинга, семантики и поверхностей</p>
                    </div>

                    {/* Brand Colors */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Брендовые цвета</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {colorTokens.brands.map((color) => (
                          <div key={color.name} className="border border-border">
                            <div className="h-12 flex items-end p-2" style={{ backgroundColor: color.light }}>
                              <span className="text-xs font-mono text-white mix-blend-difference">{color.light}</span>
                            </div>
                            <div className="p-2 border-t border-border">
                              <div className="font-medium text-sm">{color.name}</div>
                              <div className="text-xs text-muted-foreground">{color.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Semantic Colors */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Семантические цвета</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {colorTokens.semantics.map((color) => (
                          <div key={color.name} className="border border-border">
                            <div className="h-10 flex items-center justify-center" style={{ backgroundColor: color.light }}>
                              <span className="text-white text-sm font-medium">{color.name}</span>
                            </div>
                            <div className="p-2 border-t border-border">
                              <div className="font-mono text-xs">{color.light}</div>
                              <div className="text-xs text-muted-foreground">{color.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Surface Colors */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Поверхности</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {colorTokens.surfaces.map((color) => (
                          <div key={color.name} className="border border-border">
                            <div className="h-10 border-b" style={{ backgroundColor: color.light }} />
                            <div className="p-2">
                              <div className="font-medium text-sm">{color.name}</div>
                              <div className="font-mono text-xs text-muted-foreground">
                                {color.light} / {color.dark}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Typography */}
                {activeTokensSection === 'typography' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Типографика</h2>
                      <p className="text-muted-foreground">Шрифты, размеры и начертания</p>
                    </div>

                    {/* Font Families */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Шрифты</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {typographyTokens.fonts.map((font) => (
                          <div key={font.name} className="border border-border p-4">
                            <div className="text-xl mb-2" style={{ fontFamily: font.value }}>{font.name}</div>
                            <div className="text-xs font-mono text-muted-foreground break-all">{font.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Font Sizes */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Размеры</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {typographyTokens.sizes.map((size) => (
                          <div key={size.name} className="flex items-center gap-3 border border-border p-3">
                            <div className="w-10 font-mono text-sm text-muted-foreground">{size.name}</div>
                            <div className="w-20 font-mono text-xs text-muted-foreground">{size.px}</div>
                            <div style={{ fontSize: size.value }} className="flex-1 truncate">{size.example}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Font Weights */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Насыщенность</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {typographyTokens.weights.map((weight) => (
                          <div key={weight.name} className="border border-border p-4 text-center">
                            <div className="text-2xl mb-2" style={{ fontWeight: weight.value }}>Aa</div>
                            <div className="font-medium">{weight.name}</div>
                            <div className="text-xs text-muted-foreground">{weight.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Spacing */}
                {activeTokensSection === 'spacing' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Отступы</h2>
                      <p className="text-muted-foreground">Масштаб spacing для margins, paddings и gaps</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      {spacingTokens.map((space) => (
                        <div key={space.name} className="flex items-center gap-3 border border-border p-3">
                          <div className="w-8 font-mono text-sm">{space.name}</div>
                          <div className="w-14 font-mono text-xs text-muted-foreground">{space.px}</div>
                          <div className="flex-1 h-4 bg-muted rounded overflow-hidden">
                            <div className="bg-primary h-full" style={{ width: space.px }} />
                          </div>
                          <div className="text-xs text-muted-foreground w-28 truncate">{space.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Radii */}
                {activeTokensSection === 'radii' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Радиусы</h2>
                      <p className="text-muted-foreground">Скругления углов для элементов</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {radiiTokens.map((radius) => (
                        <div key={radius.name} className="border border-border p-4 text-center">
                          <div 
                            className="w-20 h-20 mx-auto mb-3 bg-muted border border-border flex items-center justify-center text-2xl"
                            style={{ borderRadius: radius.value === '9999px' ? '50%' : radius.value }}
                          >
                            {radius.example}
                          </div>
                          <div className="font-medium">{radius.name}</div>
                          <div className="font-mono text-xs text-muted-foreground">{radius.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">{radius.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shadows */}
                {activeTokensSection === 'shadows' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Тени</h2>
                      <p className="text-muted-foreground">Elevation и глубина для создания иерархии</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {shadowTokens.map((shadow) => (
                        <div key={shadow.name} className="text-center">
                          <div 
                            className="w-32 h-32 mx-auto mb-4 bg-background rounded-lg flex items-center justify-center"
                            style={{ boxShadow: shadow.value }}
                          >
                            <span className="text-4xl font-bold text-muted-foreground">{shadow.elevation}</span>
                          </div>
                          <div className="font-medium">{shadow.name}</div>
                          <div className="text-xs text-muted-foreground">{shadow.desc}</div>
                          <div className="font-mono text-xs text-muted-foreground mt-1 break-all">{shadow.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Motion */}
                {activeTokensSection === 'motion' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Motion</h2>
                      <p className="text-muted-foreground">Длительности и функции распределения для анимаций</p>
                    </div>

                    {/* Durations */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Длительности</h3>
                      <div className="space-y-3">
                        {motionTokens.durations.map((duration) => (
                          <div key={duration.name} className="flex items-center gap-4 border-b border-border pb-3">
                            <div className="w-24 font-mono text-sm">{duration.name}</div>
                            <div className="w-20 font-mono text-xs text-muted-foreground">{duration.value}</div>
                            <div className="flex-1">
                              <div className="h-2 bg-muted rounded overflow-hidden">
                                <div 
                                  className="h-full bg-primary animate-pulse" 
                                  style={{ animationDuration: duration.value === '0ms' ? '1s' : duration.value }}
                                />
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground w-32">{duration.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Easings */}
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight mb-4">Easing Functions</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {motionTokens.easings.map((easing) => (
                          <div key={easing.name} className="border border-border p-4">
                            <div className="font-medium mb-2">{easing.name}</div>
                            <div className="font-mono text-xs text-muted-foreground break-all mb-3">{easing.value}</div>
                            <div className="text-xs text-muted-foreground">{easing.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison */}
                {activeTokensSection === 'comparison' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">Сравнение систем</h2>
                      <p className="text-muted-foreground">Количество токенов в разных UI библиотеках</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border border-border">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left p-3 border-b border-border">Система</th>
                            <th className="text-center p-3 border-b border-border">Цвета</th>
                            <th className="text-center p-3 border-b border-border">Типографика</th>
                            <th className="text-center p-3 border-b border-border">Отступы</th>
                            <th className="text-center p-3 border-b border-border">Радиусы</th>
                            <th className="text-center p-3 border-b border-border">Тени</th>
                            <th className="text-center p-3 border-b border-border">Motion</th>
                            <th className="text-center p-3 border-b border-border">Всего</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tokensComparison.map((system) => (
                            <tr key={system.system} className="hover:bg-muted/30">
                              <td className="p-3 border-b border-border font-medium">{system.system}</td>
                              <td className="p-3 border-b border-border text-center">{system.colors}</td>
                              <td className="p-3 border-b border-border text-center">{system.typography}</td>
                              <td className="p-3 border-b border-border text-center">{system.spacing}</td>
                              <td className="p-3 border-b border-border text-center">{system.radii}</td>
                              <td className="p-3 border-b border-border text-center">{system.shadows}</td>
                              <td className="p-3 border-b border-border text-center">{system.motion}</td>
                              <td className="p-3 border-b border-border text-center font-bold">
                                {system.colors + system.typography + system.spacing + system.radii + system.shadows + system.motion}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border bg-muted/30 px-6 py-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="uppercase tracking-wider">Design Tokens Hub</span>
                  <span>Tailwind CSS Scale</span>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Navigator - Fixed Left */}
      <nav className={`fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block transition-opacity ${(componentsViewOpen || tokensViewOpen || systemsViewOpen) ? 'opacity-0 pointer-events-none' : ''}`}>
        <div className="flex flex-col items-center gap-0">
          {/* Vertical Line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-border" />
          
          {/* Active Marker Line */}
          <motion.div 
            className="absolute left-[5px] w-[3px] bg-foreground"
            animate={{
              top: `${timelineSections.findIndex(s => s.id === activeSection) * 36}px`,
              height: '18px'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          
          {/* Section Dots */}
          {timelineSections.map((section, index) => (
            <Tooltip key={section.id}>
              <TooltipTrigger asChild>
                <a
                  href={`#${section.id}`}
                  className="relative z-10 w-4 h-4 flex items-center justify-center mb-5 last:mb-0 group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      activeSection === section.id 
                        ? 'bg-foreground' 
                        : 'bg-muted-foreground/40 group-hover:bg-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute inset-0 w-4 h-4 rounded-full border border-foreground/50"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {section.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </nav>

      {/* Industrial Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center transition-transform group-hover:scale-105">
              <Layout className="w-5 h-5 text-white dark:text-zinc-900" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg tracking-tight">DESIGNSYSTEMS</span>
              <span className="text-zinc-500 text-xs block -mt-1 tracking-widest">HUB</span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#features" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Возможности</a>
              </TooltipTrigger>
              <TooltipContent>Каталог, гайды, токены</TooltipContent>
            </Tooltip>
            <a href="#academy" className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/80 transition-colors">АКАДЕМИЯ</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#academy" className="hidden sm:flex">
              <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <GraduationCap className="w-4 h-4" />
                Начать обучение
              </Button>
            </a>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col">
                <a href="#features" className="px-4 py-3 text-muted-foreground hover:text-foreground border-b border-border">Возможности</a>
                <a href="#academy" className="px-4 py-3 font-medium bg-foreground text-background text-center mt-2">АКАДЕМИЯ</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero - Industrial Style */}
      <section id="hero" className="relative overflow-hidden border-b border-border">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted border border-border mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase">Новая платформа</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Единый центр
              <br />
              <span className="text-muted-foreground">дизайн-систем</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Исследуйте, сравнивайте и выбирайте идеальные дизайн-системы.
              Интерактивные инструменты, <a href="#academy" className="underline decoration-zinc-400 hover:decoration-foreground transition-colors">академия</a> и рекомендации экспертов.
            </p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90 px-8">
                Исследовать системы
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a href="#academy">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-2">
                  <BookOpen className="w-4 h-4" />
                  Академия
                </Button>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Tech Stack Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {['Next.js 16', 'React 19', 'Tailwind 4', 'Radix UI'].map((tech, i) => (
              <div 
                key={tech} 
                className="px-4 py-2 border border-border bg-muted/30 text-sm flex items-center gap-2 hover:bg-muted/50 transition-colors cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Square className="w-2 h-2 fill-current text-muted-foreground" />
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features - Industrial Grid */}
      <section id="features" className="py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-foreground" />
              <span className="text-xs tracking-widest uppercase text-muted-foreground">01</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Возможности платформы</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Catalog */}
            <motion.div
              variants={fadeInUp}
              className="bg-background p-8 hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={() => setSystemsViewOpen(true)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                  <Database className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-xs">Каталог</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground">Каталог систем</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Рейтинги, звёзды GitHub, сравнение характеристик. Фильтрация по категориям.
              </p>
              <div className="flex items-center justify-between">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Рейтинги и звёзды GitHub
                  </li>
                </ul>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Interactive Guide */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-background p-8 lg:col-span-2 hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={() => setGuideViewOpen(true)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                  <Compass className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-xs">Популярное</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground">Интерактивный гайд выбора</h3>
              <p className="text-muted-foreground text-sm mb-4">
                ТехноРадар, матрица решений и глубокое сравнение библиотек.
              </p>
              
              {/* Tech Radar Mini Preview */}
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-4 gap-px bg-border flex-1">
                  {(Object.keys(ringConfig) as Array<keyof typeof ringConfig>).map((ring) => (
                    <div
                      key={ring}
                      className="p-3 text-left bg-background"
                    >
                      <div className="text-xs font-bold tracking-wider">{ringConfig[ring].label}</div>
                      <div className="text-lg font-bold mt-1">{techRadar?.[ring]?.technologies?.length || 0}</div>
                    </div>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform ml-4" />
              </div>
            </motion.div>

            {/* Academy Card */}
            <motion.div variants={fadeInUp} className="bg-background">
              <a href="#academy" className="block p-8 h-full hover:bg-muted/30 transition-colors group">
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground">Академия</h3>
                <p className="text-muted-foreground text-sm mb-4">Обучение дизайну и разработке</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span>{totalLessons} уроков</span>
                  <span>•</span>
                  <span>{Math.round(totalDuration / 60)}ч контента</span>
                </div>
                <div className="flex items-center text-sm font-medium group-hover:underline">
                  Перейти к обучению
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            </motion.div>

            {/* Design Tokens */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-background p-8 hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={() => setTokensViewOpen(true)}
            >
              <div className="w-12 h-12 border border-border flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground">Design Tokens</h3>
              <p className="text-muted-foreground text-sm mb-4">Управление визуальными переменными</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {['Цвета', 'Типографика', 'Отступы', 'Радиусы'].map((token) => (
                    <Badge key={token} variant="secondary" className="text-[10px]">{token}</Badge>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Components - Click to open full view */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-background p-8 hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={() => setComponentsViewOpen(true)}
            >
              <div className="w-12 h-12 border border-border flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground">Компоненты</h3>
              <p className="text-muted-foreground text-sm mb-4">Готовые UI компоненты</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {['Кнопки', 'Карточки', 'Формы', 'Модалки'].map((comp) => (
                    <Badge key={comp} variant="secondary" className="text-[10px]">{comp}</Badge>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Academy - Full Hierarchy */}
      <section id="academy" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-foreground" />
              <span className="text-xs tracking-widest uppercase text-muted-foreground">04</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Академия дизайн-систем</h2>
            <p className="text-muted-foreground mt-2">Глубокое погружение в теорию и практику</p>
          </motion.div>

          {/* Academy Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-background p-6 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{totalLessons}</div>
              <div className="text-xs text-muted-foreground">Уроков</div>
            </div>
            <div className="bg-background p-6 text-center">
              <Layers className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{academyStructure.levels.reduce((acc, l) => acc + l.courses.length, 0)}</div>
              <div className="text-xs text-muted-foreground">Курсов</div>
            </div>
            <div className="bg-background p-6 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{academyStructure.levels.length}</div>
              <div className="text-xs text-muted-foreground">Уровней</div>
            </div>
            <div className="bg-background p-6 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{Math.round(totalDuration / 60)}ч</div>
              <div className="text-xs text-muted-foreground">Контента</div>
            </div>
          </motion.div>

          {/* Level Tabs */}
          <Tabs defaultValue="beginner" className="w-full" onValueChange={setSelectedLevelId}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted border border-border">
              {academyStructure.levels.map((level) => (
                <TabsTrigger 
                  key={level.id} 
                  value={level.id} 
                  className="data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  <span className="hidden sm:inline">Уровень {level.level} — </span>
                  <span className="sm:hidden">Ур. {level.level} — </span>
                  {level.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {academyStructure.levels.map((level) => (
              <TabsContent key={level.id} value={level.id} className="mt-0">
                {/* Level Header */}
                <div className="flex items-center gap-4 mb-6 p-4 border border-border bg-background">
                  <div className={`w-10 h-10 bg-gradient-to-r ${level.color} flex items-center justify-center`}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">{level.title}</div>
                    <div className="text-sm text-muted-foreground">{level.description}</div>
                  </div>
                </div>
                
                {/* Courses with Full Hierarchy */}
                <div className="space-y-2">
                  {level.courses.map((course) => {
                    const isExpanded = expandedCourses.includes(course.id)
                    const IconComponent = course.icon
                    
                    return (
                      <div key={course.id} className="border border-border bg-background">
                        {/* Course Header */}
                        <button
                          onClick={() => toggleCourse(course.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 bg-gradient-to-r ${level.color} flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">{course.name}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} уроков
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Course Content - Expanded */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-border p-4 space-y-2 bg-muted/10">
                                {course.modules.map((module) => {
                                  const isModuleExpanded = expandedModules.includes(module.id)
                                  
                                  return (
                                    <div key={module.id} className="border border-border bg-background">
                                      {/* Module Header */}
                                      <button
                                        onClick={() => toggleModule(module.id)}
                                        className="w-full p-3 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-6 h-6 border border-border flex items-center justify-center text-xs text-muted-foreground">
                                            {module.id.split('-').pop()}
                                          </div>
                                          <div className="text-left">
                                            <div className="text-sm font-medium">{module.name}</div>
                                            <div className="text-xs text-muted-foreground">{module.lessons.length} уроков</div>
                                          </div>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isModuleExpanded ? 'rotate-180' : ''}`} />
                                      </button>
                                      
                                      {/* Lessons */}
                                      <AnimatePresence>
                                        {isModuleExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="border-t border-border">
                                              {module.lessons.map((lesson) => (
                                                <div 
                                                  key={lesson.id}
                                                  className="flex items-center justify-between p-3 pl-12 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0"
                                                >
                                                  <div className="flex items-center gap-3">
                                                    <Lock className="w-3 h-3 text-muted-foreground" />
                                                    <span className="text-sm">{lesson.name}</span>
                                                  </div>
                                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1 capitalize">
                                                      {getLessonTypeIcon(lesson.type)}
                                                      {lesson.type}
                                                    </span>
                                                    <span>{lesson.duration}</span>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Footer - Industrial Style */}
      <footer className="border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                  <Layout className="w-5 h-5 text-white dark:text-zinc-900" />
                </div>
                <div>
                  <span className="font-bold">DESIGNSYSTEMS</span>
                  <span className="text-zinc-500 text-xs block">HUB</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                Единый центр дизайн-систем. Исследуйте, сравнивайте и выбирайте идеальные решения для ваших проектов.
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4 text-xs tracking-wider uppercase">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Возможности</a></li>
                <li><a href="#academy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Академия</a></li>
              </ul>
            </div>
            
            {/* Tech Stack */}
            <div>
              <h4 className="font-semibold mb-4 text-xs tracking-wider uppercase">Стек технологий</h4>
              <div className="flex flex-wrap gap-1">
                {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Radix UI', 'shadcn/ui', 'Framer Motion'].map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted-foreground">
              © 2025 DesignSystems Hub. Все права защищены.
            </div>
            <div className="flex items-center gap-4">
              <a href="#academy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Академия
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </TooltipProvider>
  )
}
