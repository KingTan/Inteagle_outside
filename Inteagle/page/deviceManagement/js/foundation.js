
/**
 * 页面加载事件
 */
$(function(){
	// //延迟5s加载外部构件
	// setTimeout(function() {
	// 	load();
	// }, 5000);
})

/**
 * 点击开始按钮
 */
$(".beginBtn").bind("click", function(e) {

	$.ajax({
		url: PATH + "send/start",
		type: "post",
		data: {
			"topic": "6lbr-down"
		},
		success: function(res) {
			console.log("res", res);
		},
		error: function(badRes) {
			console.log("请求点击开始失败...");
		}
	});


})
/**
 * 点击结束按钮
 */
$(".endBtn").bind("click", function(e) {
	$.ajax({
		url: PATH + "send/stop",
		type: "post",
		data: {
			"topic": "6lbr-down"
		},
		success: function(res) {
			console.log("res", res);
		},
		error: function(badRes) {
			console.log("请求点击开始失败...");
		}
	});
})

/**
 * @param {Object} index
 * 点击菜单栏
 */
function setOption(index) {
	var height = "";
	switch (index) {
		case 0:
			//调用父页面方法
			parent.showWarnValModal();
			break;
		case 1:
			//调用父页面方法
			parent.runtimeSetModal();
			break;
		case 2:
			break;
	}
}
