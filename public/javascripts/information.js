$(function(){
	var username=/[a-zA-Z0-9]{1,10}|[\x4e00-\x9fa5]{1,5}/g;
	var email=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
	var phone=/^1[34578]\d{9}$/;
	var address=/[a-zA-Z0-9]{1,10}|[\x4e00-\x9fa5]{5,}/g;
	var age=/[a-zA-Z0-9]{1,10}|[\x4e00-\x9fa5]{1,5}/g;
	var qq=/[a-zA-Z0-9]{1,10}|[\x4e00-\x9fa5]{1,5}/g;
	var reg1=false,reg2=false,reg3=false,reg4=false,reg5=false,reg6=false,reg7=false,reg8=false;
	$('#username').blur(function(){
			if(!username.test($('#username').val())){
				$('#tishi1').text('用户名是在2到10位！')
				
			}else{
				$('#tishi1').text('')
				reg1=true;
			}
		})
	$('#email').blur(function(){
			if(!email.test($('#email').val())){
				$('#tishi3').text('请输入正确的邮箱地址！');
				
			}else{		
				$('#tishi3').text('');	
				reg3=true;
			}
		})
	$('#address').blur(function(){
			if(!address.test($('#address').val())){
				$('#tishi4').text('请输入地址！');
				
			}else{		
				$('#tishi4').text('');	
				reg4=true;
			}
		})
	$('#phone').blur(function(){
			if(!phone.test($('#phone').val())){
				$('#tishi5').text('请输入正确的手机号码！');
				
			}else{		
				$('#tishi5').text('');	
				reg5=true;
			}
		})
	$('#age').blur(function(){
			if(!age.test($('#age').val())){
				$('#tishi6').text('请输入年纪！');
				
			}else{		
				$('#tishi6').text('');	
				reg6=true;
			}
		})
	$('#qq').blur(function(){
			if(!qq.test($('#qq').val())){
				$('#tishi7').text('请输入正确的QQ！');
				
			}else{		
				$('#tishi7').text('');	
				reg7=true;
			}
		})
	$('#dianji').click(function(){
		window.location.href='login.html';
	})
	$('#determine').click(function(){
//		if(reg1&&reg3&&reg4&&reg5&&reg6&&reg7){
			$.ajax({
				type:"post",
				url:"http://localhost:8006/item/adds",
				async:true,
				data:{'uname':$('#username').val(),'uemail':$('#email').val(),'uqq':$('#qq').val(),'utel':$('#phone').val(),'usex':$('#xingbie input[name="sex"]:checked').val(),'uaddress':$('#address').val(),'uage':$('#age').val(),'teg':$('#chengdu input[name="cd"]:checked').val()},
			    success:function(e){
			    	if(e.flag==1){
			    		alert('添加成功！')
			    	}
			    },
			    error:function(){
			    	
			    }
			});
//		}
	})
	
})