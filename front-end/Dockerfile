# build step
FROM node:16-alpine as build
WORKDIR /app
COPY front-end/package.json package.json
COPY front-end/yarn.lock yarn.lock
COPY front-end/ .
RUN yarn
RUN yarn build

# release step
FROM nginx:1.21.5-alpine as release
COPY --from=build /app/build /usr/share/nginx/html/
COPY --from=build /app/nginx.conf .
RUN cp -f nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]