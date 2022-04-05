import { Router } from "express";
import logger from '../../lib/logger.js'
import tripAdapter from './dataAdapter.js'

const log = logger(import.meta)
const routes = Router()

/***
 * Get the in progress trip, if one exists
 */
routes.get('/trips/current', (req, res, next) => {
    const trip = tripAdapter.getCurrent(req.user.id)
    return trip !== undefined ? res.json(trip) : res.status(404).end();
})

/***
 * Search or list existing trips
 */
routes.get('/trips/search', (req, res, next) => {
    const fromDate = req.query['fromDate'] && new Date(req.query['fromDate']);
    const toDate = req.query['toDate'] && new Date(req.query['toDate']);
    const includeCancelled = false || req.query['includeCancelled'];
    const trips = tripAdapter.query(fromDate, toDate, includeCancelled, req.user.id);

    log(`Found ${trips.length} trips`);
    return res.json({trips});
})

/***
 * Get a single trip by id
 */
routes.get('/trips/trip/:id', (req, res, next) => {
    const trip = tripAdapter.get(req.params.id, req.user.id);
    return trip !== undefined ? res.json(trip) : res.status(404).end();
})

/***
 * Cancel a single trip by id
 */
routes.delete('/trips/trip/:id', (req, res, next) => {
    const trip = tripAdapter.get(req.params.id, req.user.id);
    if (!trip) return res.status(404).end();

    if(canCancel(trip)){
        const cancelled = tripAdapter.update(req.params.id, {"cancelled": true}, req.user.id);
        return res.json(cancelled);
    }
    return res.status(405).json({"reason": "Trip is not eligible to be cancelled"});
})

/***
 * Edit a single trip by id
 */
routes.post('/trips/trip/:id', (req, res, next) => {
    const trip = tripAdapter.get(req.params.id, req.user.id);
    if (!trip) return res.status(404).end();

    if(canAddNote(trip)){
        const updated = tripAdapter.update(req.params.id, {"note": req.body['note']}, req.user.id);
        return res.json(updated);
    }
    return res.status(405).json({"reason": "Notes cannot be edited for this trip"});
})

export default routes

function canCancel(){
    return true
}

function canAddNote(){
    return true
}