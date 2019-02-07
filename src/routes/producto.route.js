const route = require("express").Router({ mergeParams: true });

const productoController = require("../controllers/producto.controller");

route.get('/', productoController.getProductos);
route.get('/:id', productoController.getProducto);

module.exports = route;