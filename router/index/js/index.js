/**
 * 页面加载事件
 */
$(function() {
	//验证是否登录
	check_is_login();
	//初始化layui组件
	initital_lay();
})

/**
 * 头部导航条菜单 点击事件
 */
$(".single_nav a").bind("click", function(dom) {
	var index = dom.currentTarget.dataset.index;
	//iframe跳转路由
	var iframePath;
	//改变选中样式
	$(".single_nav a").removeClass("check_nav");
	$(".single_nav a").promise().done(function(){
		dom.currentTarget.className="check_nav";
	})
	switch (index) {
		case "project":
			iframePath = "../projectManagement/projectManagement.html";
			break;
		case "foundation":
			iframePath = "../foundation/foundation.html";
			break;
		case "device":
			iframePath = "../deviceManagement/helmetManagement.html?path=router";
			break;
		case "system":
			iframePath = "../systemManagement/basicInfo.html";
			break;
	}
	$("#mainFrame").attr("src", iframePath);
})

//初始化layui组件
function initital_lay() {
	layui.use(['element', 'form', 'laydate'], function() {
		var laydate = layui.laydate,
			element = layui.element,
			layform = layui.form;
		laydate.render({
			elem: "#active_begin_time",
			type: "time",
			format: "H时m分s秒"
		});
		laydate.render({
			elem: "#active_end_time",
			type: "time",
			format: "H时m分s秒"
		});
		laydate.render({
			elem: "#track_begin_time_val",
			type: "datetime",
			format: "yyyy年MM月dd日 H时m分s秒"
		});
		laydate.render({
			elem: "#track_end_time_val",
			type: "datetime",
			format: "yyyy年MM月dd日 H时m分s秒"
		});
	});
}

/**
 * 显示人员历史轨迹弹窗
 */
function showhisotryTrackModal() {
	//显示蒙层
	$(".black_Modal").show();
	//显示弹窗
	$(".history_track_modal").show();
	//移除动画
	$(".history_track_modal").removeClass("fadeOutLeft");
	//添加动画
	$(".history_track_modal").addClass("fadeInLeft");
}
/**
 * 点击关闭历史轨迹弹窗
 */
$(".close_track_warning").bind("click", function(dom) {
	//移除动画
	$(".history_track_modal").removeClass("fadeInLeft");
	//添加动画
	$(".history_track_modal").addClass("fadeOutLeft");
	//显示弹窗
	$(".history_track_modal").hide(500);
	//弹窗隐藏完全之后执行的事件
	$(".history_track_modal").promise().done(function(arg) {
		//关闭蒙层
		$(".black_Modal").hide();
	})
})

/**
 * 历史轨迹点击查看
 */
$(".see_track_btn").bind("click", function(dom) {
	var helmet_id = $(".helmet_id").val();
	var track_begin_time_val = $("#track_begin_time_val").val();
	var track_end_time_val = $("#track_end_time_val").val();
	if (!notNull(helmet_id)) {
		layer.ready(function() {
			layer.msg("请输入安全帽ID", {
				icon: 2,
				time: 1000
			}, function() {
				$(".helmet_id").focus();
			});
		})
		return;
	}
	if (!notNull(track_begin_time_val)) {
		layer.ready(function() {
			layer.msg("请输入开始时间", {
				icon: 2,
				time: 1000
			}, function() {
				$(".track_begin_time_val").focus();
			});
		})
		return;
	}
	if (!notNull(track_end_time_val)) {
		layer.ready(function() {
			layer.msg("请输入结束时间", {
				icon: 2,
				time: 1000
			}, function() {
				$(".track_end_time_val").focus();
			});
		})
		return;
	}
	//关闭弹窗
	$(".close_track_warning").click();
	$(".close_track_warning").promise().done(function() {
		//调用子页面的方法-显示进度条
		//表示获取了嵌入在iframe中的子页面的window对象。  []将JQuery对象转成DOM对象，用DOM对象的contentWindow获取子页面window对象。
		var childWindow = $("#mainFrame")[0].contentWindow;
		//调用子页面中的subFunction方法。
		childWindow.showProgressBar(track_begin_time_val, track_end_time_val);
	})
})

/**
 * 历史轨迹弹窗重置
 */
$(".reset_track_btn").bind("click", function(dom) {
	$(".helmet_id").val("");
	$("#track_begin_time_val").val("");
	$("#track_end_time_val").val("");
})

/**
 * 显示电子围栏弹窗
 */
function showElectricFenceModal() {
	//显示蒙层
	$(".black_Modal").show();
	//显示弹窗
	$(".electronic_fence_Modal").show();
	//移除动画
	$(".electronic_fence_Modal").removeClass("fadeOutLeft");
	//添加动画
	$(".electronic_fence_Modal").addClass("fadeInLeft");
}

/**
 * 关闭电子围栏弹窗
 */
$(".close_fence_btn").bind("click", function() {
	//移除动画
	$(".electronic_fence_Modal").removeClass("fadeInLeft");
	//添加动画
	$(".electronic_fence_Modal").addClass("fadeOutLeft");
	//显示弹窗
	$(".electronic_fence_Modal").hide(500);
	//弹窗隐藏完全之后执行的事件
	$(".electronic_fence_Modal").promise().done(function(arg) {
		//关闭蒙层
		$(".black_Modal").hide();
	})
})

/**
 * 基坑监测 表格弹窗
 */
/**
 * @param {Object} checked_id
 * @param {Object} checked_time
 * 显示深层水平位移 charts 表格弹窗
 */
function openDeepCheckCharts(checked_id, checked_time) {
	var html = document.getElementById("checkTimeChartsModal").innerHTML;
	html = html.replace("[checked_id]", checked_id);
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 2,
		area: ['80%', '70%'],
		shadeClose: true,
		scrollbar: false,
		resize: false,
		content: html,
		success: function() {
			//渲染layui表单元素_下拉框
			form.render()
			//初始化 大Echarts
			drawChecekedCharts("checkedBigCharts");
			//热力图
			// drawHeatMapX_checked();
			// drawHeatMapY_checked();

			//监听趋势图类型下拉框改变事件
			layui.use('form', function() {
				var charts_form = layui.form;
				charts_form.on('select(chartsType_checked)', function(data) {
					var value = data.value;
					if (value == 1) {
						//隐藏热力图
						$(".heatMapArea").css("visibility", "hidden");
						//显示折线图
						$("#checkedBigCharts").fadeIn();
						//绘制深度水平位移 默认折线图charts
						drawChecekedCharts("checkedBigCharts");

					} else if (value == 2) {
						//隐藏折线图
						$("#checkedBigCharts").fadeOut();
						//显示热力图
						$(".heatMapArea").css("visibility", "visible");
						$(".heatMapArea").promise().done(function(){
							//绘制速率图
							draw_checked_deep_charts();
						})
						// //绘制热力图
						// drawHeatMapX_checked();
						// drawHeatMapY_checked();
					}
				})
			})
		}
	});
}


/**
 * 电机运行时间-创建事件
 */
$(".create_runtime_btn").bind("click", function() {
	//目标运行时间
	var target_time = $(".target_time").val();
	//目标运行间隔
	var target_period = $(".target_period").val();

	if (!notNull(target_time)) {
		layer.ready(function() {
			layer.msg("请输入目标运行时间", {
				icon: 2,
				time: 1000
			}, function() {
				$(".target_time").focus();
			});
		})
		return;
	}
	if (!notNull(target_period)) {
		layer.ready(function() {
			layer.msg("请输入目标运行间隔", {
				icon: 2,
				time: 1000
			}, function() {
				$(".target_period").focus();
			});
		})
		return;
	}
	layer.ready(function() {
		layer.msg("创建成功", {
			icon: 1,
			time: 1000
		}, function() {
			//清空输入框的值
			$(".target_time").val("");
			$(".target_period").val("");
			//调用关闭事件
			$(".close_runTime").click();
		});
	})
})
/**
 * 电机运行时间弹窗-重置事件
 */
$(".reset_runtime_btn").bind("click", function() {
	//清空输入框的值
	$(".target_time").val("");
	$(".target_period").val("");
})

/**
 * 运行时间弹窗--点击立即运行按钮事件
 */
$(".run_btn").bind("click", function(dom) {
	//修改电机状态
	$(".device_status").text("运行中");
})

/**
 * @param {Object} id
 * 修改运行时间ID的值
 */
function change_runtime_id(id) {
	$(".device_id").text(id);
}

/**
 * @param {Object} id
 * 修改电机的运行状态
 */
function change_runtime_status(id) {
	$(".device_status").text("正在等待");
}


/**
 * 关闭运行时间弹窗
 */
$(".close_runTime").bind("click", function(dom) {
	//移除动画
	$(".new_runTimeModal").removeClass("fadeInLeft");
	//添加动画
	$(".new_runTimeModal").addClass("fadeOutLeft");
	//显示弹窗
	$(".new_runTimeModal").hide(500);
	//弹窗隐藏完全之后执行的事件
	$(".new_runTimeModal").promise().done(function(arg) {
		//关闭蒙层
		$(".black_Modal").hide();
	})
})

/**
 * 运行时间弹窗
 */
function runtimeSetModal() {
	//显示蒙层
	$(".black_Modal").show();
	//显示弹窗
	$(".new_runTimeModal").show();
	//移除动画
	$(".new_runTimeModal").removeClass("fadeOutLeft");
	//添加动画
	$(".new_runTimeModal").addClass("fadeInLeft");
}


/**
 * 报警值弹窗
 */
function showWarnValModal() {
	//显示蒙层
	$(".black_Modal").show();
	//显示弹窗
	$(".new_warningModal").show();
	//移除动画
	$(".new_warningModal").removeClass("fadeOutLeft");
	//添加动画
	$(".new_warningModal").addClass("fadeInLeft");
}
/**
 * 关闭设定报警值弹窗
 */
$(".close_warning").bind("click", function(dom) {
	//移除动画
	$(".new_warningModal").removeClass("fadeInLeft");
	//添加动画
	$(".new_warningModal").addClass("fadeOutLeft");
	//显示弹窗
	$(".new_warningModal").hide(500);
	//弹窗隐藏完全之后执行的事件
	$(".new_warningModal").promise().done(function(arg) {
		//关闭蒙层
		$(".black_Modal").hide();
	})
})
/**
 * 设定报警值
 */
$(".set_warning_btn").bind("click", function(dom) {
	var pre_waring_value = $(".pre_waring_value").val();
	var waring_value = $(".waring_value").val();
	var speed_waring_value = $(".speed_waring_value").val();

	console.log("pre_waring_value-------", pre_waring_value);
	console.log("waring_value---------", waring_value);
	console.log("speed_waring_value-------", speed_waring_value);

	if (!notNull(pre_waring_value)) {
		layer.ready(function() {
			layer.msg("请输入预警值", {
				icon: 2,
				time: 1000
			}, function() {
				$(".pre_waring_value").focus();
			});
		})
		return;
	}
	if (!notNull(waring_value)) {
		layer.ready(function() {
			layer.msg("请输入报警值", {
				icon: 2,
				time: 1000
			}, function() {
				$(".waring_value").focus();
			});
		})
		return;
	}
	if (!notNull(speed_waring_value)) {
		layer.ready(function() {
			layer.msg("请输入速率报警值", {
				icon: 2,
				time: 1000
			}, function() {
				$(".speed_waring_value").focus();
			});
		})
		return;
	}
	layer.ready(function() {
		layer.msg("设定成功", {
			icon: 1,
			time: 1000
		}, function() {
			//清空输入框的值
			$(".pre_waring_value").val("");
			$(".waring_value").val("");
			$(".speed_waring_value").val("");
			//调用关闭事件
			$(".close_warning").click();
		});
	})
})
/**
 * 重置报警值
 */
$(".reset_warning_btn").bind("click", function(dom) {
	//清空输入框的值
	$(".pre_waring_value").val("");
	$(".waring_value").val("");
	$(".speed_waring_value").val("");
})


/**
 * 跳转到初始首页
 */
$(".middileLogotextArea").bind("click", function() {
	//移除导航栏所有选中状态
	$(".navList ul li").removeClass("check_nav");
	//控制右边iframe路径
	$("#mainFrame").attr("src", "curPage.html");
	//移除所有一级、二级菜单的选中样式
	$(".navList ul li a").removeClass("check_nav");
	$(".navList ul li dl dd").removeClass("check_nav");
})

/**
 * 二级菜单点击事件
 */
$(".navList ul li dl dd").bind("click", function(dom) {
	//当前选中节点下标
	var checkde_index = dom.currentTarget.dataset.index;
	//根据下标改变Iframe路径
	changeIframePath(checkde_index);

	//当前节点
	var target = dom.currentTarget;

	//移除所有二级菜单的选中样式
	$(".navList ul li dl dd").removeClass("check_nav");
	//当前节点添加选中样式
	$(target).addClass("check_nav");

	//移除所有一级菜单的选中样式
	$(".navList ul li a").removeClass("check_nav");
	//修改二级菜单上一级菜单的样式
	$(target).parent().siblings("a").addClass("check_nav");
})

/**
 * 导航栏点击事件(一级菜单)
 */
$(".navList ul li").bind("click", function(dom) {
	//当前选中节点下标
	var checkde_index = dom.currentTarget.dataset.index;
	//当前选中节点状态
	var checkde_status = dom.currentTarget.dataset.checked;
	//移除所有选中状态
	// $(".navList ul li").removeClass("check_nav");
	//当前节点选中
	// dom.currentTarget.className="check_nav";

})
/**
 * 头部导航条事件(弃用)
 */
$(".navBtn").bind("click", function(dom) {
	var data_index = dom.currentTarget.dataset.index;
	//iframe跳转路径
	var iframePath;
	$(".left_nav").removeClass("checked_left_nav");
	$(".right_nav").removeClass("checked_right_nav");
	if (data_index == "foundation") {
		//基坑监测
		$(".left_nav").addClass("checked_left_nav");
		iframePath = "../foundation/foundation.html";
	} else if (data_index = "device") {
		//设备管理
		$(".right_nav").addClass("checked_right_nav");
		iframePath = "../deviceManagement/helmetManagement.html?path=router";
	}
	$("#mainFrame").attr("src", iframePath);
})
/**
 * 获取路由(弃用)
 */
function getRouterPath() {
	var path = getParam("path");
	//iframe跳转路径
	var iframePath;
	if (path == "foundation") {
		//基坑监测
		$(".left_nav").addClass("checked_left_nav");
		iframePath = "../foundation/foundation.html";
	} else if (path = "device") {
		//设备管理
		$(".right_nav").addClass("checked_right_nav");
		iframePath = "../deviceManagement/helmetManagement.html?path=router";
	}
	$("#mainFrame").attr("src", iframePath);
}


/**
 * 验证是否登录
 */
function check_is_login() {
	var session_login_user = sessionStorage.getItem("LoginUserInfo");
	if (session_login_user != null && session_login_user != undefined && session_login_user != "") {
		var loginUser = JSON.parse(session_login_user);
		//用户名
		$(".loginUserName").text(loginUser.userName);
		//头像
		$(".headShotIcon").attr("src", loginUser.headPortrait);
	} else {
		window.location.href = "../login/login.html";
	}
}
/**
 * @param {Object} checkde_index
 *  改变iframe路径
 */
function changeIframePath(checkde_index) {
	//父页面iframe跳转路径
	var iframePath = "";
	switch (checkde_index) {
		case "0-1":
			//项目资料
			break;
		case "0-2":
			//项目单位
			break;
		case "1-1":
			//企业管理	
			break;
		case "1-2":
			//部门管理
			break;
		case "2-1":
			//人员实时定位
			iframePath = "../helmetPosition/helmetPostion.html";
			break;
		case "2-2":
			//基坑监测
			iframePath = "../foundation/foundation.html";
			break;
		case "3-1":
			//建筑工人管理
			break;
		case "3-2":
			//管理工人管理
			break;
		case "3-3":
			//合同管理
			break;
		case "4-1":
			//工资管理
			break;
		case "4-2":
			//凭证管理
			break;
		case "5-1":
			//考勤规则
			break;
		case "5-2":
			//考勤记录
			break;
		case "7-1":
			//规划安全事项
			break;
		case "7-2":
			//审核检查情况
			break;
		case "8-1":
			//路由器
			iframePath = "../deviceManagement/helmetManagement.html?path=router";
			break;
		case "8-2":
			//摄像头
			iframePath = "../deviceManagement/helmetManagement.html?path=camera";
			break;
		case "8-3":
			//安全帽
			iframePath = "../deviceManagement/helmetManagement.html?path=helmet";
			break;
		case "8-4":
			//基坑电机
			iframePath = "../deviceManagement/helmetManagement.html?path=electric";
			break;
		case "9-1":
			//基本信息
			iframePath = "../systemManagement/basicInfo.html";
			break;
		case "9-2":
			//账号安全
			iframePath = "../systemManagement/saftyCount.html";
			break;
	}
	if (iframePath != "" && iframePath != undefined) {
		// console.log("iframePath----------", iframePath);
		//控制右边iframe路径
		$("#mainFrame").attr("src", iframePath);
	}
}
