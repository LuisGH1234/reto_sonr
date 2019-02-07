const { mysqlConnection } = require("../config/database");

exports.getProductos = async (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM producto";
    try {
        const productos = await mysqlConnection.query(sql);
        return res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ status: "error" });
    }
};

exports.getProducto = async (req, res) => {
    const { id } = req.params;
    let sql = "call getProducto(?)";
    try {
        const producto = await mysqlConnection.query(sql, [id]);
        return res.status(200).json(producto[0][0]);
    } catch (error) {
        res.status(400).json({ status: "error" });
    }
};
