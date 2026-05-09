# @workspace/typescript-config

Configuraciones TypeScript (`tsconfig.json`) compartidas para el workspace.

## Configuraciones Disponibles

| Configuración | Uso | Proyectos que la usan |
|---------------|-----|-----------------------|
| `base.json` | Configuración base | Todos |
| `nestjs.json` | Para proyectos NestJS | `apps/auth-service` |
| `nextjs.json` | Para proyectos Next.js | `apps/byte-bazar` |
| `react-library.json` | Para librerías React | `packages/ui` |

## Uso

Extiende la configuración en tu `tsconfig.json`:

```json
{
  "extends": "@workspace/typescript-config/[config].json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Ejemplos

**Next.js:**
```json
{
  "extends": "@workspace/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**NestJS:**
```json
{
  "extends": "@workspace/typescript-config/nestjs.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

**React Library:**
```json
{
  "extends": "@workspace/typescript-config/react-library.json",
  "include": ["."],
  "exclude": ["dist", "build", "node_modules"]
}
```

## Características Base

- `strict: true` - Modo estricto habilitado
- `esModuleInterop: true` - Interoperabilidad con CommonJS
- `skipLibCheck: true` - Omite chequeo de declaraciones
- `forceConsistentCasingInFileNames: true` - Sensible a mayúsculas
- `noUncheckedIndexedAccess: true` - Acceso indexado seguro
- `resolveJsonModule: true` - Importa archivos JSON
- `declaration: true` - Genera archivos `.d.ts`
- `declarationMap: true` - Sourcemaps para declaraciones

## Scripts Disponibles

Los proyectos que usan esta configuración normalmente tienen:

```bash
# Type check sin emitir
pnpm typecheck
```
