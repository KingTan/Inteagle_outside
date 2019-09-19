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
					//初始化 深层水平位移
					inintialEcharts('bigCharts', "001", data_array_single, true);
				}else if(res.messageType=="foundation_top_horizontal"){
					var data_array_single = res.data;
					//初始化 顶部水平位移
					draw_top_charts(data_array_single);
				}
			}
		}
	};


}
