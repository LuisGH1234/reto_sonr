const mysql = require("mysql");
const myProfile = require("./profile.db");

const mysqlConnection = mysql.createPool(myProfile);

const { promisify } = require("util");
mysqlConnection.query = promisify(mysqlConnection.query);

async function init(query) {
    try {
        await mysqlConnection.query(query);
        console.log("DB: connected");
    } catch (error) {
        console.error(`Error database.js: \n${error}`);
    }
}('select 1');

module.exports = mysqlConnection;