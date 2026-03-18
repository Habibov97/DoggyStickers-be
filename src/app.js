const express = require('express');
const cors = require('cors');
require('./config/database');
const config = require('./config');
const morgan = require('morgan');
const globalErrorMiddleware = require('./middlewares/globalErrorHandling.middleware');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DoggyStickers app!!!' });
});

app.use('/api', router);

app.use(globalErrorMiddleware);

app.listen(config.port, () => {
  console.log(`Listening to http://localhost:${config.port}`);
});
