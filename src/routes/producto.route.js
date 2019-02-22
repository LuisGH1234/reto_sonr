const route = require("express").Router({ mergeParams: true });

const productoController = require("../controllers/producto.controller");
const isAuth = require("../middlewares/isAuth");

route.get('/', productoController.getProductos);
route.get('/:id', productoController.getProducto);
route.post('/', isAuth, productoController.createProducto);
route.put('/:id', isAuth, productoController.editProducto);
route.delete('/:id', isAuth, productoController.deleteProducto);

route.put('/reserva/:id', productoController.reservarProducto);
route.post('/comprar/:id', productoController.comprarProducto);
module.exports = route;