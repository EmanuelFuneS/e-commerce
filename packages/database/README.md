# @workspace/database

Paquete compartido de conexión y acceso a base de datos usando **Prisma ORM** con **PostgreSQL**.

## Descripción

Este paquete centraliza el cliente Prisma y el esquema de base de datos para todo el monorepo. Es el único punto de acceso a PostgreSQL y es utilizado por:
- `auth-service`
- `byte-bazar`
- `@workspace/repository`

## Stack Tecnológico

- **ORM**: Prisma v5
- **Base de Datos**: PostgreSQL
- **Extensión**: Prisma Accelerate

## Modelos de Datos

### Auth & Usuarios
- `User` - Usuarios del sistema
- `Role` - Roles de usuario
- `RolePermission` - Permisos granularizados
- `UserRole` - Relación usuario-rol
- `RefreshToken` - Tokens de refresco JWT
- `ShippingAddress` - Direcciones de envío
- `PaymentMethod` - Métodos de pago (Stripe, PayPal, Mercado Pago)

### E-commerce
- `Product` - Productos del catálogo
- `Category` - Categorías de productos
- `Brand` - Marcas
- `Discount` - Descuentos por producto
- `StockMovement` - Movimientos de inventario

### Órdenes
- `Order` - Pedidos de compra
- `OrderItem` - Items por pedido
- `Coupon` - Cupones de descuento
- `CouponUsage` - Usos de cupones

### Enums
- `OrderStatus` (PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED)
- `StockMovementType` (IN, OUT, ADJUST)
- `CouponType` (PERCENTAGE, FIXED, SHIPPING)
- `PaymentType` (CARD, PAYPAL, MERCADO_PAGO, CRYPTO)
- `PaymentProvider` (STRIPE, PAYPAL, MERCADOPAGO)
- `CardBrand` (VISA, MASTERCARD, AMEX, etc.)

## Multi-tenancy

Todos los modelos principales incluyen un campo `tenantId` con valor por defecto `"BYTE_BAZAR"`, permitiendo soporte multi-tenant en el futuro.

## Scripts Disponibles

```bash
# Generar cliente Prisma (automático en postinstall)
pnpm db:generate

# Sincronizar esquema sin migraciones (desarrollo)
pnpm db:push

# Crear y aplicar migración
pnpm db:migrate

# Aplicar migraciones en producción
pnpm db:migrate:deploy

# Abrir Prisma Studio
pnpm db:studio

# Ejecutar seeders
pnpm db:seed

# Build del paquete
pnpm build

# Modo watch
pnpm dev
```

## Variables de Entorno Requeridas

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
DIRECT_URL="postgresql://user:pass@localhost:5432/db"
```

## Uso

```typescript
import { PrismaClient } from "@workspace/database";

const prisma = new PrismaClient();

// Ejemplo
const users = await prisma.user.findMany();
const products = await prisma.product.findMany({
  include: { category: true, brand: true }
});
```

## Estructura

```
packages/database/
├── prisma/
│   └── schema.prisma    # Esquema completo de BD
├── src/
│   └── index.ts         # Exporta PrismaClient
└── package.json
```
