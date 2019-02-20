const { mysqlConnection } = require("../config/database");

exports.getCategorias = async (req, res) => {
    const sql = "SELECT * FROM categoria";
    try {
        const categorias = await mysqlConnection.query(sql);
        return res.status(200).json(categorias);
    } catch (error) {
        res.status(400).json({ status: "error" });
    }
};

exports.getProductosPorCategoria = async (req, res) => {
    let sql = "SELECT * FROM producto";
    if (req.params.id_categoria != 0) {
        sql += ` WHERE categoria_id=${req.params.id_categoria}`;
    }
    try {
        const productos = await mysqlConnection.query(sql);
        return res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ status: "error" });
    }
};