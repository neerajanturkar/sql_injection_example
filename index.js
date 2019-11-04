const express = require("express");
const app = express();
const PORT = 7000;
var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api/user', require('./webapp/api/user')); 
app.listen(PORT, () => console.log(`Server started on ${PORT}`));