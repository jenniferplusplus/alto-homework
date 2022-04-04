import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRoutes from './routes/index.js'
import errorHandlers from './routes/errors.js'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRoutes);
app.use(errorHandlers);

export default app;
