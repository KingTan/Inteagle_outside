// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		if (res.senderType == 4) {
			console.log("心跳..");
			return;
		} else {
			//判断是否mqtt发送过来的数据
			if (res.messageType == "mqtt") {
				//数据类型
				var dataType = res.dataType;
				//数据值
				var data = "";

				var shtml_dataType = "";

				var send_html = "";

				switch (dataType) {
					// 16进制数据
					case "hexStr":
						data = res.data;
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='dataArea'>" + data +
							"</span></div><br/>";
						break;
						// 主题
					case "topic":
						data = res.data;
						shtml_dataType = "<div class='dataTypeArea topicArea'>" + dataType + "------------<span class='dataArea'>" +
							data +
							"</span></div><br/>";
						break;
						// 10进制命令
					case "cmd_ten":
						data = res.data;
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='dataArea'>" + data +
							"</span></div><br/>";
						data = res.data;
						break;
						// 时间同步消息
					case "timeSyncData":
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> t_h: " + res.data
							.t_h + "</span>" + "<span class='timet_l'>t_l: " + res.data.t_l + "</span></div>";
						break;
						// 人员定位数据
					case "IdInfoStruct":
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> id: " + res.data
							.id + "</span>" + "<span class='timet_l'>x: " + res.data.x + "</span>" + "<span class='timet_l'>y: " + res.data
							.y + "</span>" +
							"<span class='timet_l'>t: " + res.data.t + "</span>" + "<span class='timet_l'>camera_id: " + res.data.camera_id +
							"</span>" + "</div>";
						break;
						// 人脸识别数据
					case "HelmetDiscernStruct":
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> id: " + res.data
							.id + "</span>" + "<span class='timet_l'>x: " + res.data.x + "</span>" + "<span class='timet_l'>y: " + res.data
							.y + "</span>" +
							"<span class='timet_l'>t: " + res.data.t + "</span>" + "<span class='timet_l'>camera_id: " + res.data.camera_id +
							"</span>" + "</div>";
						break;
						// 设备行为数据
					case "DeviceActionStruct":
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> action: " + res.data
							.action + "</span>" + "<span class='timet_l'>device_type: " + res.data.device_type + "</span>" +
							"<span class='timet_l'>priority: " + res.data
							.priority + "</span>" + "</div>";
						break;
						// 电池情况数据
					case "HelmetSensorDataStruct":
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> vol: " + res.data
							.vol + "</span>" + "<span class='timet_l'>temp: " + res.data.temp + "</span>" +
							"<span class='timet_l'>helmet_on: " + res.data.helmet_on + "</span>" + "</div>";
						break;
						//发送的数据
					case "send":
						send_html = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> sendData: " + res
							.data.msg + "</span>" + "<span class='timet_l'>topic: " + res.data.topic + "</span>" +
							"<span class='timet_l'>cmd_ten: " + res.data.cmd_ten + "</span>" + "</div>";
						break;
				}
				//接收的数据
				$("#sendMsgText").append(shtml_dataType);

				//发送的数据
				$("#sendDataArea").append(send_html);

				//滚动条保持最底部
				var div = document.getElementById('sendMsgText');
				div.scrollTop = div.scrollHeight;

				//滚动条保持最底部
				var div_send = document.getElementById('sendDataArea');
				div_send.scrollTop = div_send.scrollHeight;
			}
		}
	}
}
