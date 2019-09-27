var id = getParam("id");
if (id != null) {
	//当前选中设备id
	$(".checked_id").text(id);
	//调用父页面方法、修改运行时间弹窗的ID值
	window.parent.change_runtime_id(id);
} else {
	id = "1";
}
//时间选择器选择的时间
var checked_time = "";

/**
 * 页面加载事件
 */
$(function() {
	//获取路由 设置左边选中菜单
	check_left_menu(getParam("path"));
	//初始化时间选择器
	initialLayDate();
	//绘制图表
	drwaCharts();
})

/**
 * 获取路由 设置左边选中菜单
 */
function check_left_menu(router) {
	var index;
	switch (router) {
		case "deep":
			index = 1;
			break;
		case "top_horizontal":
			index = 2;
			break;
		case "top_vertical":
			index = 3;
			break;
		case "box_vertical":
			index = 4;
			break;
		case "ground_water":
			index = 5;
			break;
		case "around_pipe":
			index = 6;
			break;
	}
	$(".leftBottomList ul li:nth-child(" + index + ")").addClass("checked_option");
	$(".leftBottomList ul li:nth-child(" + index + ")").click();
}
/**
 * 绘制图表
 */
function drwaCharts() {
	//深度水平位移 
	inintialEcharts('bigCharts', id, null, false);
	//顶部水平位移
	draw_top_charts(null);
	//顶部竖向位移
	draw_top_vertical_charts(null);
	//地下水位
	draw_water_charts(null);
}

/**
 * 左边菜单栏点击事件
 */
$(".leftBottomList ul li").bind("click", function(dom) {
	//清空其他的选中样式
	$(".leftBottomList ul li").removeClass("checked_option");
	$(".leftBottomList ul li").attr("data-checked", "false");
	//自身添加选中样式
	var target = dom.currentTarget;
	if (target) {
		$(target).addClass("checked_option");
		dom.currentTarget.dataset.checked = true;
	}
	//当前选中节点下标
	var checkde_index = dom.currentTarget.dataset.index;
	//当前节点选中状态
	var checked_status = dom.currentTarget.dataset.checked;

	//下拉框的图标类型
	var select_dataSet;
	$("#select_charts_type").val("1");
	if (form != null && form != undefined) {
		$("#select_charts_type").promise().done(function() {
			form.render("select");
		})
	}
	//切换 渲染不同的 charts图
	switch (checkde_index) {
		case "0":
			//深层水平位移
			select_dataSet = "deep";
			//初始化右边设备ID集合
			intialBtnGroup("normal_order","deep");
			//隐藏其他charts图
			$(".heatMapArea").css("visibility", "hidden");
			$(".top_heatMapArea").css("visibility", "hidden");
			$(".vertical_bar").css("visibility", "hidden");
			$(".top_vertical_charts").css("visibility", "hidden");
			$(".top_horizontal_charts").css("visibility", "hidden");
			$(".ground_water_charts").css("visibility", "hidden");
			//显示选择框
			$(".time_chosen_area").css("visibility", "visible");
			//显示
			$(".deep_charts").css("visibility", "visible");
			$("#bigCharts").css("display", "block");
			break;
		case "1":
			//顶部水平位移
			select_dataSet = "top_horizontal";
			//初始化右边设备ID集合
			intialBtnGroup("normal_order","deep");
			//隐藏其他charts图
			$(".deep_charts").css("visibility", "hidden");
			$(".heatMapArea").css("visibility", "hidden");
			$(".top_heatMapArea").css("visibility", "hidden");
			$(".vertical_bar").css("visibility", "hidden");
			$(".deep_charts").css("visibility", "hidden");
			$(".ground_water_charts").css("visibility", "hidden");
			$(".top_vertical_charts").css("visibility", "hidden");
			//显示选择框
			$(".time_chosen_area").css("visibility", "visible");
			$(".top_horizontal_charts").css("visibility", "visible");
			$("#horizontal_charts").css("display", "block");
			break;
		case "2":
			//顶部竖向位移
			select_dataSet = "top_vertical";
			//初始化右边设备ID集合
			intialBtnGroup("normal_order","deep");
			//隐藏其他charts图
			$(".deep_charts").css("visibility", "hidden");
			$(".heatMapArea").css("visibility", "hidden");
			$(".top_heatMapArea").css("visibility", "hidden");
			$(".vertical_bar").css("visibility", "hidden");
			$(".top_horizontal_charts").css("visibility", "hidden");
			$(".ground_water_charts").css("visibility", "hidden");
			//显示选择框
			$(".time_chosen_area").css("visibility", "visible");
			$(".top_vertical_charts").css("visibility", "visible");
			$("#vertical_charts").css("display", "block");
			break;
		case "3":
			//立柱竖向位移
			break;
		case "4":
			//地下水平位移
			//初始化右边设备ID集合
			intialBtnGroup("normal_order","ground_water");
			select_dataSet = "ground_water";
			//隐藏选择框
			$(".time_chosen_area").css("visibility", "hidden");
			//隐藏其他charts图
			$(".deep_charts").css("visibility", "hidden");
			$(".heatMapArea").css("visibility", "hidden");
			$(".top_heatMapArea").css("visibility", "hidden");
			$(".vertical_bar").css("visibility", "hidden");
			$(".top_horizontal_charts").css("visibility", "hidden");
			$(".top_vertical_charts").css("visibility", "hidden");
			$(".ground_water_charts").css("visibility", "visible");
			$("#water_charts").css("display", "block");
			break;
		case "5":
			//周边管线沉降位移
			break;
	}
	$("#select_charts_type").attr("data-type", select_dataSet);
})


//监听趋势图类型下拉框改变事件
layui.use('form', function() {
	var charts_form = layui.form;
	charts_form.on('select(chartsType)', function(data) {
		var value = data.value;
		var charts_type = data.elem.dataset.type;

		if (charts_type == "deep") {
			//深层水平位移
			if (value == 1) {
				//隐藏热力图
				$(".heatMapArea").css("visibility", "hidden");
				//显示折线图
				$("#bigCharts").fadeIn();
				//绘制深度水平位移 默认折线图charts
				inintialEcharts('bigCharts', id, null, false);
			} else if (value == 2) {
				//隐藏折线图
				$("#bigCharts").fadeOut();
				//显示热力图
				$(".heatMapArea").css("visibility", "visible");
				//绘制深度水平位移速率图
				drwa_deep_speed_charts();
				// //绘制热力图
				// drawHeatMapX();
				// drawHeatMapY();
			}
		} else if (charts_type == "top_horizontal") {
			//顶部水平位移
			if (value == 1) {
				//隐藏速率图
				$(".top_heatMapArea").css("visibility", "hidden");
				//显示位移图
				$("#horizontal_charts").fadeIn();
			} else if (value == 2) {
				//隐藏位移图
				$("#horizontal_charts").fadeOut();
				//显示速率图
				$(".top_heatMapArea").css("visibility", "visible");
				//绘制速率图
				$(".top_heatMapArea").promise().done(function() {
					//绘制速率图
					draw_top_speed_charts();
				})
			}
		} else if (charts_type == "top_vertical") {
			//顶部水平位移
			if (value == 1) {
				//隐藏速率图
				$(".vertical_bar").css("visibility", "hidden");
				//显示位移图
				$("#vertical_charts").fadeIn();
			} else if (value == 2) {
				//隐藏位移图
				$("#vertical_charts").fadeOut();
				//显示速率图
				$(".vertical_bar").css("visibility", "visible");
				//绘制速率图
				$(".vertical_bar").promise().done(function() {
					//绘制速率图
					draw_vertical_speed_charts();
				})
			}
		}
	})
})



/**
 * @param {Object} index
 * 点击工具栏(报警值、运行时间、导出报表)
 */
$(".optionText").bind("click", function(dom) {
	var index = dom.currentTarget.dataset.index;
	switch (index) {
		case "0":
			//调用父页面方法
			parent.showWarnValModal();
			break;
		case "1":
			//调用父页面方法
			parent.runtimeSetModal();
			break;
		case "2":
			//导出报表
			export_foundation_data(id);
			break;
	}
})

/**
 * @param {Object} id
 * 导出基坑数据
 */
function export_foundation_data(id) {
	var formData = new FormData();
	formData.append("id", id);
	let form = $("<form>"); //创建form标签
	form.attr("style", "display:none");
	form.attr("method", "post"); //设置请求方式
	form.attr("action", PATH + "excel/exportFoundation", ); //action属性设置请求路径
	$("body").append(form); //页面添加form标签
	let input1 = $("<input>") //创建input标签
	input1.attr("type", "hidden") //设置隐藏域
	input1.attr("name", "data") //设置发送后台数据的参数名
	input1.attr("value", formData);
	form.append(input1);
	form.submit(); //表单提交即可下载！
}

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
			change: function(value, date, endDate) {
				var lay_date_type = $('.laydate-btns-time').attr('lay-type');
				if (lay_date_type === 'datatime') {
					$('.laydate-btns-time').css('visibility', 'hidden')
				} else {
					//选择日期后 调用点击选择时间事件
					$(".laydate-btns-time").click();
					$(".laydate-btns-time").click(function() {
						$(this).css('visibility', 'hidden')
					});
					//显示选择日期按钮
					$(".laydate-btns-time").css("visibility", "visible")
				}
			},
			done: function(value, date) {
				checked_time = value;
			}
		});
	})
}
/**
 * 点击查询按钮
 */
$("#check_chart_btn").bind("click", function(dom) {
	if (checked_time != "" && checked_time != undefined && checked_time != null) {
		//调用父页面方法
		parent.openDeepCheckCharts(id, checked_time);
	} else {
		layer.msg("请选择时间")
	}
})

/**
 * @param {Object} dom
 * 右边按钮点击事件
 */
function clickFounBtn(e) {
	//当前点击电机的下标
	var data_index = $(e).attr("data-index");
	id = data_index;
	$(".checked_id").text(data_index);
	//调用父页面方法、修改运行时间弹窗的ID值
	window.parent.change_runtime_id(data_index);
	//修改电机运行状态
	window.parent.change_runtime_status(data_index);
}

/**
 * 初始化右边按钮组
 */
function intialBtnGroup(order,type) {
	//总数据数组
	var btnList = [];
	//优先数据数组
	var orderList = [];
	
	//根据图表类型 生成不同的监测点
	var ponit_num;
	if(type=="deep"||type=="top_vertical"){
		ponit_num=30;
	}else if(type=="ground_water"){
		ponit_num=15;
	}
	for (var i = 0; i < ponit_num; i++) {
		var status = "normal";
		if (i % 7 == 0) {
			status = "warning";
		} else if (i % 11 == 0) {
			status = "error";
		} else if (i % 13 == 0) {
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
	$(".deviceListArea").append(shtml);
}
