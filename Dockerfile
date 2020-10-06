FROM node:14.11.0-alpine3.12

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN apk add --no-cache bash
RUN yarn -i

EXPOSE 3008

COPY . .