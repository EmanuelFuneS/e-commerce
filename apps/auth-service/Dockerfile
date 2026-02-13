FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/auth-service/ ./apps/auth-service/

RUN pnpm install --frozen-lockfile --shamefully-hoist

WORKDIR /app/apps/auth-service

EXPOSE 3010

CMD ["pnpm", "run", "start:dev"]
