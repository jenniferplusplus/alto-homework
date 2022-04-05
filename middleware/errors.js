import {Router} from 'express'
import logger from '../lib/logger.js'

const log = logger(import.meta);
const routes = Router();

routes.use((req, res, next) => {
    log(`${req.path} not found`)
    return res.status(404).end()
})

function authError(err, req, res, next){
    if (err.name === 'UnauthorizedError'){
        log(`${req.path} not authorized`)
        return res.status(401).send('Invalid authorization token')
    }
    return next(err)
}

export {
    routes as notFound,
    authError
}