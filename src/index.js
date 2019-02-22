require("dotenv").config();
const colors = require("colors");
const express = require("express");
const morgan = require("morgan");
const { join } = require("path");
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
require("./config/database").test();

//Middlewares
app.use(morgan(process.env.NODE_ENV=="development"?"dev":"combined"));
app.use(express.json());

//Routes
app.use('/api/categorias', require("./routes/categoria.route"));
app.use('/api/productos', require("./routes/producto.route"));
app.use('/api/user', require("./routes/usuario.route"));
app.use('/api/ventas', require("./routes/venta.route"));

//Setting static files
app.use(express.static(join(__dirname, "../public")));
app.get("*", (req, res) => {
    //Redirecting all unknown trafic to the react app
    res.sendFile(join(__dirname, "../public/index.html"));
});

app.listen(app.get("port"), err => {
    if(err) {
        return console.error(err);
    }
    console.log(`\n\tServer on: 127.0.0.1:${app.get('port')}`.cyan);
    console.log(`\tEnviroment: ${process.env.NODE_ENV}`.cyan + "\n");
});