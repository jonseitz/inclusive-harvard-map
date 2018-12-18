import express from 'express';
import https from 'https';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import errorHandler from './routes/errorHandler';
import buildingRouter from './routes/buildingRouter';
import floorRouter from './routes/floorRouter';
import layerRouter from './routes/layerRouter';

const app = express();

app.use(morgan('tiny'));

app.use('/api', express.json({ type: '*/*', limit: '10Mb' }));
app.use('/api/floors', floorRouter);
app.use('/api/buildings', buildingRouter);
app.use('/api/layers', layerRouter);
app.use('/osrm', (req, res, next) => {
  const osrmPath = req.originalUrl.replace(/^\/osrm\//, '/route/v1/');
  const request = http.request({
    hostname: 'osrm',
    port: 5000,
    path: osrmPath,
    method: 'GET',
  }, (response) => {
    if (response.statusCode === 200) {
      response.setEncoding('utf8');
      res.set('Content-Type', 'application/json');
      response.on('data', (chunk) => {
        res.write(chunk);
      });
      response.on('end', () => {
        res.end();
      });
    } else {
      next();
    }
  });
  request.on('error', (err) => {
    next(err);
  });
  request.end();
});
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(compression());
app.use(errorHandler);

http.createServer(app).listen(process.env.SERVER_PORT, (err) => {
  if (!err) {
    // eslint-disable-next-line
    console.log(`listening on ${process.env.SERVER_PORT}`);
  }
});

if (process.env.SERVER_PORT_SSL) {
  https.createServer(app).listen(process.env.SERVER_PORT_SSL);
}

app.on('SIGINT', () => {
  process.exit(0);
});

export default app;
