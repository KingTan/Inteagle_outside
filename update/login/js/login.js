//是否勾选记住密码
var is_checkbox_checked = false;

/**
 * 页面加载事件
 */
$(function() {
	//cookie中是否有用户保存的 登录名 密码
	checkCookieLoginInfo();
})


/**
 * 发送验证码
 * @param {Object} phoneNumber 手机号
 * @param {Object} codeType 验证码类型
 * Register_Code-注册验证码 
 * Login_Code-登录验证码
 */
function send_sms_code(phoneNumber, codeType) {
	$.ajax({
		url: PATH + "sms/sendSMSCode",
		type: "post",
		data: {
			"phoneNumber": phoneNumber,
			"codeType": codeType
		},
		success: function(res) {
			console.log("res------", res)
			if(res.state==200){
				if(res.data.showapi_res_body.successCounts==1){
					layer.ready(function() {
						layer.msg("验证码发送成功", {
							icon: 1,
							time: 1000
						}, function() {
							$(".phoneNumber").focus();
						});
					})
				}
			}
		},
		error: function(badRes) {
			console.log("发送验证码失败....----" + badRes);
		}
	});
}

/**
 * 判断cookie中是否有用户保存的 登录名 密码
 */
function checkCookieLoginInfo() {
	var cookieLoginName = getCookie("loginName");
	var cookieLoginPwd = getCookie("loginPassWord");
	var IsremeberPass = getCookie("remeberPass");
	if (cookieLoginName != null && cookieLoginName != "") {
		$(".loginParam").val(cookieLoginName)
		$(".loginPwd").val(cookieLoginPwd)
		$(".choose_remember_pwd").attr("checked", "checked");
		remeberPass = true;
	}
}

/**
 * 是否记住密码-勾选框改变事件
 */
$(".choose_remember_pwd").bind("change", function(dom) {
	var is_checked = dom.currentTarget.checked;
	is_checkbox_checked = is_checked;
})

/**
 * @param {Object} event
 *  监听输入区域 回车键事件
 */
$('.login_box_area').bind('keyup', function(event) {
	if (event.keyCode == "13") {
		//回车执行查询
		$('.loginBtn').click();
	}
});

/**
 * 点击登录
 */
$(".loginBtn").bind("click", function(dom) {

	//用户名-手机号
	var loginName = $(".loginParam").val().trim();
	//密码
	var passWord = $(".loginPwd").val().trim();
	if (!notNull(loginName)) {
		layer.ready(function() {
			layer.msg("请输入您的用户名或手机号", {
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
})

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
					}, function() {
						if (res.message == "用户名或手机号不存在") {
							$(".loginParam").focus();
						} else if (res.message == "密码有误") {
							$(".loginPwd").focus();
						}
					});
				})
			} else if (res.state == 200) {
				//保存当前登录用户信息
				sessionStorage.setItem("LoginUserInfo", JSON.stringify(res.data));

				//判断用户是否选择 记住密码
				if (is_checkbox_checked == true) {
					//登录名 密码存到cookie中 时效1天
					setCookie("remeberPass", true, 1);
					setCookie("loginName", searchParam, 1);
					setCookie("loginPassWord", $(".loginPwd").val(), 1);
				} else {
					//不保存则  删除原有的 cookie
					delCookie("loginName");
					delCookie("loginPassWord");
					delCookie("remeberPass");
				}


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
 * 点击注册账号
 */
$(".register_text").on("click", function() {
	//隐藏登录框
	$(".login_box_area").fadeOut();
	//隐藏验证码登录框
	$(".identityCode_box").fadeOut();
	//显示注册框
	$(".register_box_area").fadeIn();
})
/**
 * 已有账号、回到登录框
 */
$(".return_login").on("click", function() {
	//隐藏注册框
	$(".register_box_area").fadeOut();
	//隐藏验证码登录框
	$(".identityCode_box").fadeOut();
	//显示登录框
	$(".login_box_area").fadeIn();
})
/**
 * 点击验证码登录
 */
$(".identityCode_text").on("click", function() {
	//隐藏注册框
	$(".register_box_area").fadeOut();
	//隐藏验证码登录框
	$(".login_box_area").fadeOut();
	//显示登录框
	$(".identityCode_box").fadeIn();
})
