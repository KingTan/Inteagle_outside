//是否勾选记住密码
var is_checkbox_checked = false;

var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数

var InterValObj_login; //timer变量，控制时间
var count_login = 60; //间隔函数，1秒执行
var curCount_login; //当前剩余秒数


/**
 * 页面加载事件
 */
$(function() {
	//cookie中是否有用户保存的 登录名 密码
	checkCookieLoginInfo();
})

/**
 * 验证码登录(手机号输入框失焦事件)
 */
$(".login_phone_num").bind("blur", function(dom) {
	var current_value = dom.currentTarget.value;
	var target = dom.currentTarget; //当前节点
	if (!isPoneAvailable(current_value)) {
		//改变样式
		$(target).parent().parent().addClass("null_input");
	}else{
		//改变样式
		$(target).parent().parent().removeClass("null_input");
	}
})

/**
 * 发送验证码(验证码登录)
 */
$(".getIdentityBtn_login").bind("click", function() {
	//登陆手机号
	var login_phone = $(".login_phone_num").val().trim();
	if (!notNull(login_phone)) {
		layer.ready(function() {
			layer.msg("请输入您的手机号", {
				icon: 2,
				time: 1000
			}, function() {
				$(".login_phone_num").focus();
			});
		})
		return;
	} else {
		//验证手机号格式
		if (isPoneAvailable(login_phone)) {
			//发送验证码--登陆验证码
			send_sms_code(login_phone, "login");
		} else {
			layer.ready(function() {
				layer.msg("手机号码格式不正确", {
					icon: 2,
					time: 1000
				}, function() {
					$(".login_phone_num").focus();
				});
			})
		}
	}
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
			if (res.state == 200) {
				layer.ready(function() {
					layer.msg("验证码发送成功", {
						icon: 1,
						time: 1000
					}, function() {
						if (codeType == "register") {
							curCount = count;
							// 设置button效果，开始计时
							$(".getIdentityBtn_register").attr("disabled", true); //设置按钮为禁用状态
							$(".getIdentityBtn_register").text(curCount + "秒后重获"); //更改按钮文字
							InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行一次
						} else if (codeType == "login") {
							curCount_login = count_login;
							// 设置button效果，开始计时
							$(".getIdentityBtn_login").attr("disabled", true); //设置按钮为禁用状态
							$(".getIdentityBtn_login").text(curCount_login + "秒后重获"); //更改按钮文字
							InterValObj_login = window.setInterval(SetRemainTime_login, 1000); // 启动计时器timer处理函数，1秒执行一次
						}
					});
				})
			} else if (res.state == 500) {
				layer.ready(function() {
					layer.msg(res.message, {
						icon: 2,
						time: 1000
					}, function() {
						$(".phoneNumber").focus();
					});
				})
			}
		},
		error: function(badRes) {
			console.log("发送验证码失败....----" + badRes);
		}
	});
}

//timer处理函数
function SetRemainTime() {
	if (curCount == 0) { //超时重新获取验证码
		window.clearInterval(InterValObj); // 停止计时器
		$(".getIdentityBtn_register").attr("disabled", false); //移除禁用状态改为可用
		$(".getIdentityBtn_register").text("重获验证码");
	} else {
		curCount--;
		$(".getIdentityBtn_register").text(curCount + "秒后重获");
	}
}

function SetRemainTime_login() {
	if (curCount_login == 0) { //超时重新获取验证码
		window.clearInterval(InterValObj_login); // 停止计时器
		$(".getIdentityBtn_login").attr("disabled", false); //移除禁用状态改为可用
		$(".getIdentityBtn_login").text("重获验证码");
	} else {
		curCount_login--;
		$(".getIdentityBtn_login").text(curCount_login + "秒后重获");
	}
}


// 判断是否为手机号
function isPoneAvailable(phone) {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
};

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
		is_checkbox_checked = true;
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
 * 点击登录(验证码登录)
 */
$(".loginBtn_identity").bind("click",function(){
	//手机号
	var phoneNumber = $(".login_phone_num").val().trim();
	//验证码
	var identityCode = $(".identity_value").val().trim();
	if (!notNull(phoneNumber)) {
		layer.ready(function() {
			layer.msg("请输入手机号", {
				icon: 2,
				time: 1000
			}, function() {});
		})
		return;
	}
	if (!notNull(identityCode)) {
		layer.ready(function() {
			layer.msg("请输入验证码", {
				icon: 2,
				time: 1000
			}, function() {});
		})
		return;
	}
	//执行登录
	loginByIndentityCode(phoneNumber, identityCode);
})

/**
 * @param {Object} phoneNumber
 * @param {Object} indentityCode
 * 执行登录(验证码登录)
 */
function loginByIndentityCode(phoneNumber, indentityCode) {
	$.ajax({
		url: PATH + "userInfo/loginByIdentityCode",
		type: "post",
		data: {
			"phoneNumber": phoneNumber,
			"identityCode": indentityCode
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
			} else if (res.state == 200) {
				//保存当前登录用户信息
				sessionStorage.setItem("LoginUserInfo", JSON.stringify(res.data));
				//跳转到index界面
				layer.ready(function() {
					layer.msg("登录成功", {
						icon: 1,
						time: 1000
					}, function() {
						window.location.href = "../login_after/login_after.html";
					});
				})
			}
		},
		error: function(badRes) {}
	});
}


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
 * 执行登录(普通登录)
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
						window.location.href = "../login_after/login_after.html";
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
