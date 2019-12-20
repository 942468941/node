// 阻塞实例
var events = require('events');
var fs = require("fs");
var data = fs.readFileSync("input.txt");
console.log(data.toString());
console.log("程序执行结束")

//非阻塞实例
fs.readFile('input.txt',function(err,data){
    if(err) return console.log(err);
    console.log('非阻塞'+data.toString());
})
console.log("结束")

var eventEmitter = new events.EventEmitter();
//创建事件处理程序
var connectHandler = function connected(){
    console.log("连接成功");
    eventEmitter.emit('data_received');
}
eventEmitter.on('connection', connectHandler);
//使用匿名函数绑定data_received事件
eventEmitter.on('data_received',function(){
    console.log("数据接收成功");
})
eventEmitter.emit('connection');
console.log("执行完毕")
