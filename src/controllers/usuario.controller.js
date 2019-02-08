const { mysqlConnection } = require("../config/database");
const { createToken } = require("../middlewares/serviceToken");

exports.login2 = async (req, res) => {
    const { usuario, password } = req.body;
    try {
        let sql = "select * from usuario where usuario=? and password=?";
        let user = await mysqlConnection.query(sql, [usuario,password]);
        user = user.length >= 1;
        res.json({ isAuth: user });
    } catch (error) {
        console.error(error);
        res.status(400).json({status: "error"});
    }
};

exports.login = async (req, res) => {

    let sql = "select * from usuario where usuario=? and password=?";
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