import {Router} from 'express'
import logger from '../lib/logger.js'

const log = logger(import.meta);
const routes = Router();

routes.use((req, res, next) => {
    log(`${req.path} not found`)
    return res.status(404).end()
})

export default routes;
