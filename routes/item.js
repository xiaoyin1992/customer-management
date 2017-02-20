var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'crm',
	port:'3306'
})

router.get("/login",function(req,res){
	console.log("into login.....")
	res.send({name:'xiaoyin'})
})
router.post("/login",function(req,res){
	var uname = req.body['username'];
	var pwd = req.body['password'];
	console.log({uname:uname,pwd:pwd})
	res.send({uname:uname,pwd:pwd})
})

//登录---------------
router.post("/deng",function(req,res){
	var uname = req.body['username'];
	var pwd = req.body['password'];
	getUserByName(uname,function(err,result){
		console.log(result)
			if(result=="" || result==null){
					res.send({flag:2})
				}
			else if(pwd==result[0].upwd){
					res.send({flag:1})
				}
			else if(pwd!=result[0].upwd){
					res.send({flag:3})
			}else{
				res.send({flag:4}) //登录失败
			}
	})

})
//注册---------
router.post("/register",function(req,res){
	var uname = req.body['username'];
	var upwd = req.body['pwd'];
	var uemail = req.body['email'];
	var utel = req.body['tel'];
	var unicheng = req.body['nicheng'];
	getUserByName(uname,function(err,result){
			if(result!="" && result!=null){
				console.log(result)
					res.send({flag:2}) //用户名存在
					return;
				}
			save(uname,upwd,uemail,utel,unicheng,function(err,result){
				if(err){
					result={flag:3}; //注册失败
					res.send(result);
					return;
				}
				if(result.insertId>0){
					console.log("注册成功！");
					result={flag:1};
					res.send(result);
				}else{
					result={flag:3}; //注册失败
					res.send(result);
				}
			})
	})
	
	

})

	//根据用户名获取 用户信息  查询数据
	function getUserByName(uname,callback){
		pool.getConnection(function(err,connection){
			var sql='select * from user3 where uname = ?'; 
			connection.query(sql,[uname],function(err,result){ //数组里的uname 和上边的？是对应的
				if(err){
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log("invoked[getUserByName]");
				callback(err,result);
			});
		})
	}
	//保存数据
	function save(uname,upwd,uemail,utel,unicheng,callback){
		pool.getConnection(function(err,connection){
			var sql='insert into user3 (uname,upwd,uemail,utel,unicheng) values (?,?,?,?,?)'; 
			connection.query(sql,[uname,upwd,uemail,utel,unicheng],function(err,result){ 
				if(err){
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log("invoked[getUserByName]");
				callback(err,result);
			});
		})
	}
	
module.exports = router;