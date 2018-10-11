FROM node:alpine
RUN apk add --update git
ARG APP_DIR=/data/app/
EXPOSE 3030 
WORKDIR $APP_DIR
COPY package*.lock /data/app/ 
RUN ["npm", "install"]
