FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/auth-app/ ./apps/auth-app/

RUN pnpm install

WORKDIR /app/apps/auth-app

EXPOSE 3005

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3005"]
