FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN pnpm install -g pnpm

COPY . .

EXPOSE 3005

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3005"]
