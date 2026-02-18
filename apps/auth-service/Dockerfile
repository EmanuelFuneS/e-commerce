FROM node:20-alpine AS builder

RUN apk add --no-cache openssl openssl-dev libc6-compat

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/auth-service/ ./apps/auth-service/

RUN pnpm install --frozen-lockfile --shamefully-hoist

RUN cd packages/database && pnpm prisma generate
RUN cd packages/database && pnpm run build

WORKDIR /app/apps/auth-service

EXPOSE 3010

CMD ["pnpm", "run", "start:dev"]
