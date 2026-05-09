# Auth Service

Microservicio de autenticación y autorización construido con **NestJS v11**.

## Descripción

Servicio backend dedicado a la gestión completa de autenticación: usuarios, sesiones JWT, verificación de email, recuperación de contraseña, roles y permisos. Utiliza Redis para manejo de sesiones y se integra con `@workspace/database` (Prisma + PostgreSQL).

## Stack Tecnológico

- **Framework**: NestJS v11
- **Auth**: JWT (@nestjs/jwt) + Passport
- **Sesiones**: Redis (ioredis)
- **Email**: Nodemailer (@nestjs-modules/mailer)
- **Templates**: Pug
- **DB**: Prisma + PostgreSQL via `@workspace/database`
- **Docs**: Swagger (@nestjs/swagger)
- **Testing**: Jest + Supertest

## Dependencias del Workspace

```
@workspace/database        -> Prisma y modelos BD
@workspace/eslint-config   -> Config ESLint
@workspace/typescript-config -> Config TypeScript
```

## Puerto

- **Desarrollo**: `3010`
- **Docker**: `3010:3010`

## Scripts Disponibles

```bash
# Build
pnpm build

# Desarrollo (watch)
pnpm start:dev

# Producción
pnpm start:prod

# Debug
pnpm start:debug

# Lint con fix
pnpm lint

# Tests
pnpm test
pnpm test:watch
pnpm test:cov
pnpm test:debug
pnpm test:e2e

# Docker (desde la raíz)
pnpm docker:up
pnpm docker:down
pnpm docker:rebuild
```

## Endpoints (prefijo: `/auth`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/auth/register` | Registro de usuario | No |
| `POST` | `/auth/login` | Inicio de sesión | No |
| `POST` | `/auth/refresh` | Refresh token | No |
| `POST` | `/auth/logout` | Cerrar sesión | Sí |
| `POST` | `/auth/change-password` | Cambiar contraseña | Sí |
| `POST` | `/auth/verify-email` | Verificar email | No |
| `POST` | `/auth/recovery-password` | Solicitar recuperación | No |
| `POST` | `/auth/reset-password` | Resetear contraseña | No |

## Características

### Autenticación
- **JWT** - Access tokens (60s) + Refresh tokens
- **Cookies HTTP-only** - Almacenamiento seguro de tokens
- **Passport JWT Strategy** - Validación de tokens

### Usuarios
- Registro con email y contraseña (bcrypt)
- Verificación de email por token
- Recuperación y reseteo de contraseña
- Bloqueo por intentos fallidos
- Último login registrado

### Sesiones (Redis)
- Refresh tokens almacenados en Redis
- Revocación de tokens
- Manejo de múltiples sesiones por usuario

### Email
- Envío de emails con Nodemailer/Mailtrap
- Templates con Pug
- Verificación de cuenta
- Recuperación de contraseña

### Roles & Permisos (RBAC)
- `Role` - Roles de usuario
- `RolePermission` - Permisos granularizados (action + subject)
- `UserRole` - Asignación usuario-rol

### Multi-tenancy
- Campo `tenantId` en usuarios y tokens
- Default: `BYTE_BAZAR`

## Cookies Seteadas

Después de login/register, el interceptor setea cookies HTTP-only:

| Cookie | Descripción |
|--------|-------------|
| `token` | JWT access token |
| `userId` | ID del usuario |
| `roles` | Roles del usuario (JSON) |

## Módulos Principales

```
AuthModule    -> Autenticación, JWT, Guards
UsersModule   -> Gestión de usuarios
MailModule    -> Envío de emails
PrismaModule  -> Conexión BD
```

## Estructura

```
apps/auth-service/src/
├── auth/
│   ├── Decorator/
│   │   ├── public.decorator.ts       # Marca rutas públicas
│   │   └── set-auth-cookie.decorator.ts
│   ├── Interceptors/
│   │   └── auth.cookie.interceptor.ts # Setea cookies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── auth.guard.ts
│   ├── jwt-auth.guard.ts
│   ├── jwt.strategy.ts
│   ├── constants.ts
│   └── types.ts
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── types.ts
├── mail/
│   ├── mail.controller.ts
│   ├── mail.service.ts
│   └── mail.module.ts
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── template/              # Templates Pug para emails
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts                # Entry point (Swagger, CORS, cookies)
```

## Docker

```yaml
services:
  auth-service:
    ports:
      - "3010:3010"
    depends_on:
      - redis
    environment:
      - PORT=3010
      - REDIS_URL=redis://redis:6379

  redis:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
```

## Variables de Entorno

```env
PORT=3010
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret

# Database (via @workspace/env)
DATABASE_URL=postgresql://...

# SMTP / Mailtrap
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
USERNAME=mailtrap-user
PASSWORD=mailtrap-pass
MAILTRAP=true
```

## Swagger/OpenAPI

La documentación está disponible en:
```
http://localhost:3010/api
```

## Guards & Decorators

```typescript
// Ruta pública (sin auth requerido)
@Public()
@Get('public-route')
publicRoute() {}

// Ruta protegida (default)
@Get('protected')
protectedRoute(@Req() req: AuthRequest) {
  const userId = req.user.userId;
}
```

## Integración

Este servicio es consumido por:
- `auth-app` - Frontend de autenticación
- `byte-bazar` - Tienda principal (vía rewrites)
- `api` - API Gateway
