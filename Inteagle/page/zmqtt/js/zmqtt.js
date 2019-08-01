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

				switch (dataType) {
					case "hexStr":
						data = res.data;
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='dataArea'>" + data +
							"</span></div><br/>";
						break;
					case "cmd_ten":
						data = res.data;
						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='dataArea'>" + data +
							"</span></div><br/>";
						data = res.data;
						break;
					case "timeSyncData":

						console.log("data------", res.data);

						shtml_dataType = "<div class='dataTypeArea'>" + dataType + "------------<span class='timet_h'> t_h: " + res.data
							.t_h + "</span>" + "<span class='timet_l'>t_l: " + res.data.t_l + "</span></div><br/>";
						break;
				}
				$("#sendMsgText").append(shtml_dataType);
				
				//滚动条保持最底部
				var div = document.getElementById('sendMsgText');
				div.scrollTop = div.scrollHeight;
			}
		}
	}
}
