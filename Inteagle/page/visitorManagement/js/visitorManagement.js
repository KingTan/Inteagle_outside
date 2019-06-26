/**
 * 页面加载事件
 */
$(function(){
	
})

/**
 * 跳转到访客详情页面
 */
$(".tovisitorDetail").bind("click",function(){
	//更改父页面iframe路径
	$('#mainFrame', window.parent.document).attr("src", "../visitorManagement/visitorDetail.html");
})

