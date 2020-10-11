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

COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
# Tell the NGINX container to generate the env.js file on startup
ENV ENV_DEST=/usr/share/nginx/html
COPY --from=build /app/env.sh /docker-entrypoint.d/30-env.sh
