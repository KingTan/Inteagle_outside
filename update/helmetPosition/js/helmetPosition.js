$(function() {
})

/**
 * 点击电子围栏事件
 */
$(".electricFenceText").bind("click",function(dom){
	//调用父页面的方法
	window.parent.showElectricFenceModal();
})
