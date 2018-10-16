FROM node:alpine
RUN apk add --update git
ARG APP_DIR=/data/app
ARG SERVER_PORT=3001
ARG CLIENT_PORT=3000
ENV APP_DIR=${APP_DIR} SERVER_PORT=${SERVER_PORT} CLIENT_PORT=${CLIENT_PORT}
EXPOSE ${CLIENT_PORT} ${SERVER_PORT}
RUN mkdir -p ${APP_DIR} && chown --recursive 1000: ${APP_DIR}
USER 1000
WORKDIR ${APP_DIR}
COPY package*.json ${APP_DIR}/
RUN ["npm", "install", "--no-optional"]
