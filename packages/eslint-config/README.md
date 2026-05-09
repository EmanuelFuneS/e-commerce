# @workspace/eslint-config

Configuraciones ESLint compartidas para el workspace.

## Configuraciones Disponibles

| Configuración | Uso | Proyectos que la usan |
|---------------|-----|-----------------------|
| `base.js` | Base para proyectos TypeScript | Todos |
| `fastify.js` | Para proyectos Fastify | `apps/api` |
| `nestjs.js` | Para proyectos NestJS | `apps/auth-service`, `packages/repository` |
| `next.js` | Para proyectos Next.js | `apps/byte-bazar` |
| `react-internal.js` | Para React SPA (Vite) | `apps/auth-app` |

## Uso

1. Extiende la configuración en tu `eslint.config.js` o `eslintrc.js`:

```javascript
// Para Next.js
module.exports = {
  extends: ["@workspace/eslint-config/next"],
};

// Para NestJS
module.exports = {
  extends: ["@workspace/eslint-config/nestjs"],
};

// Para Fastify
module.exports = {
  extends: ["@workspace/eslint-config/fastify"],
};

// Para React SPA
module.exports = {
  extends: ["@workspace/eslint-config/react-internal"],
};
```

## Plugins Incluidos

- `typescript-eslint` - Reglas para TypeScript
- `eslint-plugin-react` - Reglas para React
- `eslint-plugin-react-hooks` - Reglas para React Hooks
- `eslint-plugin-next` - Reglas para Next.js
- `eslint-plugin-turbo` - Reglas para Turborepo

## Scripts Disponibles

Los proyectos que usan esta configuración normalmente tienen:

```bash
# Ejecutar lint
pnpm lint

# Fix automático
pnpm lint:fix
```
