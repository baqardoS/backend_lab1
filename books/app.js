const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const languageRouter = require('./routes/languageRoutes');
const authorRouter = require('./routes/authorRoutes');
const publisherRouter = require('./routes/publisherRoutes');

const app = express();

//? Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use(cors());
//? Secure HTTP headers
app.use(helmet());
//? Limit requests from same IP
app.use('/api', limiter);
//? Body parser
app.use(express.json({ limit: '10kb' }));
//? Cookie parser
app.use(cookieParser());
//? Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//? Data sanitization against XSS
app.use(xss());
//? Prevent parameter pollution (2 the same parameters)
app.use(hpp());
app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//? Routes
app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/languages', languageRouter);
app.use('/authors', authorRouter);
app.use('/publishers', publisherRouter);

//? Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;