import express from 'express';

const app = express();

app.listen(process.env.SERVER_PORT);

app.on('SIGHUP', () => {
  process.exit(0);
});
