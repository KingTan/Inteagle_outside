// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		if (res.senderType == 4) {
			console.log("心跳..");
			return;
		} else {
			console.log(res);
			//判断是否mqtt发送过来的数据
			if (res.messageType == "mqtt") {
				//调接口发送的数据
				if (res.invoke == "send") {

					console.log("send-------------------");

					var socketData = res.data;
					var sendHtml = "<div class='singleMsgArea'>";
					if (socketData.dataType != null && socketData.dataType != undefined) {
						switch (socketData.dataType) {
							//发送的数据
							case "sendTimeSync":
								sendHtml += "<p> hex_str : " + socketData.msg + "</p>" + "<p> topic : " + socketData.topic + "</p>" +
									"<p> cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>"
								break;
						}
					}
					sendHtml += "</div>";
					//发送的数据
					$("#sendDataArea").append(sendHtml);
					//滚动条保持最底部
					var div_send = document.getElementById('sendDataArea');
					div_send.scrollTop = div_send.scrollHeight;
				} else if (res.invoke == "receive") {

					console.log("receive-------------------");

					var socketData = res.data;
					var shtml = "<div class='singleMsgArea'>";
					if (socketData.dataType != null && socketData.dataType != undefined) {
						switch (socketData.dataType) {
							case "TimeSyncData":
								var TimeSyncData = socketData.TimeSyncData;
								shtml += "<p>hex_str : " + socketData.hexStr + "</p>" + "<p>topic : " + socketData.topic + "</p>" +
									"<p>cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>" + "<p>data--------  t_l :" + TimeSyncData.t_l +
									"<span> t_h :" + TimeSyncData.t_h + "</span> </p>";
								break;
							case "IdInfoStruct":
								var IdInfoStruct = socketData.IdInfoStruct;
								shtml += "<p>hex_str : " + socketData.hexStr + "</p>" + "<p>topic : " + socketData.topic + "</p>" +
									"<p>cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>" + "<p>data--------  id :" + IdInfoStruct.id +
									"<span> x :" + IdInfoStruct.x + "</span>" + "<span> y :" + IdInfoStruct.y + "</span>" +
									"<span> t :" + IdInfoStruct.t + "</span>" + "<span> camera_id :" + IdInfoStruct.camera_id + "</span>" +
									"</p>";
								break;
							case "HelmetDiscernStruct":
								var HelmetDiscernStruct = socketData.HelmetDiscernStruct;
								shtml += "<p>hex_str : " + socketData.hexStr + "</p>" + "<p>topic : " + socketData.topic + "</p>" +
									"<p>cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>" + "<p>data--------  id :" + HelmetDiscernStruct.id +
									"</p>";
								break;
							case "DeviceActionStruct":
								var DeviceActionStruct = socketData.DeviceActionStruct;
								shtml += "<p>hex_str : " + res.hexStr + "</p>" + "<p>topic : " + res.topic + "</p>" +
									"<p>cmd : " + res.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" + "</p>" +
									"<p>data--------  action :" + DeviceActionStruct.action +
									"<span> device_type :" + DeviceActionStruct.device_type + "</span>" + "<span> device_type :" +
									DeviceActionStruct.priority + "</span>" + "</p>";
								break;
							case "HelmetSensorDataStruct":
								var HelmetSensorDataStruct = socketData.HelmetSensorDataStruct;
								shtml += "<p>hex_str : " + socketData.hexStr + "</p>" + "<p>topic : " + socketData.topic + "</p>" +
									"<p>cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>" + "<p>data--------  id :" + HelmetSensorDataStruct.id +
									"<span> vol :" + HelmetSensorDataStruct.vol + "</span>" + "<span> temp :" +
									HelmetSensorDataStruct.temp + "</span>" + "<span> helmet_on :" +
									HelmetSensorDataStruct.helmet_on + "</span>" + "</p>";
								break;
							case "MotorStartStruct":
								var MotorStartStruct = socketData.MotorStartStruct;
								shtml += "<p>hex_str : " + socketData.hexStr + "</p>" + "<p>topic : " + socketData.topic + "</p>" +
									"<p>cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>" + "<p>data--------  fre :" + MotorStartStruct.fre +
									"<span> dir :" + MotorStartStruct.dir + "</span>" + "<span> duty :" +
									MotorStartStruct.duty + "</span>" + "<span> hold_time :" + MotorStartStruct.hold_time + "</span>" +
									"<span> steps :" + MotorStartStruct.steps + "</span>" + "<span> steps_hold :" + MotorStartStruct.steps_hold +
									"</span>" +
									"</p>";
								break;
							case "MotorStopStruct":
								var MotorStartStruct = socketData.MotorStartStruct;
								shtml += "<p>hex_str : " + socketData.hexStr + "</p>" + "<p>topic : " + socketData.topic + "</p>" +
									"<p>cmd : " + socketData.cmd_ten + "<span class='cmdData'> cmd_value :" + socketData.cmd_value + "</span>" +
									"</p>";
								break;
						}
					}
					shtml += "</div>";
					//接收的数据
					$("#sendMsgText").append(shtml);
					//滚动条保持最底部
					var div = document.getElementById('sendMsgText');
					div.scrollTop = div.scrollHeight;
				}
			}
		}
	}
}
