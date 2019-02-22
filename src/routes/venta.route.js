const router = require("express").Router();

const ventaController = require("../controllers/venta.controller");

router.get('/', ventaController.getVentas);

module.exports = router;