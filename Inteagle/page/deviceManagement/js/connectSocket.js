var socket;

// 本地socket路径
// const wsServer = "ws://localhost:8080/netSocket/ivan";

// 服务器socket路径
const wsServer = "wss://www.inteagle.com.cn/Inteagle/netSocket/ivan";

if (typeof(WebSocket) == "undefined") {
	console.log("您的浏览器不支持WebSocket");
} else {
	window.parent.webSocket = new socketEntity();
	window.parent.webSocket.wsServer = wsServer;
	window.parent.webSocket.writeScreen = function(res) {
		console.log(res)
	};
	//连接websocket
	window.parent.webSocket.connect(wsServer);
}
