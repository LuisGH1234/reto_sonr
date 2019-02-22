const { mysqlConnection } = require("../config/database");

exports.getVentas = async (req, res) => {
    const sql = "call getVentas()";
    try {
        const ventas = await mysqlConnection.query(sql);
        return res.status(200).json(ventas[0]);
    } catch (error) {
        res.status(400).json({ status: "error" });
    }
};