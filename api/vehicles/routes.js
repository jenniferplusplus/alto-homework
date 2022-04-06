import { Router } from "express";
import VehicleService from "./vehicleService.js";


const routes = Router()

/***
 * Get the assigned vehicle for the in progress trip, if one exists
 */
routes.get('/vehicles/assigned', (req, res, next) => {
    const svc = new VehicleService(req.user.id);
    const vehicle = svc.getAssigned();
    return vehicle !== undefined ? res.json(vehicle) : res.status(404).end();
})

/***
 * Identify the passenger's assigned vehicle
 */
routes.put('/vehicles/assigned/identify', (req, res, next) => {
    const svc = new VehicleService(req.user.id);
    const result = svc.identifyAssigned();
    return result !== undefined ? res.json(result) : res.status(404).end();
})

/***
 * Set the vibe in the passenger's assigned vehicle
 */
routes.post('/vehicles/assigned/vibe', (req, res, next) => {
    const svc = new VehicleService(req.user.id);
    const vibe = req.body['vibe']
    const result = svc.updateVibe(vibe);
    return result !== undefined ? res.json(result) : res.status(404).end();
})

export default routes