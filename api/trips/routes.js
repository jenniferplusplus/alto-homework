import { Router } from "express";
import logger from '../../lib/logger.js'
import tripAdapter from './dataAdapter.js'

const log = logger(import.meta)
const routes = Router()

/***
 * Get the in progress trip, if one exists
 */
routes.get('/trips/current', (req, res, next) => {
    log(`${req.path}`)
    const trip = tripAdapter.getCurrent(req.user.id)
    return trip !== undefined ? res.json(trip) : res.status(404).end();
})

/***
 * Search or list existing trips
 */
routes.get('/trips/search', (req, res, next) => {

})

/***
 * Get a single trip by id
 */
routes.get('/trips/trip/:id')

/***
 * Cancel a single trip by id
 */
routes.delete('/trips/trip/:id')

/***
 * Edit a single trip by id
 */
routes.post('/trips/trip/:id')

export default routes