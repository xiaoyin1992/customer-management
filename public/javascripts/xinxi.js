function getlist(page){
$.ajax({
			type:"get",
			url:"http://localhost:8006/item/page",
			async:true,
			data:{page:page},
			success:function(e){
				if(e.flag==2){
					location.href="login.html";
					return
				}
				var total = e.total;
				var pageNum = e.pageNum;
				var totalPage = Math.ceil(total/pageNum);
				var list = e.result;
				console.log(total+"/"+pageNum+"/"+totalPage)
				console.log(e)
				var oli='<li><span>客户姓名</span><span>性别</span><span>邮箱</span><span>客户等级</span><span>联系电话</span><span>操作</span></li>';
				for (var i=0;i<e.result.length;i++) {
					oli+="<li><span>"+e.result[i].uname+"</span><span>"+e.result[i].sex+"</span><span>"+e.result[i].uemail+"</span><span>"+e.result[i].teg+"</span><span>"+e.result[i].utel+"</span><span><i class='xiangqing icon-pencil' index="+e.result[i].uid+"></i><i class='del icon-share' index="+e.result[i].uid+"></i></span></li>"
				}
				var spa='<span class="yky_total">共'+e.total+'条</span><span class="yky_first">页首</span><span class="yky_prew">上一页</span><span class="">'+n+'/'+Number(total%pageNum+2)+'</span><span class="yky_next">下一页</span><span class="yky_last">页尾</span>';
				$(".yky_control").html(spa)
				$(".yky_ul").html(oli);
				
				//删除
				$(".del").click(function(){	
					var did=$(this).attr("index")
					$.ajax({
						type:"get",
						url:"http://localhost:8007/item/del",
						async:true,
						data:{uid:$(this).attr("index")},
						success:function(m){
							console.log(e)
							if(m.flag==1){
							$("button[index="+did+"]").parent().remove()
							}else{
								alert("delete faild")
							}
						}
					});
				})
				//详情
				$(".xiangqing").click(function(){
					location.href="xiangqing.html?id="+$(this).attr("index")
				})
				
					$(".yky_prew").click(function(){
						if(n>1){
							n-=1;
						}else{
							n=1;
						}
						getlist(n);
					})
					
					$(".yky_next").click(function(){
						if(n<total%pageNum+2){
							n+=1;
						}else{
							n=total%pageNum+2;
						}
						getlist(n);
					})
					$(".yky_first").click(function(){
						n=1;
						getlist(1)
					})
					
					$(".yky_last").click(function(){
						n=total%pageNum+2;
						getlist(total%pageNum+2)
					})
				
				
			},
			error:function(){
				alert("error")
			}
		});
		
}

//.....
					var n=1;
					getlist(n);
					
				
