const { randomBytes, pbkdf2Sync } = require("crypto");

var iterations = 10000;
var hmacAlgorithm = 'sha512';
var keylen = 512;

function hashPassword (password) {
    const salt = randomBytes(120).toString('base64');
    const key = pbkdf2Sync(password, salt, iterations, 
        keylen, hmacAlgorithm);
    return { salt, hash: key.toString('hex') };
}

function isPasswordCorrect ({hash, passwordAttempt, salt}) {
    return hash === 
        pbkdf2Sync(passwordAttempt, salt, iterations, 
            keylen, hmacAlgorithm)
        .toString('hex');
}

function isPasswordCorrect (req, res, next) {
    const { passwordhash, saltstamp } = req.user;
    const { password } = req.body;
    const correct = passwordhash ===
        pbkdf2Sync(password, saltstamp, iterations,
            keylen, hmacAlgorithm)
        .toString('hex');
    
    if(!correct) {
        let err = new Error("incorrect password");
        err.statusCode = 401;
        return next(err);
    }

    return next();
}

module.exports = {
    hashPassword,
    isPasswordCorrect,
    iterations,
    hmacAlgorithm,
    keylen
};