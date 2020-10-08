FROM node:14.11.0-alpine3.12

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN apk add --no-cache bash
RUN yarn -i

EXPOSE 3008

CMD [".docker/app/wait-for-it.sh", "mongo:27017", "redis:6379", "--", "yarn", "dev"]

COPY . .