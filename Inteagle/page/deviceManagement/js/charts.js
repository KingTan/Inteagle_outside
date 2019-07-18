/**
 * 页面加载事件
 */
$(function() {
	// 初始化右边按钮组
	intialBtnGroup();
})

/**
 * 初始化右边按钮组
 */
function intialBtnGroup() {

	var btnList = [];

	for (var i = 0; i < 80; i++) {

		var status = "normal";

		if (i % 11 == 0) {
			status = "warning";
		} else if (i % 24 == 0) {
			status = "error";
		} else if (i % 8 == 0) {
			status = "warning_header";
		}
		var btnObj = {
			"id": i + 1,
			"status": status
		};
		btnList.push(btnObj);
	}

	var shtml = "<div class='layui-btn-container'>";

	for (var i = 0; i < btnList.length; i++) {
		if (i % 5 == 0 && i != 0) {
			shtml += "</div><div class='layui-btn-container'>";
		}

		switch (btnList[i].status) {
			//报警
			case "warning":
				shtml += "<button class='layui-btn' type='button' style='background-color:" + "rgba(255,0,0,1)" + " ;'>" + btnList[
					i].id + "</button>";
				break;
				//正常
			case "normal":
				shtml += "<button class='layui-btn' type='button' style='background-color:" + "rgba(0,192,11,1)" + " ;'>" + btnList[
					i].id + "</button>";
				break;
				//故障
			case "error":
				shtml += "<button class='layui-btn' type='button' style='background-color:" + "rgba(0,0,0,1)" + " ;'>" + btnList[i]
					.id + "</button>";
				break;
				//预警	
			case "warning_header":
				shtml += "<button class='layui-btn' type='button' style='background-color:" + "rgba(254,212,50,1)" + " ;'>" +
					btnList[i]
					.id + "</button>";
				break;
		}
	}
	shtml += "</div>";
	$(".deviceListArea").append(shtml);
}

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
