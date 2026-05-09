# Shoes Bazar

Tienda secundaria de e-commerce construida con **Angular 21 + SSR**.

## Descripción

Aplicación frontend de tienda de zapatos ("Shoes Bazar") con soporte para Server-Side Rendering (SSR). Segunda tienda del ecosistema del monorepo.

## Stack Tecnológico

- **Framework**: Angular 21
- **SSR**: Angular SSR + Express
- **Testing**: Vitest 4
- **Lenguaje**: TypeScript
- **Estilos**: Less
- **Reactividad**: RxJS

## Scripts Disponibles

```bash
# Development server
pnpm start
# or
ng serve

# Build
pnpm build
# or
ng build

# Watch mode
pnpm watch

# Tests (Vitest)
pnpm test
# or
ng test

# SSR server
pnpm serve:ssr:shoes-bazar
```

Puerto por defecto: `4200`

## Code Scaffolding

```bash
# Generar componente
ng generate component component-name

# Generar otros schematics
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## Estructura

```
apps/shoes-bazar/
├── src/
│   ├── app/                 # Componentes Angular
│   ├── server.ts            # Entry point SSR (Express)
│   ├── main.ts              # Entry point browser
│   ├── index.html
│   └── styles.less
├── angular.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── package.json
```

## Configuración Prettier

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

## Server-Side Rendering

La aplicación incluye SSR con Express:

```typescript
// dist/shoes-bazar/server/server.mjs
node dist/shoes-bazar/server/server.mjs
```

El SSR permite:
- Mejor SEO
- Primera carga más rápida
- Compatibilidad con crawlers

## Testing

Tests con Vitest:

```bash
# Ejecutar tests
ng test
```

## Recursos Adicionales

- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev/)
- [Vitest Documentation](https://vitest.dev/)
