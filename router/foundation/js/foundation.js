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
	var index = dom.currentTarget.dataset.index;
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
			//导出报表
			export_foundation_data("001");
			break;
	}
})

/**
 * @param {Object} id
 * 导出基坑数据
 */
function export_foundation_data(id) {
	var formData = new FormData();
	formData.append("id", id);
	let form = $("<form>"); //创建form标签
	form.attr("style", "display:none");
	form.attr("method", "post"); //设置请求方式
	form.attr("action", PATH + "excel/exportFoundation", ); //action属性设置请求路径
	$("body").append(form); //页面添加form标签
	let input1 = $("<input>") //创建input标签
	input1.attr("type", "hidden") //设置隐藏域
	input1.attr("name", "data") //设置发送后台数据的参数名
	input1.attr("value", formData);
	form.append(input1);
	form.submit(); //表单提交即可下载！
}

/**
 * 左边菜单点击事件
 */
$(".foundationList ul li").bind("click", function(dom) {
	//当前选中节点下标
	var checked_index = dom.currentTarget.dataset.index;
	var iframePath;
	switch (checked_index) {
		case "0":
			iframePath = "deep";
			break;
		case "1":
			iframePath = "top_horizontal";
			break;
		case "2":
			iframePath = "top_vertical";
			break;
		case "3":
			iframePath = "box_vertical";
			break;
		case "4":
			iframePath = "ground_water";
			break;
		case "5":
			iframePath = "around_pipe";
			break;
	}
	//修改父页面Iframe的路径
	$('#mainFrame', window.parent.document).attr("src",
		"http://127.0.0.1:8848/Inteagle_outside/router/foundation/foundation_charts.html?path=" + iframePath);
	//https://www.inteagle.com.cn/router/foundation/foundation_charts.html
	//http://127.0.0.1:8848/Inteagle_outside/router/foundation/foundation_charts.html
})
