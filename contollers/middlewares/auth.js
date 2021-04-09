import jwt from 'jsonwebtoken';
import config from 'config';


export default function(req, res, next) {
    const token = req.header('x-auth-tokken')
    console.log(token)
    if (!token) return res.status(401).send("Access denied!! No tokken provided")
    try {
        console.log(req)
        const decode = jwt.verify(token, config.get("key_to_auth"))
        req.user = decode;
        next();

    } catch (exc) {
        res.status(400).send("Invalid token!!!")
        console.log(exc.message);
    }

}