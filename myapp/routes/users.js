// 导入MySql模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
var express = require('express');
var router = express.Router();
// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
// 用户注册
router.get('/reg', function (req, res, next) {
  console.log(req)
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    var UserName = param.uid;
    var Password = param.name;
    var _res = res;
    connection.query(userSQL.queryAll, function (err, res) {
      var isTrue = false;
      if (res) { //获取用户列表，循环遍历判断当前用户是否存在
        for (var i = 0; i < res.length; i++) {
          if (res[i].uid == UserName && res[i].userName == Password) {
            isTrue = true;
          }
        }
      }
      var data = {};
      data.isreg = !isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
      if (isTrue) {
        data.result = {
          code: 1,
          msg: '用户已存在'
        }; //登录成功返回用户信息
      } else {
        connection.query(userSQL.insert, [param.uid, param.name], function (err, result) {
          if (result) {
            data.result = {
              code: 200,
              msg: '注册成功'
            };
          } else {
            data.result = {
              code: -1,
              msg: '注册失败'
            };
          }
        });
      }

      if (err) data.err = err;
      // 以json形式，把操作结果返回给前台页面
      setTimeout(function () {
        responseJSON(_res, data)
      }, 300);
      // responseJSON(_res, data);
      // 释放链接
      connection.release();

    });
  });
});
// 用户登录
router.get('/login', function (req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function (err, connection) {
    // 获取前台页面传过来的参数
    var param = req.query || req.params;
    var UserName = param.uid;
    var Password = param.name;
    var _res = res;
    connection.query(userSQL.queryAll, function (err, res, result) {
      var isTrue = false;
      if (res) { //获取用户列表，循环遍历判断当前用户是否存在
        for (var i = 0; i < res.length; i++) {
          if (res[i].uid == UserName && res[i].userName == Password) {
            isTrue = true;
          }
        }
      }
      var data = {};
      data.isLogin = isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
      if (isTrue) {
        data.userInfo = {};
        data.userInfo.uid = UserName;
        data.userInfo.userName = Password;
      } //登录成功返回用户信息
      if (result) {
        result = {
          code: 200,
          msg: 'succeed'
        };
        data.result = result;
      }
      if (err) data.err = err;
      // 以json形式，把操作结果返回给前台页面
      responseJSON(_res, data);

      // 释放链接
      connection.release();

    });
  });
});
//添加用户
router.get('/addUser',function(req,res,next){
  //从连接池获取连接
  pool.getConnection(function(err,connection){
    //获取前台页面传过来的参数
    var param = req.query||req.params;
    //建立连接，添加一个用户信息
    connection.query(userSQL.insert,[param.uid,param.name],function(err,result){
      if(result){
        result={
          code:200,
          msg:'添加成功'
        }
      }
      responseJSON(res,result);
      //释放链接
      connection.release();
    })
  })
})
// 查询列表页
router.get('/', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query(userSQL.getUserInfo, function (err, rows) {
      if (err) {
        res.render('users', {
          title: 'Express',
          datas: []
        }); // this renders "views/user.html"
      } else {
        res.render('users', {
          title: 'Express',
          datas: rows
        });
      }
      connection.release();
    });
  });
});
// 新增页面跳转
router.get('/add', function (req, res) {
  res.render('add')
});
router.post('/add', function (req, res) {
  var name = req.body.name;
  var age = req.body.age;
  pool.getConnection(function (err, connection) {
    connection.query(userSQL.insertUserInfo, [name, age], function (err, rows) {
      if (err) {
        res.end('新增失败:' + err);
      } else {
        res.redirect('/users');
      }
      connection.release();

    });
  });
});
// 删
router.get('/del/:id', function (req, res) {
  var id = req.params.id;
  pool.getConnection(function (err, connection) {
    connection.query("delete from userInfo where id=" + id, function (err, rows) {
      if (err) {
        res.end('删除失败:' + err);
      } else {
        res.redirect('/users');
      }
      connection.release();

    });
  });

});
// 修改功能模块
router.get('/toUpdate/:id', function (req, res) {
  var id = req.params.id;
  console.log(id)
  pool.getConnection(function (err, connection) {
    connection.query("select * from userInfo where id=" + id, function (err, rows) {
      console.log(rows)
      if (err) {
        res.end('修改页面跳转失败:' + err);
      } else {
        res.render('update', {
          datas: rows
        }); //直接跳转
      }
      connection.release();

    });
  });
});
router.post('/update', function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var age = req.body.age;
  console.log(id)
  console.log(name)
  console.log(age)
  pool.getConnection(function (err, connection) {
    connection.query("update userInfo set name='" + name + "',age='" + age + "' where id=" + id, function (err, rows) {
      if (err) {
        res.end('修改失败:' + err);
      } else {
        res.redirect('/users');
      }
      connection.release();
    });
  });
});
// 查询
router.post('/search', function (req, res) {
  var name = req.body.s_name;
  var age = req.body.s_age;
  var sql = "select * from userInfo";
  if (name) {
    sql += " and name='" + name + "' ";
  }
  if (age) {
    sql += " and age=" + age + " ";
  }
  sql = sql.replace("and", "where");
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      if (err) {
        res.end("查询失败：", err)
      } else {
        res.render("users", {
          title: 'Express',
          datas: rows,
          s_name: name,
          s_age: age
        });
      }
      connection.release();
    });
  });
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get('/getUserInfo',function(req,res,next){
//   var user = new User();
//   var params = URL.parse(req.url,true).query;
//   if(params.id=="1"){
//     user.name='Mr.chen';
//     user.age='1';
//     user.city='杭州';
//   }else{
//     user.name = 'Mr.chen1';
//     user.age = '2';
//     user.city = '浙江';
//   }
//   var response = {status:1,data:user};
//   res.send(JSON.stringify(response))
// })
module.exports = router;
