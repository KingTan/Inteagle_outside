/**
 * 页面加载事件
 */
$(function() {
	closeAnimattion();

	//初始化layui组件
	layui.use(['element', 'form', 'laydate'], function() {
		var laydate = layui.laydate,
			element = layui.element,
			layform = layui.form;
	});
})
