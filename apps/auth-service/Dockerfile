FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN pnpm install -g pnpm

COPY . .

EXPOSE 3010

CMD ["pnpm", "run", "start:dev"]
