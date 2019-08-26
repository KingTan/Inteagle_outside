var layer;
var form;
var laydate;

layui.use(['layer', 'laydate', 'form'], function() {
	//时间组件
	laydate = layui.laydate;
	//弹窗组件
	layer = layui.layer;
	//表单组件
	form = layui.form;
	form.render();
});


//是否大屏幕显示
var isBigScreen;

// 本地服务器地址
const PATH = "http://127.0.0.1:8080/";

//服务器地址
// const PATH = "https://www.inteagle.com.cn/Inteagle_java/";


$(function() {
	//屏幕分辨率的宽高
	var clientWidth = window.screen.width;
	var clientHeight = window.screen.width;

	var document_height = document.body.clientHeight;
	var document_width = document.body.clientWidth;

	// console.log("document_height------------", document_height);
	// console.log("document_width------------", document_width);
	// console.log("clientWidth------------", clientWidth);
	// console.log("clientHeight-------------", clientHeight);

	if (document_width > 1400) {
		isBigScreen = true;
	} else {
		isBigScreen = false;
	}
})


//页面加载完成关闭动画
function closeAnimate() {
	//加载时
	document.onreadystatechange = function() {
		if (document.readyState == "complete") {
			$('.loading').fadeOut();
		}
	}
}

/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam(paramName) {
	paramValue = "", isFound = !1;
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
			paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}

/**
 * 获得当前时间 yyyy-MM-dd HH:mm:ss
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var str_minute = date.getMinutes();
	var str_second = date.getMinutes();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if (str_minute >= 0 && str_minute <= 9) {
		str_minute = "0" + str_minute;
	}
	if (str_second >= 0 && str_second <= 9) {
		str_second = "0" + str_second;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + str_second +
		seperator2 + str_second;
	return currentdate;
}
