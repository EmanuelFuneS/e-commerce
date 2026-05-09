# Auth App

Interfaz de usuario para autenticación construida con **React 19 + Vite**.

## Descripción

SPA (Single Page Application) dedicada exclusivamente al flujo de autenticación: login, registro, verificación de email, recuperación y reseteo de contraseña.

Se integra con `auth-service` (NestJS) y es accedida a través de rewrites desde `byte-bazar` bajo la ruta `/auth/*`.

## Stack Tecnológico

- **Framework**: React 19
- **Build**: Vite 7 + SWC
- **Router**: React Router 7
- **State/Data**: TanStack React Query 5
- **Forms**: React Hook Form + Zod
- **UI**: Tailwind CSS v4 + shadcn/ui (`@workspace/ui`)
- **HTTP**: Axios
- **Notifications**: Sonner

## Dependencias del Workspace

```
@workspace/ui              -> Componentes UI compartidos
@workspace/eslint-config   -> Config ESLint
@workspace/typescript-config -> Config TypeScript
```

## Puerto

- **Desarrollo**: `3005`
- **Docker**: `3005:3005`

## Scripts Disponibles

```bash
# Desarrollo
pnpm dev

# Build producción
pnpm build

# Preview build
pnpm preview

# Lint
pnpm lint

# Docker (desde la raíz del monorepo)
pnpm docker:up
pnpm docker:down
pnpm docker:rebuild
```

## Rutas

La app usa `basename="/auth"`, por lo que todas las rutas son relativas:

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/auth/` | Registro | Página default - Registro de usuarios |
| `/auth/login/` | Login | Inicio de sesión |
| `/auth/success/:id/` | Verificación exitosa | Confirmación de email verificado |
| `/auth/change-password/` | Cambiar contraseña | Cambio de contraseña (requiere token) |
| `/auth/recovery-password/` | Recuperar contraseña | Solicitar email de recuperación |
| `/auth/reset-password/` | Resetear contraseña | Establecer nueva contraseña |

## Custom Hooks

| Hook | Descripción |
|------|-------------|
| `useLogin` | Maneja flujo de login |
| `useRegister` | Maneja registro de usuarios |
| `useRecoveryPassword` | Solicita recuperación por email |
| `useResetPassword` | Valida token de reseteo |
| `useChangePassword` | Cambia contraseña del usuario |

## Estructura

```
apps/auth-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── nav-bar/
│   │   │   └── footer/
│   │   ├── login-form/
│   │   ├── register-form/
│   │   ├── recovery-password-form/
│   │   ├── reset-password-form/
│   │   ├── change-password-form/
│   │   ├── validate-token-form/
│   │   └── ui/
│   ├── pages/
│   │   ├── layout/           # Layout con navbar + footer
│   │   ├── login/
│   │   ├── register/
│   │   ├── change-password/
│   │   ├── recovery-page/
│   │   ├── reset-password/
│   │   └── success-verification/
│   ├── utils/
│   │   ├── hooks/            # Custom hooks
│   │   ├── schemas/          # Zod schemas
│   │   └── services/         # API services (axios)
│   ├── App.tsx               # Rutas principales
│   └── main.tsx              # Entry point
├── Dockerfile
├── vite.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── components.json           # shadcn/ui config
├── tsconfig.app.json
└── tsconfig.node.json
```

## Integración con byte-bazar

Desde `byte-bazar` (Next.js), hay rewrites que redirigen:

```
/auth/*        -> auth-app (esta app)
/api-service/* -> auth-service
```

Esto permite que el usuario navegue transparente entre la tienda y la autenticación.

## Variables de Entorno

Las variables se cargan via `apps/auth-app/.env` y deben apuntar al `auth-service`:

```env
VITE_AUTH_SERVICE_URL=http://localhost:3010
```

## Docker

El `docker-compose.yml` de la raíz levanta este servicio:

```yaml
services:
  auth-app:
    build: .
    ports:
      - "3005:3005"
    env_file:
      - apps/auth-app/.env
```

Comandos rápidos:
```bash
# Levantar con Docker
cd ../.. && docker compose up auth-app -d

# O usando el script desde esta carpeta
pnpm docker:up
```
