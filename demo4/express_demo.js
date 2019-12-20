var express = require('express');
var app = express();
app.get('/',function(req,res){
    console.log(req)
    res.send("hello")
})
var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例")
})