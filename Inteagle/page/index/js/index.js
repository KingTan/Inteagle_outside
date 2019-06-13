/**
 * 页面加载事件
 */
$(function() {


})

/**
 * 添加项目
 */
function addProject() {
	layer.open({
		type: 2,
		title: "创建项目",
		area: ['888px', '75%'],
		fixed: false, //不固定
		maxmin: false, //不允许放大缩小
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
			iframePath = "../projectManagement/projectManagement.html";
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
			iframePath = "../businessManagement/departmentManagement.html";
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
	}

	$(e).addClass("checkedMiddleMenu");

	//控制右边iframe路径
	$("#mainFrame").attr("src", iframePath);

}

/**
 * @param {Object} e
 * 左边菜单移动事件
 */
function leftMenuMove(e) {
	// $(".menuList ul li").removeClass("checkedMenu");
	// $(e).addClass("checkedMenu");
}

/**
 * @param {Object} e
 * 左边菜单点击事件
 */
function checkLeftMenu(e) {
	$(".menuList ul li").removeClass("checkedMenu");
	$(e).addClass("checkedMenu");
	var index = $(e).attr("data-index");

	var iframePath = "";

	switch (index) {
		case "0":
			//控制中间菜单栏显示 隐藏
			$(".projectMiddle").show();
			$(".businessMiddle").hide();
			$(".peopleMiddle").hide();
			$(".wageMiddle").hide();
			//对应中间菜单栏选中第一个
			//修改样式
			$(".projectMiddle ul li").removeClass("checkedMiddleMenu");
			$(".projectMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../projectManagement/projectManagement.html";
			break;
		case "1":
			//控制中间菜单栏显示 隐藏
			$(".businessMiddle").show();
			$(".projectMiddle").hide();
			$(".peopleMiddle").hide();
			$(".wageMiddle").hide(); 
			//对应中间菜单栏选中第一个
			//修改样式
			$(".businessMiddle ul li").removeClass("checkedMiddleMenu");
			$(".businessMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../businessManagement/businessManagement.html";
			break;
		case "2":
			//控制中间菜单栏显示 隐藏
			$(".peopleMiddle").show();
			$(".projectMiddle").hide();
			$(".businessMiddle").hide();
			$(".wageMiddle").hide(); 
			//对应中间菜单栏选中第一个
			//修改样式
			$(".peopleMiddle ul li").removeClass("checkedMiddleMenu");
			$(".peopleMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../workerManagemenet/workerManagemenet.html";
			break;
		case "3":
			//控制中间菜单栏显示 隐藏
			$(".wageMiddle").show();
			$(".peopleMiddle").hide();
			$(".projectMiddle").hide();
			$(".businessMiddle").hide(); 
			//对应中间菜单栏选中第一个
			//修改样式
			$(".wageMiddle ul li").removeClass("checkedMiddleMenu");
			$(".wageMiddle ul li:first").addClass("checkedMiddleMenu");
			iframePath = "../wageManagement/wageManagement.html";
			break;
		case "4":
			break;
		case "5":
			break;
		case "6":
			break;
		case "7":
			break;
		case "8":
			break;
		default:
			break;
	}

	//控制右边iframe路径
	$("#mainFrame").attr("src", iframePath);

}
