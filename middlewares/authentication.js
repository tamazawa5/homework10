const jwt = require('jsonwebtoken');
const { key } = require('../secretKey');

const verify = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[1] != 'undefined') {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        jwt.verify(token, key, (err, signature) => {
            if (err) {
                res.status(401).json({ message: "Invalid signature!" });
            } else {
                req.userData = {
                    id: signature.id,
                    email: signature.email,
                    role: signature.role
                }
                next();
            }
        });
    } else {
        res.status(401).json({ message: "No token provided!" });
    }
}

module.exports = verify;