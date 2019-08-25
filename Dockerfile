FROM node:lts-jessie AS build

WORKDIR /tmp/zuweiser

ADD . .
RUN yarn install
RUN yarn build

FROM nginx

COPY --from=build /tmp/zuweiser/dist/ /usr/share/nginx/html
