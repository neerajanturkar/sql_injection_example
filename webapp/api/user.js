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
     * Use of Stored Procedure
     */
    let query = "CALL login(?,?,@success,@sessionId);";
    
    /**
     * Use of prepared statement
     */
    sql.query(query,[email,password] ,function(err, res){
        var result = {};
        if(!err){
        if(res['affectedRows'] == 1){
            let query = "SELECT @success, @sessionId;";
            sql.query(query,function(err,res){
                if(!err){
                    if(res[0]['@success'] == 1){
                         result['success'] = true;
                         result['sessionId'] = res[0]['@sessionId'];
                         result['message'] = "Authentication Successful!"  
                         response.json(result);         
                    }else if(res[0]['@success'] == 0){
                        result['success'] = false;
                        result['message'] = "Authentication Failed! No user with given email and password exists!!"  
                        response.json(result);         
                    }
                }
                
            });
        }
    }else{
        
        result['success'] = false;
        result['message'] = err;

        response.json(result); 
    }

      
    });
    
            
});

module.exports = router;