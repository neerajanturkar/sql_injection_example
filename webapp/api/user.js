const express = require('express');
const sql = require('./../common/db');
const router = express.Router();

var path = require('path');


router.get('/', function(request,response){
    response.sendFile(__dirname + "/view/login.html");
});
router.post('/login/', function(request,response){

    let email = request.body.email;
    let password = request.body.password;
    /**
     * Missing server side validations
     */
   

    let query = "SELECT id, user_type, firstname, lastname, email " + 
                    "FROM `user` " +
                    "WHERE email = '"+email+"' AND  password = md5('"+password+"');";
    /**
     * Use of concatinated query
     */

    sql.query(query ,function(err, res){
        var result = {};
        if(err) {
            
            result['data'] = res;
            result['success'] = true;
            result['message'] = err;

            response.json(result); 
        }
        else if(res.length == 0){           
            result['data'] = res;
            result['success'] = true;
            result['message'] = "Authentication failed : No matching email & password found";
            response.json(result);             
        }else{
            result['data'] = res;
            result['success'] = true;
            result['message'] = "Authentication successfull!";
            response.json(result);
        }
        /**
         * Mising checks for data to send as response 
         * thereby leaking data of all users
         */
    });
    
            
});

module.exports = router;