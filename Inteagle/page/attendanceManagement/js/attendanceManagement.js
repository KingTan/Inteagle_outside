/**
 * 页面加载事件
 */
$(function() {

})

/**
 * 跳转到对应受制对象页面
 */
$(".toSubject").bind("click", function() {
	$('#mainFrame', window.parent.document).attr("src", "../attendanceManagement/subject.html");
})
