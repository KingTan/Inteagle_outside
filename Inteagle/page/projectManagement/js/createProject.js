//配置插件目录
layui.config({
	base: '../../common/mods/',
	version: '1.0'
});


/**
 * 页面加载事件
 */
$(function() {
	//初始化 laydate 对象
	layui.use(['laydate', 'form', 'layarea'],function() {
		var laydate = layui.laydate,
			form = layui.form,
			layarea = layui.layarea;
		laydate.render({
			elem: "#establishTime",
			trigger: 'click'
		});
		laydate.render({
			elem: "#commenceTime",
			trigger: 'click'
		});
		layarea.render({
			elem: '#area-picker',
			change: function(res) {
				//选择结果
				console.log(res);
			}
		});

	});

})
