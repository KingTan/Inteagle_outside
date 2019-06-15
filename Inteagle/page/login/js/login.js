/**
 * 页面加载事件
 */
$(function() {

})


/**
 * 点击登录事件
 */
$("#loginBtn").bind("click", function() {

	//用户名
	var loginName = $("#loginName").val();
	//密码
	var passWord = $("#passWord").val();


	if (!notNull(loginName)) {
		layer.ready(function() {
			layer.msg("请输入您的账号", {
				icon: 2,
				time: 1000
			}, function() {
			});
		})
		return;
	}

	if (!notNull(passWord)) {
		layer.ready(function() {
			layer.msg("请输入您的密码", {
				icon: 2,
				time: 1000
			}, function() {
			});
		})
		return;
	}

	//跳转到index界面
	layer.ready(function() {
		layer.msg("登录成功", {
			icon: 1,
			time: 1000
		}, function() {
			/* window.location.href = "../index/index.html"; */
		});
	})
})

/**
 * @param {Object} event
 *  监听输入区域 回车键事件
 */
$('.loginArea').bind('keyup', function(event) {
	if (event.keyCode == "13") {
		//回车执行查询
		$('#loginBtn').click();
	}
});
