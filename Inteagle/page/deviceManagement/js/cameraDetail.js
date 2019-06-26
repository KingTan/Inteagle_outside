var count = 0;

/**
 * 页面加载事件
 */
$(function(){
	
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