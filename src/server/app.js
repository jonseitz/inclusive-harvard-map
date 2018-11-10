import express from 'express';
import https from 'https';
import http from 'http';
import morgan from 'morgan';
import errorHandler from './routes/errorHandler';
import floorRouter from './routes/floorRouter';
import buildingRouter from './routes/buildingRouter';

const app = express();

app.use(morgan('tiny'));

app.use('/api', express.json({ type: '*/*', limit: '10Mb' }));
app.use('/api/floors', floorRouter);
app.use('/api/buildings', buildingRouter);

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
