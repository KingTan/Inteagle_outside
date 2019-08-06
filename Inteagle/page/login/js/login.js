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
	var loginName = $("#loginName").val().trim();
	//密码
	var passWord = $("#passWord").val().trim();
	if (!notNull(loginName)) {
		layer.ready(function() {
			layer.msg("请输入您的账号", {
				icon: 2,
				time: 1000
			}, function() {});
		})
		return;
	}
	if (!notNull(passWord)) {
		layer.ready(function() {
			layer.msg("请输入您的密码", {
				icon: 2,
				time: 1000
			}, function() {});
		})
		return;
	}
	//执行登录
	login(loginName, passWord);

	// window.location.href = "../index/index.html";
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


/**
 * @param {Object} searchParam
 * @param {Object} pwd
 * 执行登录
 */
function login(searchParam, pwd) {

	//密码MD5加密
	pwd = hex_md5(pwd);

	$.ajax({
		url: PATH + "userInfo/login",
		type: "post",
		data: {
			"searchParam": searchParam,
			"passWord": pwd
		},
		success: function(res) {
			console.log("res", res);
			if (res.state == 500) {
				layer.ready(function() {
					layer.msg(res.message, {
						icon: 2,
						time: 1000
					}, function() {});
				})
			} else {
				//保存当前登录用户信息
				sessionStorage.setItem("LoginUserInfo", JSON.stringify(res.data));
				//跳转到index界面
				layer.ready(function() {
					layer.msg("登录成功", {
						icon: 1,
						time: 1000
					}, function() {
						 window.location.href = "../index/index.html"; 
					});
				})
			}
		},
		error: function(badRes) {}
	});

}



/**
 * @param {Object} param
 * 验证账户名是否存在
 */
function checkLoginParam(param) {
	mui.ajax(PATH + 'userInfo/login', {
		data: {
			searchParam: param
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {

		},
		error: function(xhr, type, errorThrown) {

		}
	});
}
