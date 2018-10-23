import express from 'express';
import https from 'https';
import http from 'http';
import morgan from 'morgan';
import floorplanRouter from './routes/floorplans';
import buildingRouter from './routes/buildings';

const app = express();

app.use(morgan('tiny'));

app.use('/api', express.json({ type: '*/*', limit: '10Mb' }));

app.use('/api', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

app.use('/api/floorplans', floorplanRouter);
app.use('/api/buildings', buildingRouter);

export const errorHandler = (err, req, res) => {
  res.status(500);
  res.json({ error: err.message });
  res.end();
};

app.use(errorHandler);

http.createServer(app).listen(process.env.SERVER_PORT, (err) => {
  if (!err) {
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
