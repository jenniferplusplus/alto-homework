import { Router } from "express";
import {configureLogger} from '../../lib/logger.js'

const log = configureLogger()
const routes = Router()

/***
 * Get the currently in progress trip, if one exists
 */
routes.get('/current')

/***
 * List past trips
 */
routes.get('/search')

/***
 * Get a single trip by id
 */
routes.get('/trip/:id')

/***
 * Cancel a single trip by id
 */
routes.delete('/trip/:id')
