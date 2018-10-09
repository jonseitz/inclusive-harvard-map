FROM node:alpine
ARG SERVER_PORT=3030
RUN apk add --update git
EXPOSE $SERVER_PORT
WORKDIR /data/app
COPY . /data/app/ 
RUN ["npm", "install"]
CMD ["node", "src/server/index.js"]
