/**
 * @param {Object} index
 * 点击菜单栏
 */
function setOption(index) {
	var height = "";
	switch (index) {
		case 0:
			//调用父页面方法
			parent.showWarnValModal();
			break;
		case 1:
			//调用父页面方法
			parent.runtimeSetModal();
			break;
		case 2:
			break;
	}
}
