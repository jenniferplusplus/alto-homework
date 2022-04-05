import jwt from 'express-jwt'

const auth = jwt({
    secret: '12345678',  // This should come from a secret store
    algorithms: ['HS256']  // This should be an asymmetric algorithm (like RS256)
})

export default auth