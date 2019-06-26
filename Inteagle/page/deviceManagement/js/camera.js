/**
 * 页面加载事件
 */
$(function(){
	
	
})

/**
 * 跳转到摄像头详情页面
 */
$(".toCameraDetail").bind("click",function(){
	//修改父页面iframe的路径
	$('#mainFrame', window.parent.document).attr("src", "../deviceManagement/cameraDetail.html");
})

