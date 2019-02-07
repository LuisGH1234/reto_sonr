const mysql = require("mysql");
const myProfile = require("./profile.db");

const mysqlConnection = mysql.createPool(myProfile);

const { promisify } = require("util");
mysqlConnection.query = promisify(mysqlConnection.query);

async function test() {
    try {
        await mysqlConnection.query('SELECT 1');
        console.log("MySQL: connected".green);
    } catch (error) {
        console.error("Error database.js: ".bgRed + `\n${error}`);
    }
};

module.exports = { mysqlConnection, test };