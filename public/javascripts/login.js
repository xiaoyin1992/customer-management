window.onload = function(){
//	切换登录注册
		var oBtn = document.getElementById('nav');
		var aBtn = oBtn.getElementsByTagName('a');
		var oDiv = document.getElementById('conter');
		var aDiv = oDiv.getElementsByTagName('div');
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].index = i;
			aBtn[i].onclick = function(){
				for(var i=0;i<aBtn.length;i++){
					aBtn[i].className = '';
					aDiv[i].style.display = 'none';
				}
				aDiv[this.index].style.display = 'block';
				this.className = 'show';
			}	
		};
//	验证码
		var code ; //在全局定义验证码   
	 
	createCode();
	document.getElementById("change").onclick=function(){
		createCode();
	};
//	document.getElementById("btn").onclick=function(){
//		validate();
//	};
	//产生验证码 
	function createCode(){  
	     code = "";   
	     var codeLength = 4;//验证码的长度  
	     var checkCode = document.getElementById("code");   
	     var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
	     'S','T','U','V','W','X','Y','Z');//随机数  
	     for(var i = 0; i < codeLength; i++) {//循环操作  
	        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
	        code += random[index];//根据索引取得随机数加到code上  
	    }  
	    checkCode.value = code;//把code值赋给验证码  
	}  
	//校验验证码  
	function validate(){  
	    var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写        
	    if(inputCode.length <= 0) { //若输入的验证码长度为0  
	        //alert("请输入验证码！"); //则弹出请输入验证码  
	        $('#wenz').html('请输入验证码！')
	        yanzheng=false;
	    }         
	    else if(inputCode != code ) { //若输入的验证码与产生的验证码不一致时  
	        //alert("验证码输入错误！"); 
	        $('#wenz').html('验证码输入错误！')
	        yanzheng=false;
	        document.getElementById("input").value = "";
	        //清空文本框  
	    }         
	    else { //输入正确时  
	    		yanzheng=true;
	        //alert("OK");
	        $('#wenz').html('OK')
	    }             
	}
	
	var zhanghao=/^[a-z0-9_]{6,18}$/;
	var mima=/^[a-zA-Z\d_]{6,}$/;
	var email=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
	var nicheng=/[a-zA-Z0-9]{1,10}|[\x4e00-\x9fa5]{1,5}/g;
	var tel=/^1[34578]\d{9}$/;
	var reg1=false,reg2=false,reg3=false,reg4=false,reg5=false,reg6=false,yanzheng=false;;
	$('#zhanghao').blur(function(){
		if(!zhanghao.test($('#zhanghao').val())){
			$('.tishi1').text('用户名是在6到18位！')
			
		}else{
			$('.tishi1').text('')
			reg1=true;
		}
	})
	$('#mima').blur(function(){
		if(!mima.test($('#mima').val())){
			$('.tishi2').text('密码是6位以上')
			
		}else{
			$('.tishi2').text('')
			reg2=true;
		}
	})
	$('#mima1').blur(function(){
		if(!$('#mima1').val()==$('#mima').val()){
			$('.tishi3').text('两次密码不一致！')
			
		}else{
			$('.tishi3').text('')
			reg3=true;
		}
	})
	$('#email').blur(function(){
		if(!email.test($('#email').val())){
			$('.tishi4').text('请输入正确的邮箱地址！')
			
		}else{
			$('.tishi4').text('')
			reg4=true;
		}
	})
		$('#tel').blur(function(){
		if(!tel.test($('#tel').val())){
			$('.tishi6').text('格式不正确')
			
		}else{
			$('.tishi6').text('')
			reg6=true;
		}
	})
	$('#nicheng').blur(function(){
		if(!nicheng.test($('#nicheng').val())){
			$('.tishi5').text('长度最多为5个汉字或10个字母或数字')
			
		}else{
			$('.tishi5').text('')
			reg5=true;
		}
	})
	//注册
	$('#btn').click(function(){
		validate();
		if(reg1&&reg2&&reg3&&reg4&&reg5&&yanzheng){
			$.ajax({
				type:"post",
				url:"http://localhost:8006/item/register",
				data:{username:$("#zhanghao").val(),pwd:$("#mima").val(),email:$("#email").val(),tel:$("#tel").val(),nicheng:$("#nicheng").val()},
				async:true,
				success:function(e){
					if(e.flag==1){
						alert('success')
					}else if(e.flag==2){
						alert('用户名存在')
					}else if(e.flag==3){
						alert('注册失败')
					}
				},
				error:function(){
					alert("error!")
				}
			});
		}
	})
	
	//登录
	$("#deng").click(function(){
			$.ajax({
				type:"post",
				url:"http://localhost:8006/item/deng",
				data:{username:$("#uname").val(),password:$("#pwd").val()},
				async:true,
				success:function(e){
					if(e.flag==1){
						alert('success')
					}else if(e.flag==2){
						alert('not found')
					}else if(e.flag==3){
						alert('password error')
					}
				},
				error:function(){
					alert("error!")
				}
			});
		})
}
