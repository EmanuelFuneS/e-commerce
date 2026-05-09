# Byte Bazar

Tienda principal de e-commerce construida con **Next.js 15 + Turbopack**.

## Descripción

Aplicación full-stack de comercio electrónico "Byte Bazar". Incluye catálogo de productos, carrito de compras, checkout, dashboard administrativo, búsqueda con IA y PC Builder.

Es la aplicación principal del monorepo y actúa como orquestador de `auth-app` y `auth-service` mediante rewrites.

## Deploy

[https://e-commerce-byte-bazar.vercel.app/](https://e-commerce-byte-bazar.vercel.app/)

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router) + Turbopack
- **Lenguaje**: TypeScript
- **Data Fetching**: TanStack React Query 5
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4 + shadcn/ui (`@workspace/ui`)
- **Database**: Prisma + PostgreSQL via `@workspace/database`
- **Auth**: Cookies (JWT) + Auth0 (@auth0/nextjs-auth0)
- **Media Storage**: Cloudinary
- **AI**: Vercel AI SDK + Groq (@ai-sdk/groq)
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner
- **Testing**: Jest + React Testing Library
- **Hosting**: Vercel

## Dependencias del Workspace

```
@workspace/ui              -> Componentes UI
@workspace/database        -> Prisma BD
@workspace/eslint-config   -> Config ESLint
@workspace/typescript-config -> Config TypeScript
```

## Scripts Disponibles

```bash
# Desarrollo con Turbopack
pnpm dev

# Build producción
pnpm build

# Iniciar producción
pnpm start

# Lint
pnpm lint
pnpm lint:fix

# Type check
pnpm typecheck

# Tests
pnpm test
pnpm test:watch
pnpm test:coverage
```

## Rewrites (Proxy a otros servicios)

```typescript
// next.config.mjs
async rewrites() {
  return [
    {
      source: "/api-service/:path*",
      destination: "http://localhost:3010/auth/:path*",  // -> auth-service
    },
    {
      source: "/auth/:path*",
      destination: "http://localhost:3005/auth/:path*",  // -> auth-app
    },
  ];
}
```

Esto permite navegar transparentemente:
- `/auth/login` -> UI de login (auth-app)
- `/api-service/login` -> API de auth (auth-service)

## Rutas Principales

### Públicas (main)
| Ruta | Descripción |
|------|-------------|
| `/` | Home / Hero / Productos destacados |
| `/products/[[...slug]]` | Catálogo y detalle de productos |
| `/cart` | Carrito de compras |
| `/build-pc` | PC Builder (armar computadora) |
| `/wishlist` | Lista de deseos |
| `/promotions` | Promociones y descuentos |
| `/auth/*` | Auth (rewrite a auth-app) |

### Protegidas
| Ruta | Descripción |
|------|-------------|
| `/checkout/*` | Flujo de checkout |
| `/settings/*` | Panel de usuario |
| `/settings/orders` | Historial de órdenes |
| `/settings/account` | Mi cuenta |

### Admin Dashboard
| Ruta | Descripción |
|------|-------------|
| `/dashboard` | Panel principal |
| `/dashboard/analytics` | Analíticas y gráficos |
| `/dashboard/inventory` | Inventario |
| `/dashboard/inventory/products` | CRUD productos |
| `/dashboard/inventory/brands` | Gestión de marcas |
| `/dashboard/inventory/movements` | Movimientos de stock |
| `/dashboard/orders` | Gestión de órdenes |
| `/dashboard/clients` | Gestión de clientes |
| `/dashboard/settings` | Configuración |

### API Routes
| Ruta | Descripción |
|------|-------------|
| `/api/chat` | Chat con IA (Groq) |
| `/api/health` | Health check |
| `/api/auth/*` | Auth propio + callbacks |
| `/api/exAuth/[...auth0]` | Auth0 |
| `/api/sync` | Sync |
| `/api/shows` | Shows |

## Características Principales

### Carrito de Compras
- Estado global con Zustand
- Agregar/eliminar productos
- Persiste en localStorage

### PC Builder
- Armar computadora seleccionando componentes
- Validación de compatibilidad
- Cálculo automático de precio total
- Transferir componentes al carrito

### Dashboard Admin
- Analytics con gráficos Recharts
- Gestión de inventario
- CRUD de productos, marcas, categorías
- Seguimiento de órdenes
- Gestión de clientes

### Búsqueda con IA
- Integración con Groq via Vercel AI SDK
- Chatbot para recomendaciones de productos

### Media Management
- Cloudinary para almacenamiento de imágenes
- Upload de productos en dashboard

## Middleware

El middleware maneja:

1. **Protección de rutas**: Redirige a `/auth/login` si no hay token
2. **Rutas auth**: Si ya está autenticado, redirige al home
3. **Cookie management**: Intercepta `/api-service/login` y setea cookies HTTP-only

Cookies:
- `token` - JWT (HttpOnly)
- `userId` - ID usuario (HttpOnly)
- `roles` - Roles (HttpOnly)

## Zustand Stores

```typescript
// Categorías (persistidas)
useCategoriesStore -> categories, initializeCategories()

// Marcas (persistidas)
useBrandsStore -> brands, initializeBrands()

// PC Builder (persistido)
useBuilderStore -> builderState, totalPrice, setComponent(), transferToCart()

// Carrito
useStoreCart -> cart, addToCart(), removeToCart(), clearCart()
```

## Estructura

```
apps/byte-bazar/
├── __tests__/                    # Tests (Jest + RTL)
├── app/
│   ├── (main)/                   # Rutas públicas
│   │   ├── page.tsx              # Home
│   │   ├── products/[[...slug]]/ # Catálogo y detalle
│   │   ├── cart/                 # Carrito
│   │   ├── build-pc/             # PC Builder
│   │   ├── wishlist/             # Favoritos
│   │   └── promotions/           # Promociones
│   ├── dashboard/                # Panel admin
│   │   ├── analytics/
│   │   ├── inventory/
│   │   ├── orders/
│   │   ├── clients/
│   │   └── settings/
│   ├── checkout/                 # Flujo de pago
│   │   ├── preview/
│   │   ├── payment/
│   │   └── confirmation/
│   ├── settings/                 # Panel usuario
│   │   ├── account/
│   │   └── orders/
│   ├── api/                      # API Routes
│   │   ├── chat/                 # AI Chat (Groq)
│   │   ├── health/
│   │   ├── auth/
│   │   └── exAuth/[...auth0]/    # Auth0
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── hooks/                    # Custom hooks
│   │   ├── useProducts.tsx
│   │   ├── useAnalytics.tsx
│   │   ├── useCategories.tsx
│   │   ├── useBrands.tsx
│   │   ├── useClients.tsx
│   │   └── useLogout.tsx
│   ├── store/                    # Zustand stores
│   ├── types/                    # Tipos TypeScript
│   ├── schemas/                  # Zod schemas
│   ├── services/
│   │   ├── cloudinary/           # Upload de imágenes
│   │   └── filterService.ts
│   ├── utils/
│   └── skeleton-templates/
├── src/
│   ├── actions/                  # Server Actions
│   │   ├── product.actions.ts
│   │   ├── category.actions.ts
│   │   ├── brand.actions.ts
│   │   ├── user.actions.ts
│   │   └── analytics.actions.ts
│   ├── repositories/             # Acceso a datos
│   └── services/
├── middleware.ts                 # Auth y cookies
├── next.config.mjs               # Rewrites, images, transpile
├── jest.config.cjs
└── components.json
```

## Variables de Entorno

```env
# Base
APP_BASE_URL=http://localhost:3000
TENANT_ID_APP=BYTE_BAZAR

# URLs de servicios
AUTH_APP_URL=http://localhost:3005/auth/
AUTH_SERVICE_URL=http://localhost:3010/auth/
BYTE_BAZAR_URL=http://localhost:3000

# Database (via @workspace/env)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_ENV=

# Auth0
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# AI / Groq
GROQ_API_KEY=
```

## Integración con otros Servicios

```
byte-bazar:3000
    │
    ├── /auth/* ──────────────► auth-app:3005 (React Auth UI)
    │
    ├── /api-service/* ───────► auth-service:3010 (NestJS Auth API)
    │
    ├── @workspace/ui ────────► Componentes compartidos
    │
    ├── @workspace/database ──► Prisma + PostgreSQL
    │
    └── Cloudinary ───────────► Imágenes de productos
```
