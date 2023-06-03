FROM node:14.18-alpine3.13 as builder
WORKDIR /opt/cosd/backend_game/dist

COPY . /opt/cosd/backend_game
RUN npm install & npm run build

FROM nginx
COPY dist/  /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html
RUN chmod -R a+rx *
