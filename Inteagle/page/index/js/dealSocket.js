//处理socket消息
// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		if (res.senderType == 4) {
			console.log("心跳..");
			return;
		} else {
			console.log(res);
			if (res.dataType == "helmet_analysis" && res.data == "-1") {
				showHelmetWarningModal(res.helmet_id);

				//当前报警安全帽ID
				$("#warningHelmetId").val(123);
			}
		}
	}
}

/**
 * 安全帽人脸不匹配报警弹窗
 */
function showHelmetWarningModal(helmet_id) {
	console.log("helmet_id------", helmet_id)
	var html = document.getElementById("helmetWarningModal").innerHTML;
	html=html.replace("[helmet_id]",helmet_id);
	html=html.replace("[currentTime]",getNowFormatDate());
	
	//页面层-自定义
	layer.open({
		type: 1,
		time: 5000,
		title: false,
		closeBtn: 0,
		area: ['555px', '376px'],
		shadeClose: true,
		scrollbar: true,
		resize: false,
		content: html,
		success: function() {
			//初始化 from 对象
			layui.use('form', function() {
				layform = layui.form;
				layform.render();
			});


		}
	});
}
