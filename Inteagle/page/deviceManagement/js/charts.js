var id = getParam("id");
var rate = "x";

//初始化数据
var initialData = [
	["2019/07/22 08:00:00", 116],
	["2019/07/22 08:20:00", 120],
	["2019/07/22 10:00:00", 135],
	["2019/07/22 11:00:00", 140],
	["2019/07/22 12:00:00", 300]
];
var rightChartsData = [
	["07-18", 0.05],
	["07-19", 0.12],
	["07-20", 0.23],
	["07-21", 0.35],
	["07-22", -0.05],
	["07-23", -0.18],
	["07-24", -0.32]
]

//获得页面跳转路由
var router = getParam("router");

/**
 * 页面加载事件
 */
$(function() {
	
	// 初始化右边按钮组
	intialBtnGroup("normal_1");
	
	//初始化 大Echarts
	inintialEcharts(id, rate, initialData);
	
	// initHeatCharts();
	
	//初始化 左下Echarts
	// inintialSLEcharts(initialData);

	// switch (router) {
	// 	case "foundation":
	// 		//初始化 右下canvas画布
	// 		drawRate();
	// 		break;
	// 	case "deepMove":
	// 		//初始化 右下canvas画布
	// 		drawRate();
	// 		break;
	// 	case "topLevel":
	// 		//初始化 右下Echarts
	// 		inintialRightSLEcharts(rightChartsData);
	// 		break;
	// 	case "topVertical":
	// 		//初始化 右下Echarts
	// 		inintialRightSLEcharts(rightChartsData);
	// 		break;
	// }
})
//初始化 from 对象
layui.use('form', function() {
	form = layui.form;
	//渲染表单对象
	form.render();
	//监听设备ID 下拉框改变事件
	form.on('select(chooseOrderSel)', function(data) {
		var orderNum = data.value;
		var order = "";
		switch (orderNum) {
			case "1":
				order = "normal_1";
				break;
			case "2":
				order = "warning";
				break;
			case "3":
				order = "warning_header";
				break;
			case "4":
				order = "error";
				break;
		}
		//渲染按钮组
		intialBtnGroup(order);

	});
})

/**
 * @param {Object} e
 * 点击基坑按钮
 */
function clickFounBtn(e) {
	var choose_id = $(e).attr("data-index");
	//初始化 大Echarts
	inintialEcharts(choose_id, rate, initialData);
	//初始化 左下Echarts
	inintialSLEcharts(initialData);
	
	console.log(router);
	
	switch (router) {
		case "foundation":
			//初始化 右下canvas画布
			drawRate();
			break;
		case "deepMove":
			//初始化 右下canvas画布
			drawRate();
			break;
		case "topLevel":
			//初始化 右下Echarts
			inintialRightSLEcharts(rightChartsData);
			break;
		case "topVertical":
			//初始化 右下Echarts
			inintialRightSLEcharts(rightChartsData);
			break;
	}
}



/**
 * 初始化右边按钮组
 */
function intialBtnGroup(order) {
	//总数据数组
	var btnList = [];

	//优先数据数组
	var orderList = [];

	for (var i = 0; i < 80; i++) {
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
				shtml += "<button class='layui-btn' type='button' data-index=" + btnList[i].id +
					" onclick='clickFounBtn(this)' style='background-color:" + "rgba(255,0,0,1)" + " ;'>" + btnList[
						i].id + "</button>";
				break;
				//正常
			case "normal":
				shtml += "<button class='layui-btn' type='button' data-index=" + btnList[i].id +
					" onclick='clickFounBtn(this)' style='background-color:" + "rgba(0,192,11,1)" + " ;'>" + btnList[
						i].id + "</button>";
				break;
				//故障
			case "error":
				shtml += "<button class='layui-btn' type='button' data-index=" + btnList[i].id +
					" onclick='clickFounBtn(this)' style='background-color:" + "rgba(0,0,0,1)" + " ;'>" + btnList[i]
					.id + "</button>";
				break;
				//预警	
			case "warning_header":
				shtml += "<button class='layui-btn' type='button' data-index=" + btnList[i].id +
					" onclick='clickFounBtn(this)' style='background-color:" + "rgba(254,212,50,1)" + " ;'>" +
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
