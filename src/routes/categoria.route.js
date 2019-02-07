const router = require("express").Router();

const categoriaController = require("../controllers/categoria.controller");

router.get('/', categoriaController.getCategorias);
router.get('/:id_categoria/productos', categoriaController.getProductosPorCategoria);

module.exports = router;