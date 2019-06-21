var layer;
var form;
var laydate;

//是否大屏幕显示
var isBigScreen;

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
	
})
