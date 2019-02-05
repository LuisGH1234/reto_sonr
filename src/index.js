const colors = require("colors");
const express = require("express");
const morgan = require("morgan");
const { join } = require("path");
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes

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
});