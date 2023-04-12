const express = require('express');
const morgan = require('morgan');
const tourRouter = require(`${__dirname}/Routes/tourRoutes.js`);
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(morgan('dev'));
app.use('/v1/tours', tourRouter);

module.exports = app;