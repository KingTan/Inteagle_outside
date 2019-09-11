/**
 * 页面加载事件
 */
$(function() {
	//验证是否登录
	// check_is_login();

	//初始化layui组件
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
	});
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
			drawHeatMapX_checked();
			drawHeatMapY_checked();

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
						//绘制热力图
						drawHeatMapX_checked();
						drawHeatMapY_checked();
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
	
	console.log("pre_waring_value-------",pre_waring_value);
	console.log("waring_value---------",waring_value);
	console.log("speed_waring_value-------",speed_waring_value);
	
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
			break;
		case "8-2":
			//摄像头
			break;
		case "8-3":
			//安全帽
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
