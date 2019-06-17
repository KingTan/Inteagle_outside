/**
 * 页面加载事件
 */
$(function(){
	
	//判断屏幕尺寸 选择显示
	if (isBigScreen) {
		console.log("大屏幕");
		$(".smallScreen").hide();
	} else {
		console.log("小屏幕");
		$(".normalScreen").hide();
	}
	
	
})