/**
 * 页面加载事件
 */
$(function() {
	var clientWidth = $(window).width(); //浏览器当前窗口可视区域高度 
	var clientHeight = $(window).height(); //浏览器当前文档的的高度
	//判断屏幕尺寸 选择显示
	if (isBigScreen) {
		console.log("大屏幕");
		$("#smallScreen").hide();
	} else {
		console.log("小屏幕");
		$("#normalScreen").css("display","none");
	}

})

/**
 * 点击编辑按钮
 */
$(".editorText").bind("click", function() {
	//显示工具区
	$(".toolsArea").show();
	$(".toolsArea").css("display","flex");
	
	//隐藏编辑区
	$(".editorArea").hide();
})

/**
 * 点击完成按钮
 */
$(".finishText").bind("click",function(){
	//隐藏工具区
	$(".toolsArea").hide();
	//显示编辑区
	$(".editorArea").show();
})

/**
 * @param {Object} e
 * 跳转到 查看建筑工人基础信息页面
 */
$(".showDetail").bind("click", function() {
	window.location.href = "workerDetail.html";
})
