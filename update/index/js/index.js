/**
 * 页面加载事件
 */
$(function() {
	//JavaScript代码区域
	layui.use('element', function() {
		var element = layui.element;
	});
})

/**
 * 跳转到初始首页
 */
$(".middileLogotextArea").bind("click", function() {
	//移除导航栏所有选中状态
	$(".navList ul li").removeClass("check_nav");
	//控制右边iframe路径
	$("#mainFrame").attr("src", "curPage.html");
})

/**
 * 导航栏菜单鼠标移入事件
 */
$(".navList ul li a").bind("mouseenter", function(dom) {
	//当前节点对象
	var target = dom.target || dom.srcElemet;
	if (target) {
		$(".navList ul li dl").hide();
		//相邻二级菜单显示
		$(target).siblings("dl").show();
	}
})
/**
 * 导航栏菜单鼠标移除事件
 */
// $(".navList ul li").bind("mouseleave", function(dom) {
//当前节点对象
// var target = dom.target || dom.srcElemet;
// if (target) {
// 	//相邻二级菜单显示
// 	$(target).siblings("dl").hide();w
// }
// })

/**
 * 导航栏菜单鼠标移出事件
 */
$(".navList ul li dl").bind("mouseleave", function(dom) {
	//当前节点对象
	var target = dom.currentTarget || dom.srcElemet;
	if (target) {
		$(target).hide();
	}
})

/**
 * 二级菜单点击事件
 */
$(".navList ul li dl dd").bind("click", function(dom) {
	//当前选中节点下标
	var checkde_index = dom.currentTarget.dataset.index;
	//根据下标改变Iframe路径
	changeIframePath(checkde_index);
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
			break;
		case "9-2":
			//账号安全
			break;
	}
	if (iframePath != "" && iframePath != undefined) {
		console.log("iframePath----------",iframePath);
		//控制右边iframe路径
		$("#mainFrame").attr("src", iframePath);
	}
}
