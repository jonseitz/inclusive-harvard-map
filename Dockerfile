FROM node:alpine

EXPOSE 3030

WORKDIR /data/app

COPY . /data/app

RUN apk update && apk add git && npm install

CMD ["node", "--experimental-modules", "src/server/index.js"]
