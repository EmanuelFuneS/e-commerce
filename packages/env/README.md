# @workspace/env

Paquete compartido para validación y tipado seguro de variables de entorno usando **Zod**.

## Descripción

Centraliza la configuración de entorno de todo el monorepo. Valida las variables de entorno al inicio y exporta tipos TypeScript para autocompletado y seguridad de tipos.

## Stack Tecnológico

- **Validación**: Zod
- **Carga**: dotenv

## Variables de Entorno Valiadas

### General
| Variable | Descripción |
|----------|-------------|
| `NODE_ENV` | Entorno (development, production, test) |
| `PRISMA_LOGS` | Nivel de logs para Prisma |
| `APP_BASE_URL` | URL base de la aplicación |
| `API_PORT` | Puerto del API Gateway |

### Base de Datos
| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de conexión PostgreSQL (con pooler) |
| `DIRECT_URL` | URL directa para migraciones Prisma |

### Redis
| Variable | Descripción |
|----------|-------------|
| `REDIS_URL` | URL de conexión Redis |

### JWT
| Variable | Descripción |
|----------|-------------|
| `JWT_SECRET` | Secret para firmar tokens JWT |

### Email (SMTP/Mailtrap)
| Variable | Descripción |
|----------|-------------|
| `SMTP_HOST` | Host SMTP |
| `SMTP_PORT` | Puerto SMTP |
| `USERNAME` | Usuario SMTP |
| `PASSWORD` | Contraseña SMTP |
| `MAILTRAP` | Configuración Mailtrap |

### Cloudinary (Media Storage)
| Variable | Descripción |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud |
| `CLOUDINARY_API_KEY` | API Key |
| `CLOUDINARY_API_SECRET` | API Secret |
| `CLOUDINARY_API_ENV` | Entorno Cloudinary |

### URLs de Servicios
| Variable | Descripción |
|----------|-------------|
| `TENANT_ID_APP` | Tenant ID por defecto |
| `BYTE_BAZAR_URL` | URL de Byte Bazar |
| `AUTH_SERVICE_URL` | URL del Auth Service |
| `AUTH_APP_URL` | URL del Auth App |
| `AUTHORIZED_ROLES` | Roles autorizados |

## Scripts Disponibles

```bash
# Test (placeholder)
pnpm test
```

## Uso

```typescript
import { globalEnv } from "@workspace/env";

// Con tipado seguro y autocompletado
const dbUrl = globalEnv.DATABASE_URL;
const jwtSecret = globalEnv.JWT_SECRET;
const isDev = globalEnv.NODE_ENV === "development";
```

## Funcionamiento

1. **Carga**: Utiliza `dotenv` para cargar variables desde `../../.env`
2. **Validación**: Zod valida que todas las variables requeridas existan
3. **Error**: En entorno no-production, muestra errores detallados si faltan variables
4. **Export**: Exporta `globalEnv` con tipado inferido de Zod

## Tipos TypeScript

```typescript
import type { z } from "zod";
import { schemaEnv } from "@workspace/env/src/index";

type Env = z.infer<typeof schemaEnv>;
// { NODE_ENV: string; DATABASE_URL: string; JWT_SECRET: string; ... }
```
