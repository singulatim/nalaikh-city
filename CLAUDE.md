# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm run dev` - Start development server with Turbopack (includes Payload CMS admin)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Package Management
- Uses npm with package-lock.json
- Node.js packages managed via package.json

### Content Management
- **Admin Panel**: Access Payload CMS admin at `http://localhost:3000/admin` during development
- **MongoDB**: Requires MongoDB running locally or connection string in `.env.local`
- **Media Uploads**: Stored in `/public/media` directory

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **CMS**: Payload CMS v3.51.0 with MongoDB adapter
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS v4.1.12 with custom CSS variables
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist and Geist Mono (Google Fonts)
- **Rich Text**: Lexical editor for content creation

### Project Structure
```
app/                    # Next.js App Router pages
├── (admin)/           # Payload CMS admin routes (isolated layout)
├── api/               # API routes for Payload and posts
├── posts/             # Posts listing and detail pages
├── globals.css        # Global styles with CSS variables
├── layout.tsx         # Root layout with metadata
└── page.tsx           # Main homepage component
components/
├── ui/                # Reusable UI components (shadcn/ui style)
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── select.tsx
lib/
└── utils.ts           # Utilities (cn function for class merging)
src/                   # Payload CMS configuration
├── collections/       # CMS collection schemas
└── payload.config.ts  # Payload configuration
assets/
├── images/            # Static images
└── logos/             # Brand logos
public/
└── media/             # CMS uploaded media files
```

### Design System & Theming
- Uses CSS custom properties for theming in globals.css
- Supports light/dark mode with `.dark` class variant
- Custom Nalaikh District brand colors defined:
  - `--nalaikh-navy`: #002868 (primary brand color)
  - `--nalaikh-gold`: Brand accent color
  - `--nalaikh-red`: Supporting brand color
- TailwindCSS configured via components.json (shadcn/ui style)
- Base color: gray, CSS variables enabled

### Key Features
- **Content Management**: Payload CMS with Posts and Media collections
- **Multilingual Support**: Built-in i18n with Mongolian (mn), English (en), and Chinese (zh) translations
- **Theme Toggle**: Light/dark mode switching
- **Responsive Design**: Mobile-first responsive layouts
- **Component Architecture**: Modular UI components with TypeScript
- **Brand Integration**: Custom styling for Nalaikh City Development Corporation
- **Rich Content**: Posts with categories, tags, SEO fields, and image uploads

### Component Patterns
- UI components follow shadcn/ui patterns with Radix UI primitives
- Utility-first CSS with Tailwind
- TypeScript interfaces for props and state
- Custom CSS variables for consistent theming
- Compound component patterns (Card, Select, etc.)

### Content Management System (Payload CMS)

#### Collections
- **Posts**: Blog posts/news with multilingual support
  - Fields: title, slug, author, content (Lexical), category, tags, featured image
  - Categories: news, projects, green-development, housing, technology
  - Status: draft, published, archived
  - SEO fields for meta title/description
- **Media**: File uploads with automatic image resizing
  - Generates thumbnail, card, and tablet sizes
  - Stored in `/public/media`
- **Users**: Admin authentication system
  - Roles: admin, editor

#### API Endpoints
- `/api/posts` - List posts with filtering and pagination
- `/api/posts/[slug]` - Get single post by slug
- `/api/payload/[...slug]` - Main Payload API handler
- Admin panel at `/admin` (isolated layout)

#### Configuration
- MongoDB database with Mongoose ODM
- Lexical rich text editor for content
- Multilingual content (mn, en, zh)
- Image optimization with Sharp
- CORS and CSRF protection configured

### Development Notes
- Uses `@/*` path alias pointing to root directory
- ESLint configured with Next.js and TypeScript presets
- Strict TypeScript configuration with ES2017 target
- Custom font loading with next/font optimization
- Image assets stored in assets/ directory (not public/)
- **Environment**: Requires `.env.local` with `MONGODB_URI` and `PAYLOAD_SECRET`

### Styling Approach
- TailwindCSS v4 with new syntax (`@import "tailwindcss"`)
- Custom CSS variables for design system consistency
- Dark mode support with `dark:` variants
- Component-scoped styling patterns
- Responsive breakpoints: sm, md, lg prefixes