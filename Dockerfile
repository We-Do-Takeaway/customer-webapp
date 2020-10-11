FROM node:lts as build
WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

ENV NODE_ENV=production

RUN npm ci

COPY ./ ./

RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/env.sh /usr/share/nginx/env.sh
ENV ENV_DEST=/usr/share/nginx/html

CMD ["/usr/share/nginx/env.sh","&&","nginx -g 'daemon off;'"]
