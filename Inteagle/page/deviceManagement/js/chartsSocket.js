var socket;

// 本地socket路径
// const wsServer = "ws://localhost:8080/chartsSocket/001";

// 服务器socket路径
const wsServer = "wss://www.inteagle.com.cn/Inteagle_java/chartsSocket/001";

//收到的总数据
var data_single_array_all = [];


if (typeof(WebSocket) == "undefined") {
	console.log("您的浏览器不支持WebSocket");
} else {
	window.parent.webSocket = new socketEntity();
	window.parent.webSocket.wsServer = wsServer;

	//连接websocket
	window.parent.webSocket.connect(wsServer);

	//处理socket消息
	if (window.parent.webSocket != null) {
		window.parent.webSocket.writeScreen = function(res) {
			if (res.senderType == 4) {
				console.log("心跳..");
				return;
			} else {
				if (res.messageType == "foundation") {
					var data_array_single = res.data;
					
					// if (data_single_array_all.length > 7) {
					// 	data_single_array_all = [data_single_array_all.pop()];
					// }
					// console.log("data_single_array_all------------", data_single_array_all);
					// data_single_array_all.push(data_array_single);
					
					inintialEcharts("001", data_array_single);
				}
			}
		}
	};


}
