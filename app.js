import express from 'express'
import logger from 'morgan'

import indexRoutes from './middleware/index.js'
import {notFound, authError} from './middleware/errors.js'
import auth from './middleware/auth.js'


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);

app.use('/', indexRoutes);
app.use(notFound);
app.use(authError);

export default app;
