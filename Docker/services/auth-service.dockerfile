FROM node:20

WORKDIR /usr/src/app

COPY microservices/auth-service/package*.json ./

RUN pnpm install

COPY microservices/auth-service/ ./

RUN pnpm build

EXPOSE 3010

CMD ["node", "dist/main"]