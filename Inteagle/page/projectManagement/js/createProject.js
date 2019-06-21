var laydate;

/**
 * 页面加载事件
 */
$(function() {
	//初始化 laydate 对象
	layui.use('laydate', function() {
		laydate = layui.laydate;
		laydate.render({
			elem: "#establishTime",
			trigger: 'click'
		});
		laydate.render({
			elem: "#commenceTime",
			trigger: 'click'
		})

	});

})
