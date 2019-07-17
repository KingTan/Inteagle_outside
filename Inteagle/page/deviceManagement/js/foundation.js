/**
 * @param {Object} index
 * 点击菜单栏
 */
function setOption(index) {
	var html = "";
	var height = "";
	switch (index) {
		case 0:
			html = document.getElementById("warnValModal").innerHTML;
			height="504px";
			break;
		case 1:
			html = document.getElementById("runtimeSetModal").innerHTML;
			height="260px";
			break;
		case 2:
			break;
	}
	if (index != 2) { //页面层-自定义
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			area: ['730px', height],
			shadeClose: true,
			scrollbar: true,
			resize: false,
			content: html,
			success: function() {
				//初始化 from 对象
				layui.use('form', function() {
					layform = layui.form;
					layform.render();
				})
			}
		});
	}
}
