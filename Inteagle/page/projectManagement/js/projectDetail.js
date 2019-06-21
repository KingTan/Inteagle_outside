/**
 * 页面加载事件
 */
$(function() {

	//渲染百度地图
	var BaiMap = new BMap.Map("bContainer");
	var point = new BMap.Point(113.880594, 22.95487);
	BaiMap.centerAndZoom(point, 16);



})

/**
 * 顶部菜单栏点击事件
 */
function clickMenuOption(e) {
	var index = $(e).attr("data-index");
	$(".projectListText ul li").removeClass("checkedMenu");
	$(e).addClass("checkedMenu");
	switch (index) {
		case "0":
			$(".projectBaseInfo").show();
			$(".projectEnterprise").hide();
			$(".projecDepartment").hide();
			$(".projecMember").hide();
			break;
		case "1":
			$(".projectEnterprise").show();
			$(".projectBaseInfo").hide();
			$(".projecDepartment").hide();
			$(".projecMember").hide();
			break;
		case "2":
			$(".projecDepartment").show();
			$(".projectBaseInfo").hide();
			$(".projectEnterprise").hide();
			$(".projecMember").hide();
			break;
		case "3":
			$(".projecMember").show();
			$(".projectBaseInfo").hide();
			$(".projectEnterprise").hide();
			$(".projecDepartment").hide();
			break;
	}
}

/**
 * 点击跳转企业详情页面
 */
$(".toBusinessDetail").bind("click", function() {
	$('#mainFrame', window.parent.document).attr("src", "../businessManagement/businessDetail.html");
})

/**
 * 点击跳转到部门详情页面
 */
$(".toDepartmentDetail").bind("click", function() {
	$('#mainFrame', window.parent.document).attr("src", "../businessManagement/departmentDetail.html");
})

/**
 * 点击跳转到工人详情页面
 */
$(".toWorkerDetail").bind("click", function() {
	$('#mainFrame', window.parent.document).attr("src", "../workerManagemenet/workerDetail.html");
})
