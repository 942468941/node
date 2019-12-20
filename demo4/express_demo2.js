var express = require('express');
var app = express();
app.get("/", function (req, res) {
    res.send('get');
})
app.post('/',function(req,res){
    res.send("post")
})
app.get('/del_user', function (req, res) {
    res.send("删除页面")
})
app.get('/list_user', function (req, res) {
    res.send("用户列表页面")
})
app.get('/ab*cd', function (req, res) {
    res.send("正则匹配")
})
var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().address;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})