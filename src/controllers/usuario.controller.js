const { mysqlConnection } = require("../config/database");

exports.login = async (req, res) => {
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