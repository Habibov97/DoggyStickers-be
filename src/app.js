const config = require('./config');
const express = require('express');
const cors = require('cors');
require('./config/database');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const globalErrorMiddleware = require('./middlewares/globalErrorHandling.middleware');

const router = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DoggyStickers app!!!' });
});

//handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
const viewPath = path.join(__dirname, './views');
app.set('views', viewPath);

app.get('/hbss', (req, res) => {
  res.render('home');
});

// routes
app.use('/api', router);

//upload
const uploadPath = path.join(__dirname, '/public/uploads');
app.get('/uploads', express.static(uploadPath));

// error
app.use(globalErrorMiddleware);

//server
app.listen(config.port, () => {
  console.log(`Listening to http://localhost:${config.port}`);
});
