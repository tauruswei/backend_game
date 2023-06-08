FROM node:14.18-alpine3.13 as builder
WORKDIR /opt/cosd/backend_game

COPY . /opt/cosd/backend_game
RUN rm -rf dist && npm install && npm run build

FROM nginx
COPY --from=builder /opt/cosd/backend_game/dist  /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html
RUN chmod -R a+rx *
