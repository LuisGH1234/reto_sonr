const { mysqlConnection } = require("../config/database");
const { createToken } = require("../middlewares/serviceToken");
const password = require("../middlewares/passwordHash");

exports.login = async (req, res) => {

    let sql = "select * from usuario where usuario=? and passwordhash=?";
    const { usuario, password } = req.body;
    try {
        const user = (await mysqlConnection.query(sql, [usuario,password]))[0];
        console.log(user);
        if(user) {
            const token = createToken(user);
            res.setHeader('Token', `${token}`);
            res.status(200).json({ access: 'true' });
        } else {
            res.status(404).json({ access: 'false' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error' });
    }
};

exports.userExists = async (req, res, next) => {
    let sql = "select * from usuario where usuario=?";
    const { usuario } = req.body;
    const user = (await mysqlConnection.query(sql, [usuario]))[0];

    if(!user) {
        let err = new Error("username does not exist");
        err.statusCode = 400;
        return next(err);
    }

    req.user = user;
    return next();
};

exports.sendToken = async (req, res, next) => {
    res.setHeader('Token', `${req.token}`);
    res.status(200).json({ access: 'true' });
}