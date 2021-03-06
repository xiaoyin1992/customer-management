var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'root',
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
		console.log(req.session)
			if(result=="" || result==null){
					res.send({flag:2})
				}
			else if(pwd==result[0].upwd){
					req.session.uname=uname; //设置session  后面的uname就是用户登录的用户名 是前台给的数据
					req.session.uid=result[0].uid;
					//req.session.destory() 清除session
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

//列表-------
router.get("/list",function(req,res){
	if(req.session.uname){
	var teg = req.param('teg');
	var uid = req.session.uid;
	console.log(teg)
	pool.getConnection(function(err,connection){
		var sql="select * from custom where teg = ? && cid = ?";
		connection.query(sql,[teg,uid],function(err,result){
			
				if(err){
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log(result+">>>>>")
				res.send(result);
		})
		
	})
	}else{
		res.send({flag:2})
	}
})


router.get("/del",function(req,res){
	var uid = req.param('uid');
	console.log(uid)
	pool.getConnection(function(err,connection){
		var sql="update custom set cid = '-1' where uid = ?";
		connection.query(sql,[uid],function(err,result){
			
				if(err){
					res.send({flag:2})
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log(result+">>>>>")
				res.send({flag:1});
		})
		
	})
})

//转出公海
router.get("/ghdel",function(req,res){
	var id = req.param('uid');
	var uid = req.session.uid;
	console.log(uid)
	pool.getConnection(function(err,connection){
		var sql="update custom set cid = ? where uid = ?";
		connection.query(sql,[uid,id],function(err,result){
			
				if(err){
					res.send({flag:2})
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log(result+">>>>>")
				res.send({flag:1});
		})
		
	})
})



router.get("/xiangq",function(req,res){
	var uid = req.param('uid');
	console.log(uid)
	pool.getConnection(function(err,connection){
		var sql="select * from custom where uid = ?";
		connection.query(sql,[uid],function(err,result){
			
				if(err){
					res.send({flag:2})
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log(result+">>>>>")
				res.send(result);
		})
		
	})
})

//修改
router.get("/xiugai",function(req,res){
	var uid = req.param('uid');
	var uname = req.param('uname');
	var utel = req.param('utel');
	var uemail = req.param('uemail');
	var unicheng = req.param('unicheng');
	console.log(uid)
	pool.getConnection(function(err,connection){
		var sql="update custom set uname=? , utel=? , uemail=? , unicheng=? where uid=?";
		connection.query(sql,[uname,utel,uemail,unicheng,uid],function(err,result){
			
				if(err){
					res.send({flag:2})
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				//console.log(result+">>>>>")
				res.send({flag:1});
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
	
	//分页
	router.get('/page', function(req, res) {
	console.log('into page...');
	if(req.session.uname){
	var page = req.query.page;
	var uid = req.session.uid;
	var total = 0;
	var pageNum = 2;
	var startPage = (page-1)*pageNum;
		console.log('page'+ uid);
	pool.getConnection(function(err, connection) {
		var sql = 'select * from custom where cid = ?';
		connection.query(sql, [uid], function(err, result) {
			if(err) {
				return;
			}
			total = result.length;
//			console.log("result:" + result.length);
			console.log('total:' + total)
			connection.release(); //释放连接
			if(total > 0) {
				pool.getConnection(function(err, connection) {
					var sql = 'select * from custom where cid = ? limit ?,?';
					connection.query(sql, [uid,startPage,pageNum], function(err, result) {
						if(err) {
							return;
						}
						console.log("result:" + result.length);
						connection.release(); //释放连接
						res.send({pageNum:pageNum,total:total,result:result});
					})
				})
			}
		})
	})
}else{
		res.send({flag:2})
	}
});

	//搜索
	router.get('/sea', function(req, res) {
	console.log('into page...');
	if(req.session.uname){
	var page = req.query.page;
	var uid = req.session.uid;
	var uname=req.query.uname;
	var total = 0;
	var pageNum = 2;
	var startPage = (page-1)*pageNum;
		console.log('page'+ uid);
	pool.getConnection(function(err, connection) {
		var sql = 'select * from custom where cid = ? && uname = ?';
		connection.query(sql, [uid,uname], function(err, result) {
			if(err) {
				return;
			}
			total = result.length;
//			console.log("result:" + result.length);
			console.log('total:' + total)
			connection.release(); //释放连接
			if(total > 0) {
				pool.getConnection(function(err, connection) {
					var sql = 'select * from custom where cid = ? limit ?,?';
					connection.query(sql, [uid,startPage,pageNum], function(err, result) {
						if(err) {
							return;
						}
						console.log("result:" + result.length);
						connection.release(); //释放连接
						res.send({pageNum:pageNum,total:total,result:result});
					})
				})
			}else{
				res.send({flag:3})
			}
		})
	})
}else{
		res.send({flag:2})
	}
});






	//公海分页。。。。。
	router.get('/ghpage', function(req, res) {
	console.log('into page...');
	if(req.session.uname){
	var page = req.query.page;
	var uid = req.session.uid;
	var total = 0;
	var pageNum = 2;
	var startPage = (page-1)*pageNum;
		console.log('page'+ uid);
	pool.getConnection(function(err, connection) {
		var sql = 'select * from custom where cid = -1';
		connection.query(sql, function(err, result) {
			if(err) {
				return;
			}
			total = result.length;
//			console.log("result:" + result.length);
			console.log('total>>>>>>>>>>>>:' + total)
			connection.release(); //释放连接
			if(total > 0) {
				pool.getConnection(function(err, connection) {
					var sql = 'select * from custom where cid = -1 limit ?,?';
					connection.query(sql, [startPage,pageNum], function(err, result) {
						if(err) {
							return;
						}
						console.log("result:" + result.length);
						connection.release(); //释放连接
						res.send({pageNum:pageNum,total:total,result:result});
					})
				})
			}
		})
	})
}else{
		res.send({flag:2})
	}
});


//添加
router.post("/adds",function(req,res){
	var cid=req.session.uid;
	var uname=req.body['uname'];
	var usex=req.body['usex'];
	var uemail=req.body['uemail'];
	var uqq=req.body['uqq'];
	var uaddress=req.body['uaddress'];
	var utel=req.body['utel'];
	var age=req.body['uage'];
	var teg=req.body['teg'];
	pool.getConnection(function(err,connection){
		var sql = "insert into custom (cid,uname,usex,uemail,uqq,uaddress,utel,age,teg) values (?,?,?,?,?,?,?,?,?)";
		connection.query(sql,[cid,uname,usex,uemail,uqq,uaddress,utel,age,teg],function(err,result){
			if(err){
			  return;	
			  res.send({flag:2});
			}
			connection.release();
			res.send({flag:1});
		})
	})
})


//详情
router.get("/detail",function(req,res){
	var uid = req.param('uid');
	console.log(uid)
	pool.getConnection(function(err,connection){
		var sql="select * from custom where uid = ?";
		connection.query(sql,[uid],function(err,result){
			
				if(err){
					res.send({flag:2})
					console.log("error:"+err.message);
					return;
				}
				connection.release();//释放连接
				console.log(result+">>>>>")
				res.send(result);
		})
		
	})
})
	
module.exports = router;