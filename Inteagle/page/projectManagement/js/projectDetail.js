/**
 * 页面加载事件
 */
$(function() {

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
$(".toBusinessDetail").bind("click",function(){
	$('#mainFrame', window.parent.document).attr("src","../businessManagement/businessDetail.html");
})