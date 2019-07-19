/**
 * 页面加载事件
 */
$(function() {
	var clientWidth = $(window).width(); //浏览器当前窗口可视区域高度 
	var clientHeight = $(window).height(); //浏览器当前文档的的高度
	//判断屏幕尺寸 选择显示
	if (isBigScreen) {
		console.log("大屏幕");
		$(".smallScreen").hide();
	} else {
		console.log("小屏幕");
		$(".normalScreen").css("display","none");
	}

})