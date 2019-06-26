/**
 * 页面加载事件
 */
$(function() {

})

/**
 * 跳转到安全事项详情页面
 */
$(".toSafetyDetail").bind("click", function() {
	//更改父页面iframe路径
	$('#mainFrame', window.parent.document).attr("src", "../safetyManagement/safetyDetail.html");
})
