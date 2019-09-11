/**
 * 页面加载事件
 */
$(function() {
	// //延迟5s加载外部构件
	// setTimeout(function() {
	// 	load();
	// }, 5000);
})
// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		switch (res.senderType) {
			case 1:
				//私聊
				console.log("res-----------", res);
				move_track(res.messageData);
				break;
			case 2:
				//群聊
				break;
			case 3:
				//系统消息
				break;
			case 4:
				//心跳消息
				console.log("心跳..");
				break;
			default:
				break;
		}

	}
}

/**
 * @param {Object} dataArray
 * 移动
 */
function move_track(dataArray) {
	for (var i = 0; i < dataArray.length; i++) {
		var singleObject = dataArray[i];
		animation(singleObject.x, singleObject.y, singleObject.t, singleObject.id);
	}
}


/**
 * 点击电子围栏事件
 */
$(".electricFenceText").bind("click", function(dom) {
	//调用父页面的方法
	window.parent.showElectricFenceModal();
})
