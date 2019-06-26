//layui form组件
var layform;

/**
 * 页面加载事件
 */
$(function() {

})

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
function addWorker(e){
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
		area: ['730px', '364px'],
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

	var iframePath = "";

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
			//安全帽
			iframePath = "../deviceManagement/helmet.html";
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
			$(".deviceMiddle ul li").removeClass("checkedMiddleMenu");
			$(".deviceMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../systemManagement/basicInformation.html";
			imgPath = "img/xitong.png";
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
}
