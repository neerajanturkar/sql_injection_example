'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Anturkar@05',
    database : 'bookworm_db'
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }else{
        console.log("Database connected");
    }
});

module.exports = connection;