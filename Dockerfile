FROM node:14.11.0-alpine3.12

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn -i
RUN apk add --no-cache bash

COPY . .