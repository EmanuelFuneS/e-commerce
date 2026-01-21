FROM node:20

WORKDIR /usr/src/app

COPY mfes/auth-mdf/package*.json ./

RUN pnpm install

COPY mfes/auth-mdf ./

RUN pnpm build

FROM nginx:alpine

COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]