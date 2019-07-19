var layer;
var form;
var laydate;
//是否大屏幕显示
var isBigScreen;
//服务器地址
const PATH = "http://127.0.0.1:8080/";

$(function() {
	//屏幕分辨率的宽高
	var clientWidth = window.screen.width; 
	var clientHeight = window.screen.width; 
	if (clientWidth > 1400) {
		isBigScreen = true;
	} else {
		isBigScreen = false;
	}
})

//初始化 layer 对象
layui.use('layer', function() {
	layer = layui.layer;
})
//初始化 from 对象
layui.use('form', function() {
	form = layui.form;
	form.render();
})
//初始化 laydate 对象
layui.use('laydate', function() {
	laydate = layui.laydate;
	laydate.render({
		elem: "#trackTime",
		type: "datetime",
		range: "到",
		format: "yyyy年M月d日H时m分s秒"
	});
	laydate.render({
		elem: "#visitorTrackTime",
		type: "datetime",
		range: "到",
		format: "yyyy年M月d日H时m分s秒"
	});
	laydate.render({
		elem: "#mondayPeriod",
		type: "time",
		range: "到",
		format: "H时m分s秒"
	});
	laydate.render({
		elem: "#wageTime",
		type: "date"
	});
	laydate.render({
		elem: "#certificateManagementYear",
		type: "year"
	});
	laydate.render({
		elem: "#addCertificateManagementYear",
		type: "year"
	});
	laydate.render({
		elem: "#smallCertificateManagementYear",
		type: "year"
	});
		laydate.render({
		elem: "#attendanceTime",
		type: "datetime"
	});
	laydate.render({
		elem: "#smallAttendanceTime",
		type: "datetime"
	});
	laydate.render({
		elem: "#visitorTime",
		type: "date"
	});
	laydate.render({
		elem: "#safetyTime",
		type: "date"
	});
	laydate.render({
		elem: "#inspectionTime",
		type: "date"
	});
})
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