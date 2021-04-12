import winston from 'winston';
export function asyncMiddleware(handler) {
    return async(req, res, next) => {
        try {
            await handler(req, res)
        } catch (exc) {
            winston.error(exc.message, { metadata: exc })
            res.status(500).send(exc.message)
            next(exc);

        }
    };

}