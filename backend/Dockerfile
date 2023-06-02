# syntax=docker/dockerfile:1
FROM node:16-alpine as base
ENV NODE_ENV=development

WORKDIR /code

COPY backend/package.json package.json
COPY backend/yarn.lock yarn.lock

FROM base as test
RUN yarn install
COPY backend/ .
RUN yarn unit

FROM base as prod
RUN yarn
COPY backend/ .
CMD ["yarn", "start"]