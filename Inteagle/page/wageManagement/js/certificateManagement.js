/**
 * 页面加载事件
 */
$(function(){
	
	//判断屏幕尺寸 选择显示
	if (isBigScreen) {
		$(".smallScreen").hide();
	} else {
		$(".normalScreen").hide();
	}
	
})