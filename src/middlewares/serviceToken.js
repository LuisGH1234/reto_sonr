const jwt = require('jwt-simple');
const moment = require('moment');

function createToken (user) {
    const payload = {
        usu: user.usuario,
        pwd: user.password,
        iat: moment().unix(),
        exp: moment().add(12, 'days').unix()
    };
    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function createToken (req, res, next) {
    const payload = {
        usu: req.user.usuario,
        pwd: req.user.passwordhash,
        iat: moment().unix(),
        exp: moment().add(12, 'days').unix()
    };
    req.token = jwt.encode(payload, process.env.SECRET_TOKEN);
    next();
}

function decodeToken (token) {
    return new Promise((resolve, reject) => {
        try {
            
            const payload = jwt.decode(token, process.env.SECRET_TOKEN);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            resolve(payload);
        } catch (e) {
            console.error(e);
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });
}

module.exports = {
    createToken,
    decodeToken
};