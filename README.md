# E-commerce Monorepo

> 🚧 Work in Progress - Este proyecto está actualmente en desarrollo activo.

Monorepo completo para plataforma de e-commerce multi-tienda con **Turborepo + pnpm workspaces**.

## 🌐 Deploy

[Byte Bazar (Tienda Principal)](https://e-commerce-byte-bazar.vercel.app/)

## 📦 Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      byte-bazar:3000                         │
│                    (Next.js - Tienda Principal)              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ /auth/*     │  │/api-service/│  │  App (Catalogo,     │  │
│  │ (rewrite)   │  │ (rewrite)   │  │  Cart, Checkout,    │  │
│  └──────┬──────┘  └──────┬──────┘  │  Dashboard, AI)    │  │
└─────────┼────────────────┼──────────┴──────────────────────┘
          │                │
          ▼                ▼
┌─────────────────┐  ┌─────────────────────┐
│ auth-app:3005   │  │  auth-service:3010  │
│ (React + Vite)  │  │  (NestJS + Redis)   │
│  Auth UI        │  │  Auth API + Emails  │
└─────────────────┘  └─────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Redis:6379   │
                    │  (Sesiones)   │
                    └───────┬───────┘
                            │
┌───────────────────────────▼───────────────────────────────┐
│              @workspace/database (Prisma)                  │
│              PostgreSQL + Supabase                          │
└───────────────────────────┬───────────────────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ @workspace/env │  │@workspace/repo │  │  @workspace/ui │
│  (Zod Env)     │  │  (Repos)       │  │ (shadcn/ui)    │
└────────────────┘  └────────────────┘  └────────────────┘
```

## 🛠️ Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| **Monorepo** | Turborepo + pnpm Workspaces |
| **Principal** | Next.js 15 + TypeScript |
| **Auth UI** | React 19 + Vite |
| **Auth API** | NestJS 11 |
| **Tienda 2** | Angular 21 + SSR |
| **API Gateway** | Fastify v5 |
| **Database** | PostgreSQL + Prisma ORM |
| **Cache** | Redis |
| **Auth** | JWT + Passport + Auth0 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **State** | Zustand + TanStack Query |
| **Forms** | React Hook Form + Zod |
| **Media** | Cloudinary |
| **AI** | Vercel AI SDK + Groq |
| **Email** | Nodemailer + Pug + Mailtrap |
| **Testing** | Jest + Vitest + Testing Library |
| **Docs** | Swagger/OpenAPI |
| **Deploy** | Vercel + Docker |

## 📁 Estructura del Monorepo

```
e-commerce/
├── apps/                          # Aplicaciones
│   ├── byte-bazar/               # ⭐ Tienda Principal (Next.js)
│   ├── auth-app/                  # Auth UI (React + Vite)
│   ├── auth-service/              # Auth API (NestJS)
│   ├── api/                       # API Gateway (Fastify)
│   └── shoes-bazar/               # Tienda Secundaria (Angular)
│
├── packages/                      # Paquetes Compartidos
│   ├── database/                  # Prisma ORM + PostgreSQL
│   ├── repository/                # Repositorios + Schemas Zod
│   ├── ui/                        # shadcn/ui Components
│   ├── env/                       # Validación Env con Zod
│   ├── eslint-config/             # Configs ESLint
│   └── typescript-config/         # Configs TypeScript
│
├── turbo.json                     # Config Turborepo
├── pnpm-workspace.yaml            # Workspaces pnpm
├── docker-compose.yml             # Orquestación Docker
└── package.json                   # Raíz
```

---

## 🚀 Aplicaciones (`apps/`)

| Proyecto | Puerto | Descripción | Documentación |
|----------|--------|-------------|---------------|
| **byte-bazar** | `3000` | Tienda principal Next.js - Catalogo, Carrito, Checkout, Dashboard, IA | [README](./apps/byte-bazar/README.md) |
| **auth-app** | `3005` | UI de Autenticación - Login, Registro, Recuperación | [README](./apps/auth-app/README.md) |
| **auth-service** | `3010` | API Auth - JWT, Sesiones Redis, Emails, Roles/Permisos | [README](./apps/auth-service/README.md) |
| **api** | `3000` | API Gateway Fastify - Orquestación de servicios | [README](./apps/api/README.md) |
| **shoes-bazar** | `4200` | Tienda Angular SSR - Segunda tienda | [README](./apps/shoes-bazar/README.md) |

---

## 📦 Paquetes Compartidos (`packages/`)

| Proyecto | Descripción | Usado por | Documentación |
|----------|-------------|-----------|---------------|
| **@workspace/database** | Prisma ORM + PostgreSQL - Modelos, Migraciones, Seeders | todos | [README](./packages/database/README.md) |
| **@workspace/repository** | Capa Repositorios + Types + Zod Schemas | api | [README](./packages/repository/README.md) |
| **@workspace/ui** | shadcn/ui + Tailwind - Componentes compartidos | byte-bazar, auth-app | [README](./packages/ui/README.md) |
| **@workspace/env** | Validación de variables de entorno con Zod | todos | [README](./packages/env/README.md) |
| **@workspace/eslint-config** | Configuraciones ESLint por tipo de proyecto | todos | [README](./packages/eslint-config/README.md) |
| **@workspace/typescript-config** | Configuraciones tsconfig base | todos | [README](./packages/typescript-config/README.md) |

---

## 🛠️ Comandos Principales

### Instalar Dependencias

```bash
pnpm install
```

### Desarrollo (todas las apps)

```bash
pnpm dev
```

### Build (todos los paquetes/apps)

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Docker (Auth Stack)

```bash
# Levantar auth-app + auth-service + redis
docker compose up -d

# O desde la raíz con scripts
pnpm --filter auth-app docker:up
pnpm --filter auth-service docker:up
```

### Base de Datos

```bash
# Desde packages/database
cd packages/database

# Generar cliente Prisma
pnpm db:generate

# Push schema (dev)
pnpm db:push

# Migraciones
pnpm db:migrate

# Prisma Studio
pnpm db:studio

# Seed
pnpm db:seed
```

---

## 🔐 Variables de Entorno

Copiar `.env.example` a `.env` en la raíz:

```env
# General
NODE_ENV=development
APP_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Auth
JWT_SECRET=your-secret
REDIS_URL=redis://localhost:6379

# Email (Mailtrap)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
USERNAME=...
PASSWORD=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Auth0
AUTH0_SECRET=...
AUTH0_BASE_URL=...
AUTH0_ISSUER_BASE_URL=...
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...

# AI / Groq
GROQ_API_KEY=...
```

Ver [`@workspace/env`](./packages/env/README.md) para la lista completa.

---

## 📋 Características

- ✅ **Multi-tienda** - Byte Bazar + Shoes Bazar
- ✅ **Microservicios** - Auth Service separado
- ✅ **JWT Auth** - Access + Refresh tokens con Redis
- ✅ **Roles/Permisos** - RBAC granular
- ✅ **Verificación Email** - Flujo completo
- ✅ **Recuperación Password** - Token por email
- ✅ **PC Builder** - Armar computadoras por componentes
- ✅ **AI Search** - Chat con Groq para recomendaciones
- ✅ **Admin Dashboard** - Analytics, Inventario, Órdenes
- ✅ **Cloudinary** - Media management
- ✅ **Multi-tenancy** - Preparado para múltiples tenants
- ✅ **SSR/SSG** - Next.js App Router + Angular SSR
- ✅ **Docker** - Stack auth contenerizado

---

## 📚 Documentación por Proyecto

### Apps
- [byte-bazar (Next.js)](./apps/byte-bazar/README.md)
- [auth-app (React + Vite)](./apps/auth-app/README.md)
- [auth-service (NestJS)](./apps/auth-service/README.md)
- [api (Fastify)](./apps/api/README.md)
- [shoes-bazar (Angular)](./apps/shoes-bazar/README.md)

### Packages
- [@workspace/database (Prisma)](./packages/database/README.md)
- [@workspace/repository](./packages/repository/README.md)
- [@workspace/ui (shadcn/ui)](./packages/ui/README.md)
- [@workspace/env (Zod)](./packages/env/README.md)
- [@workspace/eslint-config](./packages/eslint-config/README.md)
- [@workspace/typescript-config](./packages/typescript-config/README.md)
