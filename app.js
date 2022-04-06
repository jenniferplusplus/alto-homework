import express from 'express'
import logger from 'morgan'

import {default as tripRoutes} from './api/trips/routes.js'
import {default as vehicleRoutes} from './api/vehicles/routes.js'
import {default as driverRoutes} from './api/drivers/routes.js'
import {notFound, authError} from './middleware/errors.js'
import auth from './middleware/auth.js'


const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', auth, tripRoutes, vehicleRoutes, driverRoutes);

app.use(notFound);
app.use(authError);

export default app;
