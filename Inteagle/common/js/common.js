var gig;
var layer;
var form;
var laydate;
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
		elem:"#establishTime"
	});
	laydate.render({
		elem:"#commenceTime"
	});
	laydate.render({
		elem:"#trackTime",
		type:"datetime",
		range:"到",
		format:"yyyy年M月d日H时m分s秒"
	});
	laydate.render({
		elem:"#wageTime",
		type:"month"
	});
	laydate.render({
		elem:"#certificateManagementYear",
		type:"year"
	});
})