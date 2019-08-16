/**
 * 页面加载
 */
$(function() {
	
})

/**
 * 左边菜单点击事件
 */
$(".leftBottomList ul li").bind("click", function(dom) {
	//当前选中节点下标
	var checkde_index = dom.currentTarget.dataset.index;
	console.log("checkde_index-----", checkde_index);
	// var iframePath = 
	//修改父页面Iframe的路径
	$('#mainFrame', window.parent.document).attr("src",
		"http://127.0.0.1:8848/Inteagle_outside/update/foundation/foundation_charts.html");
	// switch (checkde_index) {
	// 	case "0":
	// 		iframePath = "";
	// 		break;
	// 	case "1":
	// 		break;
	// 	case "2":
	// 		break;
	// 	case "3":
	// 		break;
	// 	case "4":
	// 		break;
	// }
})
