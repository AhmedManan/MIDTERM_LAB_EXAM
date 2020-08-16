var db      = require('./dbconnection');

module.exports = {
    getCredentials: function(username,password,callback){
        var sql="SELECT `id`, `name`, `username`, `email`, `phone`, `password`, `type` FROM `login_cred` WHERE username ='"+username+"' OR email='"+username+"'";
        db.getResults(sql,function(result){
            callback(result);
        });
    }   
}