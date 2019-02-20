const route = require("express").Router();
const {userExists,sendToken} = require("../controllers/usuario.controller");
const {createToken} = require("../middlewares/serviceToken");
const {isPasswordCorrect} = require("../middlewares/passwordHash");



//route.post('/login', userController.login);
route.post('/login', userExists, isPasswordCorrect, createToken, sendToken);

//Error Handling
route.use((error, req, res, next) => {
    console.log("handle error");
    return res.status(error.statusCode)
        .json({message: error.message});
});

module.exports = route;