/**
 * 页面加载事件
 */
$(function() {

})

/**
 * @param {Object} e
 * 跳转到查看企业详情页面
 */
$(".showDetail").bind("click", function(e) {
	var index = e.currentTarget.dataset.index;

	//修改父页面iframe的路径
	$('#mainFrame', window.parent.document).attr("src", "../businessManagement/businessDetail.html");
})
