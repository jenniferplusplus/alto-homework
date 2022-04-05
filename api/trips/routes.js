import { Router } from "express";
import tripsService from "./tripsService.js";

const routes = Router()

/***
 * Get the in progress trip, if one exists
 */
routes.get('/trips/current', (req, res, next) => {
    const svc = new tripsService(req.user.id);
    const trip = svc.getTripInProgress();
    return trip !== undefined ? res.json(trip) : res.status(404).end();
})

/***
 * Search or list existing trips
 */
routes.get('/trips/search', (req, res, next) => {
    const svc = new tripsService(req.user.id);
    const fromDate = req.query['fromDate'] && new Date(req.query['fromDate']);
    const toDate = req.query['toDate'] && new Date(req.query['toDate']);
    const includeCancelled = false || req.query['includeCancelled'];

    const trips = svc.searchTrips(fromDate, toDate, includeCancelled);
    return res.json({trips});
})

/***
 * Get a single trip by id
 */
routes.get('/trips/trip/:id', (req, res, next) => {
    const svc = new tripsService(req.user.id);
    const trip = svc.getTrip(req.params.id);
    return trip !== undefined ? res.json(trip) : res.status(404).end();
})

/***
 * Cancel a single trip by id
 */
routes.delete('/trips/trip/:id', (req, res, next) => {
    const svc = new tripsService(req.user.id);
    const result = svc.cancelTrip(req.params.id);

    if (result === undefined) return res.status(404).end();
    if (result.reason !== undefined) return res.status(405).json(result);

    return res.json(result);
})

/***
 * Edit a single trip by id
 */
routes.post('/trips/trip/:id', (req, res, next) => {
    const svc = new tripsService(req.user.id);
    const result = svc.updateNote(req.params.id, req.body['note'])

    if (result === undefined) return res.status(404).end();
    if (result.reason !== undefined) return res.status(405).json(result);

    return res.json(result);
})

export default routes