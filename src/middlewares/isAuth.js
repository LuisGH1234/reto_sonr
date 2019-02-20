const { decodeToken } = require("./serviceToken");

function isAuth(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(403).json({ message: 'No tienes autorizacion' });
    }

    //Le quitamos el Bearer
    const token = req.headers.authorization.split(" ")[1];
    
    decodeToken(token)
    .then(payload => {
        req.usuario = payload.usu;
        req.password = payload.pwd;
        next();
    })
    .catch(error => 
        res.status(error.status).json({ menssage: error.message })
    );
}

module.exports = isAuth;