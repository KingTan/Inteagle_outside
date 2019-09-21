//进度条变量
var tag = false,
	ox = 0,
	left = 0,
	bgleft = 0,
	bar_width = $(".progress").width();
//延迟移动 定时器
var move_time_out;

var history_data;

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
	
	getHistoryTrackData("001","2019-09-21 00:00:00","2019-09-21 18:00:00");
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
 * 进度条拖动、点击事件
 * 
 */
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
		//百分比
		var hundredPercent = parseInt((left / bar_width) * 100);
		console.log("hundredPercent---------", hundredPercent);
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
		//百分比
		var hundredPercent = parseInt((left / bar_width) * 100);
	}
});

/**
 * @param {Object} dataArray
 * 移动
 */
function move_track(dataArray) {
	/**
	 * 这里涉及到JS的 setTimeOut与循环的闭包问题 ps还有作用域的问题
	 */
	(function() {
		for (var i = 0; i < dataArray.length; i++) {
			(function(ii) {
				move_time_out = setTimeout(
					function() {
						var singleObject = dataArray[ii];
						animation(singleObject.x, singleObject.y, singleObject.t, singleObject.id);
						//设置进度条百分比
						var left_distance = bar_width * (ii + 1) / dataArray.length;
						//百分比
						var hundredPercent = parseInt((left_distance / bar_width) * 100);
						//更改播放按钮样式
						if (hundredPercent > 99) {
							$(".playIcon").attr("data-index", "pause");
							$(".playIcon").attr("src", "img/play_icon.png");
						}
						$('.progress_btn').css('left', left_distance);
						$('.progress_bar').width(left_distance);
					}, 1000 * ii);
			})(i)
		}
	})();
}

/**
 * 点击播放历史轨迹
 */
$(".playIcon").bind("click", function(dom) {
	var data_index = dom.currentTarget.dataset.index;
	if (history_data != null && history_data != "" && history_data != undefined) {
		if (data_index == "pause") {
			dom.currentTarget.dataset.index = "play";
			$(".playIcon").attr("src", "img/pause.png");
			//运动小球
			move_track(history_data);
		} else if (data_index == "play") {
			dom.currentTarget.dataset.index = "pause";
			$(".playIcon").attr("src", "img/play_icon.png");
			console.log("move_time_out-----", move_time_out);
			//清除轨迹移动定时器
			window.clearTimeout("move_time_out");
		}
	}
})

/**
 * 转换时间格式
 * @param {Object} timeStr
 */
function formatTime(timeStr) {
	timeStr = timeStr.replace("年", "-").replace("月", "-").replace("日", "-").replace("时", ":").replace("分", ":");
	return timeStr;
}

/**
 * 查询对应安全帽ID指定时间段内的轨迹数据
 * @param {Object} helmetId
 * @param {Object} beginTime
 * @param {Object} endTime
 */
function getHistoryTrackData(helmetId, beginTime, endTime) {
	$.ajax({
		url: PATH + "checkcenter/getHistoryTrack",
		type: "post",
		data: {
			"helmetId": helmetId,
			"beginTime": beginTime,
			"endTime": endTime
		},
		success: function(res) {
			console.log("res------", res)
			if (res.state == 200) {
				if (res.data.length == 0) {
					layer.ready(function() {
						layer.msg("该时间段内没有历史轨迹数据", {
							icon: 2,
							time: 1000
						}, function() {});
					})
				} else {
					history_data = res.data;
				}
			} else if (res.state == 500) {
				console.log("查询对应安全帽ID指定时间段内的轨迹数据失败...");
			}
		},
		error: function(badRes) {
			console.log("查询对应安全帽ID指定时间段内的轨迹数据....----" + badRes);
		}
	});
}


/**
 * 显示进度条
 * @param {Object} track_begin_time 开始时间
 * @param {Object} track_end_time 结束时间
 */
function showProgressBar(track_begin_time, track_end_time) {
	$(".left_begin_date").text(track_begin_time);
	$(".right_end_date").text(track_end_time);
	//隐藏工具条
	$(".bf-toolbar-bottom").hide();
	$(".progress_bar_area").css("visibility", "visible");

	track_begin_time = formatTime(track_begin_time);
	track_end_time = formatTime(track_end_time);

	//查询数据
	getHistoryTrackData("1", track_begin_time, track_end_time);
}
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
