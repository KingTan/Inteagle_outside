/**
 * 页面加载事件
 */
$(function() {

})

/**
 * 跳转到初始首页
 */
function backToCurrentPage() {
	//移除导航栏所有选中状态
	$(".navList ul li").removeClass("check_nav");
	//控制右边iframe路径
	$("#mainFrame").attr("src", "curPage.html");
}

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
$(".navList ul li a").bind("mouseleave", function(dom) {
	//当前节点对象
	var target = dom.target || dom.srcElemet;
	if (target) {
		//相邻二级菜单显示
		// $(target).siblings("dl").hide();
	}
})

/**
 * 导航栏菜单鼠标移出事件
 */
$(".navList ul li dl").bind("mouseleave", function(dom) {
	console.log(dom);
	//当前节点对象
	var target = dom.currentTarget || dom.srcElemet;
	if (target) {
		$(target).hide();
	}
})



/**
 * 导航栏点击事件
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
	//父页面iframe跳转路径
	var iframePath = "";
	switch (checkde_index) {
		case "0":
			//项目管理
			break;
		case "1":
			//企业管理
			break;
		case "2":
			//安全监测	
			iframePath = "../foundation/foundation.html";
			break;
		case "3":
			//人员管理

			break;
		case "4":
			//工资管理
			break;
		case "5":
			//考勤管理
			break;
		case "6":
			//访客管理
			break;
		case "7":
			//安全管理
			break;
		case "8":
			//设备管理
			break;
		case "9":
			//系统管理
			break;
	}
	if (iframePath != "" && iframePath != undefined) {
		//控制右边iframe路径
		// $("#mainFrame").attr("src", iframePath);
	}
})
