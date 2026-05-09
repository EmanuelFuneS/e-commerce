# API Gateway

API Gateway construido con **Fastify v5** que orquesta peticiones a los servicios internos.

## Descripción

Punto de entrada principal para las APIs del e-commerce. Actúa como gateway que centraliza rutas, maneja autenticación JWT y utiliza los repositorios compartidos.

## Stack Tecnológico

- **Framework**: Fastify v5
- **Auth**: @fastify/jwt
- **Logs**: Pino (pino-pretty)
- **TypeScript**: v6

## Dependencias del Workspace

```
@workspace/env        -> Variables de entorno
@workspace/repository -> Repositorios y esquemas
```

## Puerto

- **Desarrollo**: `3000`

## Scripts Disponibles

```bash
# Desarrollo con watch (tsx)
pnpm dev

# Build TypeScript
pnpm build

# Iniciar producción
pnpm start

# Lint
pnpm lint

# Type check
pnpm typecheck
```

## Rutas

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/` | Health check | No |
| `GET` | `/products` | Listar productos | No |
| `GET` | `/products/id` | Obtener producto por ID | No |

> Nota: Rutas protegidas bajo `/products` con `authHook` están definidas pero pendientes de implementar.

## Estructura

```
apps/api/src/
├── @types/
│   └── fastify.d.ts      # Extensiones de tipos Fastify
├── controller/
│   ├── product.controller.ts
│   └── user.controller.ts
├── hooks/
│   └── auth.hook.ts       # Hook de autenticación JWT
├── routes/
│   ├── index.ts
│   └── product.routes.ts  # Rutas de productos
├── schemas/
│   ├── index.ts
│   └── product.schema.ts  # Schemas Zod para validación
├── services/
│   ├── index.ts
│   ├── analytics.service.ts
│   ├── brand.service.ts
│   ├── category.service.ts
│   ├── product.service.ts
│   └── user.service.ts
└── server.ts              # Entry point
```

## Health Check

```bash
GET http://localhost:3000/

Response:
{
  "status": "ok"
}
```

## Variables de Entorno

```env
API_PORT=3000
JWT_SECRET=your-secret-key
```

Ver `@workspace/env` para la lista completa.

## Autenticación

Las rutas protegidas usan el hook `authHook` que valida tokens JWT:

```typescript
// El header debe incluir:
Authorization: Bearer <jwt_token>
```

El secret debe coincidir con el usado en `auth-service`.
