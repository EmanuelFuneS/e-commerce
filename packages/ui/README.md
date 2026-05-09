# @workspace/ui

Librería de componentes UI compartida basada en **shadcn/ui** + **Radix UI** + **Tailwind CSS v4**.

## Descripción

Biblioteca de componentes reutilizable para las aplicaciones frontend del monorepo (`byte-bazar` y `auth-app`). Incluye componentes accesibles, hooks personalizados y utilidades de estilos.

## Stack Tecnológico

- **Componentes**: shadcn/ui
- **Primitives**: Radix UI
- **Styling**: Tailwind CSS v4
- **CSS Utils**: clsx + tailwind-merge
- **Variantes**: class-variance-authority
- **Icons**: lucide-react + @mynaui/icons-react
- **Charts**: Recharts
- **Notifications**: Sonner
- **Forms**: React Hook Form

## Proyectos que lo Utilizan

- `apps/byte-bazar` (Next.js)
- `apps/auth-app` (React + Vite)

## Componentes Disponibles

### Layout
- `Accordion` - Acordeones colapsables
- `Collapsible` - Contenedores colapsables
- `NavigationMenu` - Menú de navegación
- `Tabs` - Pestañas
- `Resizable` - Paneles redimensionables
- `Separator` - Separadores visuales

### Data Display
- `Card` - Tarjetas
- `Table` - Tablas
- `Badge` - Etiquetas
- `Avatar` - Avatares
- `Tooltip` - Tooltips
- `HoverCard` - Tarjetas con hover
- `Carousel` - Carruseles (Embla)
- `Skeleton` - Skeleton loaders

### Feedback
- `Progress` - Barras de progreso
- `Sonner` - Notificaciones toast
- `Chart` - Gráficos (Recharts)

### Forms
- `Button` - Botones
- `Input` - Campos de texto
- `Textarea` - Áreas de texto
- `Checkbox` - Checkboxes
- `RadioGroup` - Grupos de radio
- `Select` - Selects (Radix)
- `NativeSelect` - Select nativo
- `Label` - Etiquetas de formulario
- `InputOTP` - Input para códigos OTP
- `Form` - Integración con React Hook Form
- `Field` - Campos de formulario

### Overlays
- `Dialog` - Modales
- `AlertDialog` - Modales de alerta
- `DropdownMenu` - Menús desplegables
- `Sheet` - Paneles laterales (drawers)
- `ScrollArea` - Áreas con scroll

### Navigation
- `Breadcrumb` - Migas de pan
- `Pagination` - Paginación
- `Sidebar` - Barra lateral

### Custom
- `ThemeToggleCustom` - Toggle para modo oscuro/claro
- `Toggle` - Botones toggle

## Hooks

```typescript
import { useMobile } from "@workspace/ui/hooks/use-mobile";

const isMobile = useMobile();
```

## Utilidades

```typescript
import { cn } from "@workspace/ui/lib/utils";

// Combina clases CSS con merge inteligente de Tailwind
const className = cn(
  "base-class",
  condition && "conditional-class",
  variantClass
);
```

## Estilos

```typescript
// Importar CSS global en tu aplicación
import "@workspace/ui/globals.css";
```

## Exportaciones del Package.json

```json
{
  "./globals.css": "./src/styles/globals.css",
  "./postcss.config": "./postcss.config.mjs",
  "./lib/*": "./src/lib/*.ts",
  "./components/*": "./dist/components/*.js",
  "./hooks/*": "./src/hooks/*.ts"
}
```

## Scripts Disponibles

```bash
# Lint
pnpm lint
```

## Estructura

```
packages/ui/src/
├── components/          # 38 componentes shadcn/ui
│   ├── accordion.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── table.tsx
│   └── ...
├── hooks/
│   └── use-mobile.ts    # Detecta viewport mobile
├── lib/
│   └── utils.ts         # cn() utility
└── styles/
    └── globals.css      # Tailwind + variables CSS
```

## Uso en Next.js (byte-bazar)

```tsx
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import "@workspace/ui/globals.css";

export default function Page() {
  return (
    <Card>
      <CardHeader>Título</CardHeader>
      <CardContent>
        <Button className={cn("w-full")}>Click me</Button>
      </CardContent>
    </Card>
  );
}
```
