const config = require('./config');
const express = require('express');
const cors = require('cors');
require('./config/database');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const globalErrorMiddleware = require('./middlewares/globalErrorHandling.middleware');

const router = require('./routes');

const app = express();

app.use(helmet());

if (config.nodeENV === 'development') app.use(morgan('dev'));

//rate-limit
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// xss sanitizer
app.use(xss());

// cors
app.use(cors());

//body parser
app.use(express.json({ limit: '100kb' }));

// App
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

//swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error
app.use(globalErrorMiddleware);

//server
app.listen(config.port, () => {
  console.log(`Listening to http://localhost:${config.port}`);
});
