export function asyncMiddleware(handler) {
    return async(req, res, next) => {
        try {
            await handler(req, res)
        } catch (exc) {
            next(exc)
        }
    };

}