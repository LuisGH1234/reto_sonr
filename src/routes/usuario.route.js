const route = require("express").Router();
const userController = require("../controllers/usuario.controller");

route.post('/login', userController.login);

module.exports = route;