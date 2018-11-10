# inclusive-harvard-map

master: [![Build Status](https://travis-ci.org/jonseitz/inclusive-harvard-map.svg?branch=master)](https://travis-ci.org/jonseitz/inclusive-harvard-map)

develop: [![Build Status](https://travis-ci.org/jonseitz/inclusive-harvard-map.svg?branch=develop)](https://travis-ci.org/jonseitz/inclusive-harvard-map)

Coverage: [![Coverage Status](https://coveralls.io/repos/github/jonseitz/inclusive-harvard-map/badge.svg)](https://coveralls.io/github/jonseitz/inclusive-harvard-map)

**WORK IN PROGRESS**

Mapping the locations of gender neutral bathrooms and lactation rooms on Harvard's Campus.

## Overview

This app is built in javascript, using node.js for the server and React for the client. The backing database is MongoDB, with Mongoose for schema modeling and validation.

### Application Structure

All application code resides in `src/`, separated into `client/` and `server/`. The top level directory includes configuration files for development tooling and Docker support.

Each subdirectory includes all of the necessary configuration for its side of the app, allowing for the Client and Server code to be built in Docker from the same base image. 

### Configuration

Configuration options are set using [`dotenv`][1], with defaults provided in `.env-example`. Before running, you'll need to copy `env-example` to `.env` and make any changes necessary. At a minimum, you should set username and passwords for mongodb.    

### Running the App

Everything runs in Docker containers, with the build defined in `docker-compose.yml`. For local development you'll need to have [Docker installed][2] and running, then invoke:

```sh
$ docker-compose build
$ docker-compose up
```

All log files will be saved to the `logs/` directory. 

Note that this repository does not include any of the location data, so functionality will be limited.

### Testing

Server and Client tests are written in [Jest][3] and can be run with `npm test`. Each subdirectory contains its own jest config file, which is in turn invoked by the master jest config file in `./config/jest.conig.js`. To run, call `npm test`.

### Documentation

Documentation is generated with [JSDoc][4] and deployed to github pages automatically via Travis.

## Contributing

**I am developing this application for my capstone project at the Harvard Extension School, and as such I cannot accept code contributions at this time.**  

[1]: https://www.npmjs.com/package/dotenv
[2]: https://docs.docker.com/install/
[3]: https://jestjs.io/
[4]: https://usejsdoc.org/
