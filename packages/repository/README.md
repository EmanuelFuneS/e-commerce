# @workspace/repository

Paquete compartido con capa de repositorios, tipos TypeScript y esquemas Zod de validación para el e-commerce.

## Descripción

Abstrae el acceso a datos mediante repositorios y centraliza esquemas de validación y tipos compartidos. Es utilizado principalmente por el `api` (Fastify Gateway).

## Stack Tecnológico

- **Validación**: Zod
- **Base de Datos**: via `@workspace/database` (Prisma)

## Dependencias del Workspace

```
@workspace/database -> Prisma y modelos
```

## Estructura

```
packages/repository/src/
├── repositories/      # Capa de abstracción de datos
│   ├── analytics.repository.ts
│   ├── brand.repository.ts
│   ├── category.repository.ts
│   ├── clients.repository.ts
│   ├── orders.repository.ts
│   └── product.repository.ts
├── types/             # Tipos TypeScript compartidos
│   ├── brands.ts
│   ├── categories.ts
│   ├── common.ts
│   ├── coupon.ts
│   ├── discount.ts
│   ├── orders.ts
│   ├── products.ts
│   ├── stockMovement.ts
│   └── users.ts
├── schemas/           # Esquemas Zod de validación
│   ├── auth/
│   │   ├── login.schema.ts
│   │   └── register.schema.ts
│   ├── brand/
│   │   └── brand.schema.ts
│   ├── category/
│   │   └── category.schema.ts
│   ├── orders/
│   │   └── order.schema.ts
│   └── products/
│       ├── cartProduct.schema.ts
│       ├── discount.schema.ts
│       └── products.schema.ts
└── index.ts           # Exportaciones
```

## Scripts Disponibles

```bash
# Build del paquete
pnpm build

# Lint
pnpm lint

# Modo watch
pnpm dev
```

## Uso

### Repositorios

```typescript
import {
  ProductRepository,
  OrderRepository,
  CategoryRepository,
  BrandRepository,
  AnalyticsRepository,
  ClientsRepository
} from "@workspace/repository";

const products = await ProductRepository.getProducts({});
const product = await ProductRepository.getProductBySlug("product-slug");
const order = await OrderRepository.getOrderById("order-id");
```

### Esquemas Zod

```typescript
import {
  // Auth
  loginSchema,
  registerSchema,
  // Products
  createProductSchema,
  updateProductSchema,
  cartProductSchema,
  // Orders
  createOrderSchema,
  // Categories & Brands
  createCategorySchema,
  createBrandSchema,
} from "@workspace/repository";

// Validación
const result = loginSchema.safeParse({ email, password });
if (!result.success) {
  console.error(result.error);
}
```

### Tipos TypeScript

```typescript
import type {
  // Products
  Product,
  ProductWithRelations,
  ProductFilters,
  // Orders
  Order,
  OrderWithItems,
  CreateOrderInput,
  // Users
  User,
  UserProfile,
  // Categories & Brands
  Category,
  Brand,
  // Common
  PaginatedResponse,
  SortDirection,
} from "@workspace/repository";
```

### Re-exportaciones desde Database

```typescript
import { DiscountType, Prisma } from "@workspace/repository";
```
