/**
 * 页面加载事件
 */
$(function() {

	//结束页面加载图标
	$(".loading").fadeOut();
	//显示内容
	$(".foundation").css("visibility", "visible");

	//电子围栏设备集合
	intialBtnGroup();

	var tag = false,
		ox = 0,
		left = 0,
		bgleft = 0,
		bar_width=$(".progress").width();
		
	console.log("bar_width-------",bar_width);	
	$('.progress_btn').mousedown(function(e) {
		ox = e.pageX - left;
		tag = true;
	});
	$(document).mouseup(function() {
		tag = false;
	});
	$('.progress').mousemove(function(e) { //鼠标移动
		if (tag) {
			left = e.pageX - ox;
			if (left <= 0) {
				left = 0;
			} else if (left > bar_width) {
				left = bar_width;
			}
			$('.progress_btn').css('left', left);
			$('.progress_bar').width(left);
			$('.text').html(parseInt((left / bar_width) * bar_width) + '%');
		}
	});
	$('.progress_bg').click(function(e) { //鼠标点击
		if (!tag) {
			bgleft = $('.progress_bg').offset().left;
			left = e.pageX - bgleft;
			if (left <= 0) {
				left = 0;
			} else if (left > bar_width) {
				left = bar_width;
			}
			$('.progress_btn').css('left', left);
			$('.progress_bar').animate({
				width: left
			}, bar_width);
			$('.text').html(parseInt((left / bar_width) * 100) + '%');
		}
	});
})
// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		switch (res.senderType) {
			case 1:
				//私聊
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
 * 显示进度条
 */
function showProgressBar() {}


/**
 * 初始化右边按钮组
 */
function intialBtnGroup(order) {
	//总数据数组
	var btnList = [];
	//优先数据数组
	var orderList = [];
	for (var i = 0; i < 25; i++) {
		var status = "normal";
		if (i % 11 == 0) {
			status = "warning";
		} else if (i % 24 == 0) {
			status = "error";
		} else if (i % 8 == 0) {
			status = "warning_header";
		}

		if (order == status) {
			var btnObj = {
				"id": i + 1,
				"status": status
			};
			orderList.push(btnObj);
		} else {
			var btnObj = {
				"id": i + 1,
				"status": status
			};
			btnList.push(btnObj);
		}
	}
	btnList = orderList.concat(btnList);
	//清空元素
	$(".deviceListArea").html("");
	var shtml = "<div class='layui-btn-container'>";
	for (var i = 0; i < btnList.length; i++) {
		if (i % 8 == 0 && i != 0) {
			shtml += "</div><div class='layui-btn-container'>";
		}
		switch (btnList[i].status) {
			//报警
			case "warning":
				shtml += "<button class='layui-btn sos_btn' type='button' onclick='clickFounBtn(this)' data-index=" + btnList[i].id +
					">" + btnList[i].id + "</button>";
				break;
				//正常
			case "normal":
				shtml += "<button class='layui-btn' type='button' onclick='clickFounBtn(this)'  data-index=" + btnList[i].id +
					">" + btnList[i].id + "</button>";
				break;
				//故障
			case "error":
				shtml += "<button class='layui-btn error_btn' onclick='clickFounBtn(this)'  type='button' data-index=" + btnList[i]
					.id +
					">" + btnList[i].id + "</button>";
				break;
				//预警	
			case "warning_header":
				shtml += "<button class='layui-btn warning_btn' onclick='clickFounBtn(this)'  type='button' data-index=" + btnList[
						i].id +
					">" + btnList[i].id + "</button>";
				break;
		}
	}
	shtml += "</div>";
	$(".device_id_list").append(shtml);
}


/**
 * 点击人员历史轨迹
 */
$(".history_track").bind("click", function(dom) {
	//调用父页面方法
	window.parent.showhisotryTrackModal();
})

/**
 * 点击电子围栏事件
 */
$(".electricFenceText").bind("click", function(dom) {
	//调用父页面的方法
	window.parent.showElectricFenceModal();
})
