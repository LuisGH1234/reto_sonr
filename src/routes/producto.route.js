const route = require("express").Router({ mergeParams: true });

const productoController = require("../controllers/producto.controller");

route.get('/', productoController.getProductos);
route.get('/:id', productoController.getProducto);
route.post('/', productoController.createProducto);
route.put('/:id', productoController.editProducto);
route.delete('/:id', productoController.deleteProducto);

module.exports = route;