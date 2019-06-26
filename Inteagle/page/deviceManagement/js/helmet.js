/**
 * 页面加载事件
 */
$(function(){
	
	
})

/**
 * 跳转到安全帽详情页面
 */
$(".toHelmetDetail").bind("click",function(){
	//修改父页面iframe的路径
	$('#mainFrame', window.parent.document).attr("src", "../deviceManagement/helmetDetail.html");
})

