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
					oli+="<li><span>"+e.result[i].uname+"</span><span>"+e.result[i].usex+"</span><span>"+e.result[i].uemail+"</span><span>"+e.result[i].teg+"</span><span>"+e.result[i].utel+"</span><span><i class='xiangqing icon-pencil' index="+e.result[i].uid+"></i><i class='del icon-share' index="+e.result[i].uid+"></i></span></li>"
				}
				var spa='<span class="yky_total">共'+e.total+'条</span><span class="yky_first">页首</span><span class="yky_prew">上一页</span><span class="">'+n+'/'+Math.ceil(total/pageNum)+'</span><span class="yky_next">下一页</span><span class="yky_last">页尾</span>';
				$("#yky_control").html(spa)
				$("#yky_ul").html(oli);
				
				//删除
				$(".del").click(function(){
					var did=$(this).attr("index")
					$.ajax({
						type:"get",
						url:"http://localhost:8006/item/del",
						async:true,
						data:{uid:$(this).attr("index")},
						success:function(m){
							console.log(e)
							if(m.flag==1){
							$("i[index="+did+"]").parent().parent().remove()
							}else{
								alert("delete faild")
							}
						}
					});
				})
				//详情
				$(".xiangqing").click(function(){
					var abc = $(this).attr("index");
					$.ajax({
			type:"get",
			url:"http://localhost:8006/item/detail",
			async:true,
			data:{
				uid:abc
			},
			success:function(e){
				console.log(e)
				$(".y_conner").css("display","block");
				$(".yky_list").css("display","none");	
		$(".box").css("display","none");
		$(".y_conner1").css("display","none");
		$("y_conner").css("display","none");
		$(".rightbar").css("display","none");
		$(".yky_ghlist").css("display","none");
				var html = '<div class="y_bottom_left"></div>\
								<div class="y_bottom_right">\
									<span class="y_bottom_detail_top">\
										<ul>\
											<li>客户名称：'+e[0].uname+'</li>\
											<li>客户年龄：'+e[0].age+'</li>\
											<li>客户性别：'+e[0].usex+'</li>\
										</ul>\
										<ul class="y_bottom_ulleft">\
											<li>客户email：'+e[0].uemail+'</li>\
											<li>客户qq：'+e[0].uqq+'</li>\
											<br />\
										</ul>\
									</span><br />\
									<span>\
									<ul>\
										<li>客户地址：'+e[0].uaddress+'</li>\
										<li>客户电话：'+e[0].utel+'</li>\
									</ul>\
									</span>\
								</div>\
							</div>';
//				for(var i = 0;i<e.length;i++){
//					html+=""
//					console.log(e[i].cid)
//				}
				$('.y_conner_bottom').html(html)
			},
			error:function(){
				alert('error')
			}
		});
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
						if(n<Math.ceil(total/pageNum)){
							n+=1;
						}else{
							n=Math.ceil(total/pageNum);
						}
						getlist(n);
					})
					$(".yky_first").click(function(){
						n=1;
						getlist(1)
					})
					
					$(".yky_last").click(function(){
						n=Math.ceil(total/pageNum);
						getlist(n)
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
					
					$("#culist").click(function(){
						$(".y_conner").css("display","none");
				$(".yky_list").css("display","block");	
		$(".box").css("display","none");
		$(".y_conner1").css("display","none");
		$("y_conner").css("display","none");
		$(".rightbar").css("display","none");
		$(".yky_ghlist").css("display","none");
						getlist(1);
					})
					$('#houtui').click(function(){
						$(".y_conner").css("display","none");
				$(".yky_list").css("display","block");	
		$(".box").css("display","none");
		$(".y_conner1").css("display","none");
		$("y_conner").css("display","none");
		$(".rightbar").css("display","none");
		$(".yky_ghlist").css("display","none");
						getlist(1);
					})
					
//公海信息

function getghlist(ghpage){
					$.ajax({
						type:"get",
						url:"http://localhost:8006/item/ghpage",
						async:true,
						data:{page:ghpage},
						success:function(e){
							console.log(e)
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
					oli+="<li><span>"+e.result[i].uname+"</span><span>"+e.result[i].usex+"</span><span>"+e.result[i].uemail+"</span><span>"+e.result[i].teg+"</span><span>"+e.result[i].utel+"</span><span><i class='ghdel icon-share' index="+e.result[i].uid+"></i></span></li>"
				}
				var spa='<span class="yky_total">共'+e.total+'条</span><span class="yky_ghfirst">页首</span><span class="yky_ghprew">上一页</span><span class="">'+m+'/'+Math.ceil(total/pageNum)+'</span><span class="yky_ghnext">下一页</span><span class="yky_ghlast">页尾</span>';
				$("#yky_ghcontrol").html(spa)
				$("#yky_ghul").html(oli);
							
							$(".yky_ghprew").click(function(){
						if(m>1){
							m-=1;
						}else{
							m=1;
						}
						getghlist(m);
					})
					
					$(".yky_ghnext").click(function(){
						
						if(m<Math.ceil(total/pageNum)){
							m+=1;
						}else{
							m=Math.ceil(total/pageNum);
						}
						getghlist(m);
					})
					$(".yky_ghfirst").click(function(){
						m=1;
						getghlist(1)
					})
					
					$(".yky_ghlast").click(function(){
						m=Math.ceil(total/pageNum);
						getghlist(m)
					})
					//转入个人
					$(".ghdel").click(function(){
						var did=$(this).attr("index");
						$.ajax({
							type:"get",
							url:"http://localhost:8006/item/ghdel",
							async:true,
							data:{uid:$(this).attr("index")},
						success:function(m){
							console.log(e)
							if(m.flag==1){
							$("i[index="+did+"]").parent().parent().remove()
							}else{
								alert("delete faild")
							}
						}
						});
					})
				
						},
						error:function(){
							alert("error")
						}
					});
				}
					var m=1;
				$("#ghlist").click(function(){
					$(".y_conner").css("display","none");
				$(".yky_list").css("display","none");	
		$(".box").css("display","none");
		$(".y_conner1").css("display","none");
		$("y_conner").css("display","none");
		$(".rightbar").css("display","none");
		$(".yky_ghlist").css("display","block");
					getghlist(m);
				})

			$("#sea").click(function(){
				if($("#search").val()){
					$.ajax({
						type:"get",
						url:"http://localhost:8006/item/sea",
						async:true,
						data:{uname:$("#search").val(),page:1},
						success:function(e){
								if(e.flag==2){
					location.href="login.html";
					return
				}
								if(e.flag==3){
									$("#yky_control").html("")
									$("#yky_ul").html("查不到该信息！");
								}
				var total = e.total;
				var pageNum = e.pageNum;
				var totalPage = Math.ceil(total/pageNum);
				var list = e.result;
				console.log(total+"/"+pageNum+"/"+totalPage)
				console.log(e)
				var oli='<li><span>客户姓名</span><span>性别</span><span>邮箱</span><span>客户等级</span><span>联系电话</span><span>操作</span></li>';
				for (var i=0;i<e.result.length;i++) {
					oli+="<li><span>"+e.result[i].uname+"</span><span>"+e.result[i].usex+"</span><span>"+e.result[i].uemail+"</span><span>"+e.result[i].teg+"</span><span>"+e.result[i].utel+"</span><span><i class='xiangqing icon-pencil' index="+e.result[i].uid+"></i><i class='del icon-share' index="+e.result[i].uid+"></i></span></li>"
				}
				var spa='<span class="yky_total">共'+e.total+'条</span><span class="yky_first">页首</span><span class="yky_prew">上一页</span><span class="">'+n+'/'+Math.ceil(total/pageNum)+'</span><span class="yky_next">下一页</span><span class="yky_last">页尾</span>';
				$("#yky_control").html(spa)
				$("#yky_ul").html(oli);
				
				//删除
				$(".del").click(function(){
					var did=$(this).attr("index")
					$.ajax({
						type:"get",
						url:"http://localhost:8006/item/del",
						async:true,
						data:{uid:$(this).attr("index")},
						success:function(m){
							console.log(e)
							if(m.flag==1){
							$("i[index="+did+"]").parent().parent().remove()
							}else{
								alert("delete faild")
							}
						}
					});
				})
				//详情
//				$(".xiangqing").click(function(){
//					location.href="xiangqing.html?id="+$(this).attr("index")
//				})
				
					$(".yky_prew").click(function(){
						if(n>1){
							n-=1;
						}else{
							n=1;
						}
						getlist(n);
					})
					
					$(".yky_next").click(function(){
						if(n<Math.ceil(total/pageNum)){
							n+=1;
						}else{
							n=Math.ceil(total/pageNum);
						}
						getlist(n);
					})
					$(".yky_first").click(function(){
						n=1;
						getlist(1)
					})
					
					$(".yky_last").click(function(){
						n=Math.ceil(total/pageNum);
						getlist(n)
					})
				
				
			},
			error:function(){
				alert("error")
			}				
					});
				}
			})

//统计......
$("#tongji").click(function(){
	$(".y_conner1").css("display","block");
				$(".yky_list").css("display","none");	
		$(".box").css("display","none");
		$(".y_conner").css("display","none");
		$("y_conner").css("display","none");
		$(".rightbar").css("display","none");
		$(".yky_ghlist").css("display","none");
		var arr1 = [0,0,0];
	
	$.ajax({
		type:"get",
		url:"http://localhost:8006/item/list",
		async:true,
		data:{
			teg:1
		},
		success:function(e){
			console.log(e)
			for(var i = 0;i<e.length;i++){
				if(20<e[i].age<30){
					arr1[0]++;
				}else if(30<=e[i].age<40){
					arr1[1]++;
				}else if(40<=e[i].age<50){
					arr1[2]++;
				}
			}
//			console.log(arr1)
			bing(document.getElementById('chart'),arr1,'年龄比例图');
		},
		error:function(){
			alert('error');
		}
	});
	
	
	
	//		饼状图   所占比例
		function bing(a, c, d) {
			var myChart = new Chart(a, {
				type: 'pie',
				data: {
					labels: ['40以下','40到60','70以上'],
					datasets: [{
						data: c,
						backgroundColor: [
							"#FF6384",
							"#36A2EB",
							"#FFCE56",
							'rgba(255,99,132,1)',
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						],
						hoverBackgroundColor: [
							"#FF6384",
							"#36A2EB",
							"#FFCE56",
							'rgba(255,99,132,1)',
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)'
						]
					}]
				},
				options: {
					
					title: {
						fontColor: '#000',
						display: true,
						text: d
					},
					legend: {
						display: true,
						onClikc: function(event, legendItem) {
							legendItem.fillStyle = '#000'
							console.log(legendItem)
						}
					},
					labels: {
						fontColor: 'pink',
						boxWidth: 190
					},
					//					      提示框
					tooltips: {
						backgroundColor: '#000',
						titleFontColor: 'blue',
						bodyFontColor: '#3ff'
					}
				}
			});
		}
})
