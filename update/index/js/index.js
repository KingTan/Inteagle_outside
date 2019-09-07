/**
 * 页面加载事件
 */
$(function() {
	//验证是否登录
	check_is_login();

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
	$(".black_Modal").show();
	$(".electronic_fence_Modal").show(200);
}

/**
 * 关闭电子围栏弹窗
 */
$(".close_fence_btn").bind("click", function() {
	$(".black_Modal").hide();
	$(".electronic_fence_Modal").hide(200);
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
 * 运行时间弹窗--点击立即运行按钮事件
 */
$(".run_btn").bind("click",function(dom){
	//修改电机状态
	$(".device_status").text("运行中");
})


/**
 * 关闭运行时间弹窗
 */
$(".close_runTime").bind("click",function(dom){
	//关闭蒙层
	$(".black_Modal").hide();
	//移除动画
	$("new_runTimeModal").removeClass("fadeInLeft");
	//添加动画
	$(".new_runTimeModal").addClass("fadeOutLeft");
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
	
// 	var html = document.getElementById("runtimeSetModal").innerHTML;
// 	var width;
// 	var height;
// 	if (isBigScreen) {
// 		width = "35%";
// 		height = "25%";
// 	} else {
// 		width = "45%";
// 		height = "30%";
// 	}
// 
// 	//页面层-自定义
// 	layer.open({
// 		type: 1,
// 		title: false,
// 		closeBtn: 2,
// 		area: [width, height],
// 		shadeClose: true,
// 		scrollbar: true,
// 		resize: false,
// 		content: html,
// 		success: function() {
// 			//初始化 from 对象
// 			layui.use('form', function() {
// 				layform = layui.form;
// 				layform.render();
// 			})
// 		}
// 	});
}


/**
 * 报警值弹窗
 */
function showWarnValModal() {
	var html = document.getElementById("warnValModal").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 2,
		area: ['35%', '50%'],
		shadeClose: true,
		scrollbar: true,
		resize: false,
		content: html,
		success: function() {
			//初始化 from 对象
			layui.use('form', function() {
				layform = layui.form;
				layform.render();
			})
		}
	});
}



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
