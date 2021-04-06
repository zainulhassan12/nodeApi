export function log(req, res, next) {
    console.log("logging...");
    next();
}

export function authenticate(req, res, next) {
    console.log(" Authenticating....");
    next();
}