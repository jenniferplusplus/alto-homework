import { Router } from "express";
import DriverService from "./driverService.js";


const routes = Router()

/***
 * Get the assigned driver for the in progress trip, if one exists
 */
routes.get('/drivers/assigned', (req, res, next) => {
    const svc = new DriverService(req.user.id);
    const result = svc.getAssigned();
    return result !== undefined ? res.json(result) : res.status(404).end();
})

/***
 * Get the current phone number for the assigned driver.
 * The data is all stored together, but separating this field out is probably a good idea. This would allow supporting
 * audits of requests for this info, or potentially redirecting to a customer support line.
 * It's also possible these numbers could be dynamically provisioned and would not exist until a passenger requests it.
 *
 * We could potentially also PUT to this path to send messages to the driver's device.
 */
routes.get('/drivers/assigned/contact', (req, res, next) => {
    const svc = new DriverService(req.user.id);
    const result = svc.getContact();
    return result !== undefined ? res.json(result) : res.status(404).end();
})

export default routes