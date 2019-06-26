var count = 0;

/**
 * 页面加载事件
 */
$(function() {


})

/**
 * 跳转到查看部门信息页面
 */
$(".toDepartmentDetail").bind("click", function() {
	//修改父页面iframe的路径
	$('#mainFrame', window.parent.document).attr("src", "../businessManagement/departmentDetail.html");
})



/**
 * 点击编辑事件
 */
function clickEditor() {
	count++;
	if (count % 2 == 0) {
		$(".projectName span").show();
		$(".projectName input").hide();
		$(".projectName").removeClass("singleInputArea");
	} else {
		$(".projectName span").hide();
		$(".projectName input").show();
		$(".projectName").addClass("singleInputArea");
	}
}
