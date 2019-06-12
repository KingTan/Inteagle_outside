/**
 * 页面加载事件
 */
$(function(){
	
})

/**
 * @param {Object} e
 * 跳转至 部门信息页面
 */
$(".showDetail").bind("click",function(e){
	console.log(e);
	//更换父页面 iframe 路径
	$('#mainFrame', window.parent.document).attr("src","../businessManagement/departmentDetail.html");
})
