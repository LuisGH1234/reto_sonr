const { mysqlConnection } = require("../config/database");

exports.getProductos = async (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM producto";
    try {
        const productos = await mysqlConnection.query(sql);
        return res.status(200).json(productos);
    } catch (error) {
        console.error(error);
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
        console.error(error);
        res.status(400).json({ status: "error" });
    }
};

exports.createProducto = async (req, res) => {
    const { categoria, nombre, descripcion, precio } = req.body;
    let sql = "insert into producto (nombre,descripcion,precio,categoria_id) values(?,?,?,?)";
    try {
        await mysqlConnection.query(sql, [nombre,descripcion,precio,parseInt(categoria)]);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: "error" });
    }
};

exports.editProducto = async (req, res) => {
    const { categoria, nombre, descripcion, precio } = req.body;
    const { id } = req.params;
    let sql = "UPDATE producto SET nombre=?, descripcion=?, precio=?, categoria_id=? WHERE id=?";
    try {
        await mysqlConnection.query(sql, [nombre,descripcion,precio,parseInt(categoria),parseInt(id)]);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: "error" });
    }
};

exports.deleteProducto = async (req, res) => {
    const { id } = req.params;
    let sql = "delete from producto where id=?";
    try {
        await mysqlConnection.query(sql, [id]);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: "error" });
    }
};

exports.reservarProducto = async (req, res) => {
    const { reservado } = req.query;
    const { id } = req.params;
    let sql = "call reservarProducto(?,?)";
    try {
        await mysqlConnection.query(sql, [reservado, id]);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: "error" });
    }
}

exports.comprarProducto = async (req, res) => {
    const { cantidad } = req.query;
    const { id } = req.params;
    let sql = "call comprarProducto(?,?)";
    try {
        await mysqlConnection.query(sql, [cantidad, id]);
        res.status(200).json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: "error" });
    }
}