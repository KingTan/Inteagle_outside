var id = getParam("id");
if (id != null) {
	//当前选中设备id
	$(".checked_id").text(id);
}


/**
 * 页面加载事件
 */
$(function() {

	//初始化右边设备ID集合
	intialBtnGroup("normal_order");
	
	//初始化时间选择器
	initialLayDate();
	
	//绘制深度水平位移 charts
	inintialEcharts('bigCharts',id, null,true);
	
	
})

/**
 * 初始化 时间选择器
 */
function initialLayDate() {
	//初始化 laydate 对象
	layui.use('laydate', function() {
		var laydate = layui.laydate;
		laydate.render({
			elem: "#deepChartsTime",
			type: "datetime",
			trigger: 'click',
			done: function(value, date) {
				//调用父页面方法
				// parent.openDeepCheckCharts(id,value);
			}
		});
	})
}

/**
 * 初始化右边按钮组
 */
function intialBtnGroup(order) {
	//总数据数组
	var btnList = [];

	//优先数据数组
	var orderList = [];

	for (var i = 0; i < 35; i++) {
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
		if (i % 5 == 0 && i != 0) {
			shtml += "</div><div class='layui-btn-container'>";
		}

		switch (btnList[i].status) {
			//报警
			case "warning":
				shtml += "<button class='layui-btn sos_btn' type='button' data-index=" + btnList[i].id +
					"onclick='clickFounBtn(this)'>" + btnList[i].id + "</button>";
				break;
				//正常
			case "normal":
				shtml += "<button class='layui-btn' type='button' data-index=" + btnList[i].id +
					"onclick='clickFounBtn(this)'>" + btnList[i].id + "</button>";
				break;
				//故障
			case "error":
				shtml += "<button class='layui-btn error_btn' type='button' data-index=" + btnList[i].id +
					"onclick='clickFounBtn(this)'>" + btnList[i].id + "</button>";
				break;
				//预警	
			case "warning_header":
				shtml += "<button class='layui-btn warning_btn' type='button' data-index=" + btnList[i].id +
					"onclick='clickFounBtn(this)'>" + btnList[i].id + "</button>";
				break;
		}
	}
	shtml += "</div>";
	$(".deviceListArea").append(shtml);
}
