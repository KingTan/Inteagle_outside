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

	//初始化右边设备ID集合
	intialBtnGroup("normal_order");

	//初始化时间选择器
	initialLayDate();

	//绘制深度水平位移 默认折线图charts
	inintialEcharts('bigCharts', id, null, true);

})


//监听趋势图类型下拉框改变事件
layui.use('form', function() {
	var charts_form = layui.form;
	charts_form.on('select(chartsType)', function(data) {
		var value = data.value;
		if (value == 1) {
			//隐藏热力图
			$(".heatMapArea").css("visibility", "hidden");
			//显示折线图
			$("#bigCharts").fadeIn();
			//绘制深度水平位移 默认折线图charts
			inintialEcharts('bigCharts', id, null, true);

		} else if (value == 2) {
			//隐藏折线图
			$("#bigCharts").fadeOut();
			//显示热力图
			$(".heatMapArea").css("visibility", "visible");
			//绘制热力图
			drawHeatMapX();
			drawHeatMapY();
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
 * 左边菜单栏点击事件
 */
$(".leftBottomList ul li").bind("click", function(dom) {
	console.log(dom);
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

	//切换 渲染不同的 charts图
	switch (checkde_index) {
		case "0":
			//深层水平位移
			break;
		case "1":
			//顶部水平位移
			break;
		case "2":
			//顶部竖向位移
			break;
		case "3":
			//立柱竖向位移
			break;
		case "4":
			//周边管线沉降位移
			break;
	}

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
