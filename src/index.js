/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.get('/', (req, res) => {
  res.json({
    message: 'hello again',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 2204;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
