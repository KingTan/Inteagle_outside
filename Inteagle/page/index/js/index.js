//layui form组件
var layform;
//消息窗点击显示次数
var clickNum = 1;

/**
 * 页面加载事件
 */
$(function() {

	//判断是否登录
	// getLoginUserInfo();

	//canvas绘制拉托工具
	canvasTool();
	//页面加载时 切换到首页
	onLoadShow();
})

/**
 * 获取登录对象
 */
function getLoginUserInfo() {
	var LocalUser = sessionStorage.getItem("LoginUserInfo");
	console.log("LocalUser--------", LocalUser);
	if (LocalUser == undefined || LocalUser == null) {
		window.location.href = "../login/login.html";
	}
}


/**
 * @param {Object} checked_id
 * @param {Object} checked_time
 * 显示深层水平位移 charts 表格弹窗
 */
function openDeepCheckCharts(checked_id,checked_time){
	var html = document.getElementById("checkTimeChartsModal").innerHTML;
	html=html.replace("[check_id]", checked_id);
	
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['730px', '70%'],
		shadeClose: true,
		scrollbar: false,
		resize: false,
		content: html,
		success: function() {
			//初始化 大Echarts
			inintialEcharts('checkedCharts',checked_id, null,false);
		}
	});
}



/**
 * 点击Integer Logo页面重载
 */
$(".logoTextStr").bind("click", function(e) {
	//跳转到主页
	window.location.href="../index/index.html";
	
	
	//当前页面重载
	// window.location.reload();
})

/**
 * 页面加载时 切换到首页
 */
function onLoadShow() {

	//更改body背景颜色
	$("body").css("background-color", "rgba(239,243,245,1)");

	//更改iframe的属性
	$(".mainFrame").css("width", "90%")
	$(".mainFrame").css("margin-left", "14px")
}

/**
 * 消息窗点击查看全部
 */
$(".checkAllBtn").bind("click", function(e) {
	//点击数+1
	clickNum = clickNum + 1;
	//隐藏消息窗
	$(".msgBox").hide();
	//隐藏中间菜单栏
	$(".middleMenu").hide();

	//去除左边菜单栏选中状态
	//移除移动选中样式和点击选中样式
	$(".menuArea").removeClass("checkedMenu");
	$(".menuArea").removeClass("clickCheckedMenu");
	$(".menuArea").attr("data-checked", "false");
	//初始icon路径
	changeClickIconPath();

	//修改iframe的宽度
	$(".mainFrame").css("width", "88.5%");
	//iframe跳转至全部通知界面
	$("#mainFrame").attr("src", "../notice/notice.html");


})
/**
 * 点击消息弹出消息窗
 */
function changeMsgStatus() {
	clickNum = clickNum + 1;
	if (clickNum % 2 == 0) {
		//隐藏消息数
		$(".msgCount").hide();
		//显示消息窗
		$(".msgBox").show();
	} else {
		//显示消息窗
		$(".msgBox").hide();
	}
}

/**
 * @param {Object} e
 * 消息窗样式改变
 */
function changeMsgBoxStyle(e) {
	//去除选中样式
	$(".msgList ul li").removeClass("checkedMessage");
	//当前节点选中
	$(e).addClass("checkedMessage");
}



/**
 * 基坑下级菜单点击事件
 * 防止时间冒泡
 */
$(".foundationMiddleMenu").bind("click", function(e) {
	// 阻止事件冒泡到DOM树上
	e.stopPropagation();
	//隐藏所有选中样式
	$(".saftyImg").css("visibility", "hidden");
	var index = e.currentTarget.dataset.index;
	//当前选中节点对象
	var element = "";
	//iframe框架跳转路径
	var iframePath = "";
	switch (index) {
		case "8-4-1":
			element = ".deepImg";
			iframePath = "../deviceManagement/charts.html?id=1" + "&router=deepMove";
			break;
		case "8-4-2":
			element = ".topImg";
			iframePath = "../deviceManagement/charts.html?id=1" + "&router=topLevel";
			break;
		case "8-4-3":
			element = ".topVerImg";
			iframePath = "../deviceManagement/charts.html?id=1" + "&router=topVertical";
			break;
		case "8-4-4":
			element = ".botImg";
			iframePath = "../deviceManagement/charts.html?id=1" + "&router=topVertical";
			break;
		case "8-4-5":
			element = ".souroundImg";
			iframePath = "../deviceManagement/charts.html?id=1" + "&router=topVertical";
			break;
	}
	//显示当前菜单的选中图片
	$(element).css("visibility", "visible");
	//控制右边iframe路径
	$("#mainFrame").attr("src", iframePath);
})

/**
 * 报警值弹窗
 */
function showWarnValModal() {
	var html = document.getElementById("warnValModal").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['730px', '504px'],
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
 * 运行时间弹窗
 */
function runtimeSetModal() {
	var html = document.getElementById("runtimeSetModal").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['730px', '260px'],
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
 * 点击取消按钮 关闭layer弹窗
 */
function closeLayer() {
	layer.closeAll();
}

/**
 * @param {Object} e
 * 添加企业
 */
function addBussniess(e) {
	if (isBigScreen) {
		var html = document.getElementById("addBussinessModel").innerHTML;
		//页面层-自定义
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			area: ['861px', '768px'],
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
	} else {
		layer.open({
			type: 2,
			title: "添加企业",
			area: ['888px', '75%'],
			fixed: false, //不固定
			maxmin: false, //不允许放大缩小
			scrollbar: false,
			shadeClose: true,
			content: '../businessManagement/addBussiness.html'
		});
	}
}

/**
 * @param {Object} e
 * 添加项目弹窗
 */
function addDepartment(e) {
	var html = document.getElementById("addDepartmentModel").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['861px', '536px'],
		shadeClose: true,
		scrollbar: false,
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
 * @param {Object} e
 * 添加人员弹窗
 */
function addWorker(e) {
	var html = document.getElementById("addWorkerModel").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['861px', 'auto'],
		shadeClose: true,
		scrollbar: false,
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
 * 添加访客
 */
function addVistor(e) {
	var html = document.getElementById("addVistorModel").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['861px', '536px'],
		shadeClose: true,
		scrollbar: false,
		resize: false,
		content: html,
		success: function() {
			//初始化 from 对象
			layui.use('form', function() {
				layform = layui.form;
				layform.render();
			})
			laydate.render({
				elem: "#visteDate"
			});
			laydate.render({
				elem: "#approachTime",
				type: "time"
			});
			laydate.render({
				elem: "#departureTime",
				type: "time"
			});
		}
	});
}


/**
 * 添加项目
 */
function addProject() {
	layer.open({
		type: 2,
		title: "创建项目",
		area: ['888px', '80%'],
		fixed: false, //不固定
		maxmin: false, //不允许放大缩小
		scrollbar: false,
		shadeClose: true,
		move: false,
		content: '../projectManagement/createProject.html'

	});
}
/**
 * 新增凭证
 */
function addCert(e) {
	//修改样式
	$(".wageMiddle ul li").removeClass("checkedMiddleMenu");
	$(e).addClass("checkedMiddleMenu");
	//控制右边iframe路径
	$("#mainFrame").attr("src", "../wageManagement/addCertificate.html");
}

/**
 * @param {Object} e
 * 新增考勤
 */
function addAttendance(e) {
	var html = document.getElementById("addAttendaceModel").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['730px', 'auto'],
		shadeClose: true,
		scrollbar: false,
		resize: false,
		content: html,
		success: function() {
			laydate.render({
				elem: "#attendanceTimePeriod",
				type: "time",
				range: "~",
			});
		}
	});
}

/**
 * @param {Object} e
 * 添加设备
 */
function addDevice(e) {
	var html = document.getElementById("addDeviceModel").innerHTML;
	layer.ready(function() {
		//页面层-自定义
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			area: ['730px', '315px'],
			shadeClose: true,
			scrollbar: false,
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
	})
}

/**
 * 中间菜单点击事件
 */
function middleMenuMove(e) {
	//获取当前选中的data-index  
	//根据data-index的值 切换iframe的路径
	var index = $(e).attr("data-index");
	// 内联框架跳转路径
	var iframePath = "";
	// 基坑监测下级菜单隐藏
	$(".agentContent").hide();
	//改变菜单样式
	$(".middleMenu").css("width", "12.5rem");
	//隐藏所有箭头 修改样式
	$(".trianleImg").hide();
	$(".agentText").css("margin-left", 23);
	//安全帽下级菜单隐藏
	$(".helmetContent").hide();

	switch (index) {
		case "1-0":
			//修改样式
			$(".projectMiddle ul li").removeClass("checkedMiddleMenu");
			//项目资料
			iframePath = "../projectManagement/projectManagement.html";
			break;
		case "1-1":
			//修改样式
			$(".projectMiddle ul li").removeClass("checkedMiddleMenu");
			//项目单位
			iframePath = "../projectManagement/projectDepartment.html";
			break;
		case "2-1":
			//修改样式
			$(".businessMiddle ul li").removeClass("checkedMiddleMenu");
			//企业管理
			iframePath = "../businessManagement/businessManagement.html";
			break;
		case "2-2":
			//修改样式
			$(".businessMiddle ul li").removeClass("checkedMiddleMenu");
			//班组管理
			iframePath = "../businessManagement/departmentManagement.html";
			break;
		case "3-1":
			//修改样式
			$(".peopleMiddle ul li").removeClass("checkedMiddleMenu");
			//建筑工人管理
			iframePath = "../workerManagemenet/workerManagemenet.html";
			break;
		case "3-2":
			//修改样式
			$(".peopleMiddle ul li").removeClass("checkedMiddleMenu");
			//管理工人管理
			iframePath = "../businessManagement/departmentManagement.html";
			break;
		case "3-3":
			//修改样式
			$(".peopleMiddle ul li").removeClass("checkedMiddleMenu");
			//合同管理
			iframePath = "../workerManagemenet/contractManagement.html";
			break;
		case "4-1":
			//修改样式
			$(".wageMiddle ul li").removeClass("checkedMiddleMenu");
			$(".addCertMenu").removeClass("checkedMiddleMenu");
			//工资管理
			iframePath = "../wageManagement/wageManagement.html";
			break;
		case "4-2":
			//修改样式
			$(".wageMiddle ul li").removeClass("checkedMiddleMenu");
			$(".addCertMenu").removeClass("checkedMiddleMenu");
			//凭证管理
			iframePath = "../wageManagement/certificateManagement.html";
			break;
		case "5-1":
			//修改样式
			$(".attendanceMiddle ul li").removeClass("checkedMiddleMenu");
			//工资管理
			iframePath = "../attendanceManagement/attendanceManagement.html";
			break;
		case "5-2":
			//修改样式
			$(".attendanceMiddle ul li").removeClass("checkedMiddleMenu");
			//凭证管理
			iframePath = "../attendanceManagement/attendanceRecord.html";
			break;
		case "6-1":
			//修改样式
			$(".visitorMiddle ul li").removeClass("checkedMiddleMenu");
			//访客管理
			iframePath = "../visitorManagement/visitorManagement.html";
			break;
		case "7-1":
			//修改样式
			$(".safetyMiddle ul li").removeClass("checkedMiddleMenu");
			//规划安全事项
			iframePath = "../safetyManagement/safetyManagement.html";
			break;
		case "7-2":
			//修改样式
			$(".safetyMiddle ul li").removeClass("checkedMiddleMenu");
			//审核检查情况
			iframePath = "../safetyManagement/inspectionDetail.html";
			break;
		case "8-1":
			//修改样式
			$(".deviceMiddle ul li").removeClass("checkedMiddleMenu");
			//路由器
			iframePath = "../deviceManagement/router.html";
			break;
		case "8-2":
			//修改样式
			$(".deviceMiddle ul li").removeClass("checkedMiddleMenu");
			//摄像头
			iframePath = "../deviceManagement/camera.html";
			break;
		case "8-3":
			//修改样式
			$(".deviceMiddle ul li").removeClass("checkedMiddleMenu");
			$(".addCertMenu").removeClass("checkedMiddleMenu");
			//安全帽
			iframePath = "../deviceManagement/helmet.html";
			//显示安全帽下级菜单
			$(".helmetContent").show();
			break;
		case "8-4":
			//修改样式
			$(".deviceMiddle ul li").removeClass("checkedMiddleMenu");
			//基坑监测
			// iframePath = "../deviceManagement/foundation.html";
			//显示基坑监测下级菜单
			// $(".agentContent").show();
			//显示第一项下拉菜单被选中
			// $(".firstTriangle").show();
			// $(".firstTriangle").parent(".addIconArea").siblings(".addText").css("margin-left", 0);
			break;
		case "9-1":
			//修改样式
			$(".systemMiddle ul li").removeClass("checkedMiddleMenu");
			//基本信息
			iframePath = "../systemManagement/basicInformation.html";
			break;
		case "9-2":
			//修改样式
			$(".systemMiddle ul li").removeClass("checkedMiddleMenu");
			//账号安全
			iframePath = "../systemManagement/accountSafety.html";
			break;
		case "10-1":
			//修改样式
			$(".safetyAgentMiddle ul li").removeClass("checkedMiddleMenu");
			//隐藏基坑监测下级菜单
			$(".foundationMenu").hide();

			//人员实时定位
			iframePath = "../deviceManagement/helmetPosition.html";
			break;
		case "10-2":
			//修改样式
			$(".safetyAgentMiddle ul li").removeClass("checkedMiddleMenu");
			//改变菜单样式
			$(".middleMenu").css("width", "243px");
			$(".foundationMenu").show();
			//基坑监测
			iframePath = "../deviceManagement/foundation.html";
			break;
	}

	$(e).addClass("checkedMiddleMenu");

	//控制右边iframe路径
	$("#mainFrame").attr("src", iframePath);

}


/**
 * 左边菜单移出事件
 */
$(".menuArea").bind("mouseleave", function(e) {
	var isChecked = e.currentTarget.dataset.checked;

	//清除移动选中样式
	$(".menuArea").removeClass("checkedMenu");
	//当前移出菜单下标
	var index = e.currentTarget.dataset.index;
	//图片路径
	var imgPath = "";

	switch (index) {
		case "0":
			imgPath = "img/xiangmu(1).png";
			break;
		case "1":
			imgPath = "img/qiye.png";
			break;
		case "2":
			imgPath = "img/renyuan.png";
			break;
		case "3":
			imgPath = "img/gongzi.png";
			break;
		case "4":
			imgPath = "img/kaoqin.png";
			break;
		case "5":
			imgPath = "img/chakanfangke(1).png";
			break;
		case "6":
			imgPath = "img/anquan(1).png";
			break;
		case "7":
			imgPath = "img/shebei(1).png";
			break;
		case "8":
			imgPath = "img/xitong(1).png";
			break;
		case "9":
			imgPath = "img/shishijiance.png";
			break;
	}

	if (isChecked != "true") {
		$(e.currentTarget).children(".singleMenu").children(".eighteenWidth").children(".menuIconArea").children(
			".menuIcon").attr(
			"src", imgPath);
	}


})

/**
 * @param {Object} e
 * 左边菜单移入事件
 */
function leftMenuMove(e) {
	//移除列表移动选中样式
	$(".menuArea").removeClass("checkedMenu");
	//当前节点添加选中样式
	$(e).addClass("checkedMenu");
	var index = $(e).attr("data-index");
	//移入图片路径
	var imgPath = "";
	switch (index) {
		case "0":
			imgPath = "img/xiangmu.png";
			break;
		case "1":
			imgPath = "img/qiye(1).png";
			break;
		case "2":
			imgPath = "img/renyuan(1).png";
			break;
		case "3":
			imgPath = "img/gongzi(1).png";
			break;
		case "4":
			imgPath = "img/kaoqin(1).png";
			break;
		case "5":
			imgPath = "img/chakanfangke.png";
			break;
		case "6":
			imgPath = "img/anquan.png";
			break;
		case "7":
			imgPath = "img/shebei.png";
			break;
		case "8":
			imgPath = "img/xitong.png";
			break;
		case "9":
			imgPath = "img/shishijiance_black.png";
			break;
	}

	//修改当前选中节点菜单的icon
	$(e).children(".singleMenu").children(".eighteenWidth").children(".menuIconArea").children(".menuIcon").attr("src",
		imgPath);

}
/**
 * @param {Object} e
 * 左边菜单点击事件
 */
function checkLeftMenu(e) {

	//更改body背景颜色
	$(".mainBody").css("background-color", "rgba(255,255,255,1)");

	//隐藏中间菜单栏
	$(".middleMenu").show();
	//移除移动选中样式和点击选中样式
	$(".menuArea").removeClass("checkedMenu");
	$(".menuArea").removeClass("clickCheckedMenu");
	$(".menuArea").attr("data-checked", "false");

	//修改当前节点选中样式
	$(e).addClass("clickCheckedMenu");
	//修改当前节点属性为选中
	$(e).attr("data-checked", "true");
	//修改当前列表其他菜单的icon
	changeClickIconPath();
	//修改中间菜单样式
	$(".middleMenu").css("width", "12.5rem");

	//当前点击菜单index
	var index = $(e).attr("data-index");
	//iframe跳转路径
	var iframePath = "";
	//图片路径
	var imgPath = "";
	switch (index) {
		case "0":
			//控制中间菜单栏显示 隐藏
			controlMiddleMenu();
			$(".projectMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".projectMiddle ul li").removeClass("checkedMiddleMenu");
			$(".projectMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../projectManagement/projectManagement.html";
			imgPath = "img/xiangmu.png";
			break;
		case "1":
			//控制中间菜单栏显示 隐藏
			controlMiddleMenu();
			$(".businessMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".businessMiddle ul li").removeClass("checkedMiddleMenu");
			$(".businessMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../businessManagement/businessManagement.html";
			imgPath = "img/qiye(1).png";
			break;
		case "2":
			//控制中间菜单栏显示 隐藏
			controlMiddleMenu();
			$(".peopleMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".peopleMiddle ul li").removeClass("checkedMiddleMenu");
			$(".peopleMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../workerManagemenet/workerManagemenet.html";
			imgPath = "img/renyuan(1).png";
			break;
		case "3":
			//控制中间菜单栏显示 隐藏
			controlMiddleMenu();
			$(".wageMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".wageMiddle ul li").removeClass("checkedMiddleMenu");
			$(".wageMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../wageManagement/wageManagement.html";
			imgPath = "img/gongzi(1).png";
			break;
		case "4":
			//控制中间菜单栏显示 隐藏
			controlMiddleMenu();
			$(".attendanceMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".attendanceMiddle ul li").removeClass("checkedMiddleMenu");
			$(".attendanceMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../attendanceManagement/attendanceManagement.html";
			imgPath = "img/kaoqin(1).png";
			break;
		case "5":
			controlMiddleMenu();
			$(".visitorMiddle").show();
			iframePath = "../visitorManagement/visitorManagement.html";
			imgPath = "img/chakanfangke.png";
			break;
		case "6":
			controlMiddleMenu();
			$(".safetyMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".safetyMiddle ul li").removeClass("checkedMiddleMenu");
			$(".safetyMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../safetyManagement/safetyManagement.html";
			imgPath = "img/anquan.png";
			break;
		case "7":
			controlMiddleMenu();
			$(".deviceMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".deviceMiddle ul li").removeClass("checkedMiddleMenu");
			$(".deviceMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../deviceManagement/router.html";
			imgPath = "img/shebei.png";
			break;
		case "8":
			controlMiddleMenu();
			$(".systemMiddle").show();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".systemMiddle ul li").removeClass("checkedMiddleMenu");
			$(".systemMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../systemManagement/basicInformation.html";
			imgPath = "img/xitong.png";
			break;
		case "9":
			controlMiddleMenu();
			//显示安全监测中间菜单
			$(".safetyAgentMiddle").show();
			//对应中间菜单栏选中第一个
			$(".safetyAgentMiddle ul li").removeClass("checkedMiddleMenu");
			$(".safetyAgentMiddle ul li:first").addClass("checkedMiddleMenu");
			//隐藏基坑监测下级菜单
			$(".foundationMenu").hide();

			iframePath = "../deviceManagement/helmetPosition.html";
			imgPath = "img/shishijiance_black.png";
			break;
	}
	//修改当前选中节点菜单的icon
	$(e).children(".singleMenu").children(".eighteenWidth").children(".menuIconArea").children(".menuIcon").attr("src",
		imgPath);
	//控制右边iframe路径
	$("#mainFrame").attr("src", iframePath);
}

/**
 * 控制中间菜单显示隐藏
 */
function controlMiddleMenu() {
	$(".projectMiddle").hide();
	$(".businessMiddle").hide();
	$(".peopleMiddle").hide();
	$(".wageMiddle").hide();
	$(".attendanceMiddle").hide();
	$(".visitorMiddle").hide();
	$(".safetyMiddle").hide();
	$(".deviceMiddle").hide();
	$(".systemMiddle").hide();
	$(".safetyAgentMiddle").hide();
}


/**
 * 改变左侧菜单点击选中之后 其他菜单的icon路径
 */
function changeClickIconPath() {
	$(".icon_1").attr("src", "img/xiangmu(1).png");
	$(".icon_2").attr("src", "img/qiye.png");
	$(".icon_3").attr("src", "img/renyuan.png");
	$(".icon_4").attr("src", "img/gongzi.png");
	$(".icon_5").attr("src", "img/kaoqin.png");
	$(".icon_6").attr("src", "img/chakanfangke(1).png");
	$(".icon_7").attr("src", "img/anquan(1).png");
	$(".icon_8").attr("src", "img/shebei(1).png");
	$(".icon_9").attr("src", "img/xitong(1).png");
	$(".icon_10").attr("src", "img/shishijiance.png");
}
/**
 * 左侧菜单栏初始icon路径
 */
function changeClickIconPath() {
	$(".icon_1").attr("src", "img/xiangmu(1).png");
	$(".icon_2").attr("src", "img/qiye.png");
	$(".icon_3").attr("src", "img/renyuan.png");
	$(".icon_4").attr("src", "img/gongzi.png");
	$(".icon_5").attr("src", "img/kaoqin.png");
	$(".icon_6").attr("src", "img/chakanfangke(1).png");
	$(".icon_7").attr("src", "img/anquan(1).png");
	$(".icon_8").attr("src", "img/shebei(1).png");
	$(".icon_9").attr("src", "img/xitong(1).png");
	$(".icon_10").attr("src", "img/shishijiance.png");
}
