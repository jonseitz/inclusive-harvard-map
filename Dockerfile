FROM node:alpine
RUN apk add --update git
ARG APP_DIR=/data/app
ARG SERVER_PORT=3001
ARG CLIENT_PORT=3000
ARG MONGO_URI=mongo
ARG PRODUCTION=production
ENV APP_DIR=${APP_DIR} SERVER_PORT=${SERVER_PORT} CLIENT_PORT=${CLIENT_PORT} MONGO_URI=${MONGO_URI}
EXPOSE ${CLIENT_PORT} ${SERVER_PORT}
WORKDIR ${APP_DIR}
RUN mkdir -p ${APP_DIR} && chown 1000: ${APP_DIR}
COPY --chown=1000:1000 package*.json ${APP_DIR}/
USER 1000
RUN ["npm", "install", "--${PRODUCTION}", "--no-progress", "--no-optional"]
COPY --chown=1000:1000 src/ ${APP_DIR}/src/
RUN ["npm", "run", "build"]
