/**
 * 页面加载事件
 */
$(function() {
	//延迟5s加载外部构件
	setTimeout(function() {
		load();
	}, 5000);
})
// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		if (res.senderType == 4) {
			console.log("心跳..");
			return;
		} else {
			// console.log(res);
			// console.log(res.x);
			// console.log(res.y);
			// console.log(res.t);
			//渲染动画
			// animation(res.x, res.y, res.t);
		}
	}
}
