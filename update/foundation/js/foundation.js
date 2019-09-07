/**
 * 页面加载
 */
$(function() {

})

/**
 * @param {Object} index
 * 点击工具栏(报警值、运行时间、导出报表)
 */
$(".optionText").bind("click", function(dom) {
	var index=dom.currentTarget.dataset.index;
	switch (index) {
		case "0":
			//调用父页面方法
			parent.showWarnValModal();
			break;
		case "1":
			//调用父页面方法
			parent.runtimeSetModal();
			break;
		case "2":
			break;
	}
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
		//https://www.inteagle.com.cn/update/foundation/foundation_charts.html
		//http://127.0.0.1:8848/Inteagle_outside/update/foundation/foundation_charts.html
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
