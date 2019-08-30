/**
 * 输入密码输入框聚焦事件
 */
$(".loginPwdValue").bind("focus", function(dom) {
	$(".notice_text").show();
})

/**
 * 输入框失焦事件
 */
$(".right_input_area input").bind("blur", function(dom) {
	var current_value = dom.currentTarget.value;
	var target = dom.currentTarget; //当前节点
	var className = dom.currentTarget.className; //当前节点的class
	if (!notNull(current_value)) {
		//改变样式
		$(target).parent().parent().addClass("null_input");
	} else {
		//改变样式
		$(target).parent().parent().removeClass("null_input");

		//根据不同的class 进行不行的正则验证
		switch (className) {
			case "userName":
				break;
			case "phoneNumber":
				//验证手机号格式
				if (!isPoneAvailable(current_value)) {
					//改变样式
					$(target).parent().parent().addClass("null_input");
				}
				break;
			case "idCardNumber":
				//验证身份证号格式是否正确
				if (!isCardNo(current_value)) {
					//改变样式
					$(target).parent().parent().addClass("null_input");
				};
				break;
			case "loginPwdValue":
				if (checkPwd(current_value)) {
					$(".notice_text").hide();
				} else {
					//改变样式
					$(target).parent().parent().addClass("null_input");
				}
				break;
			case "loginPwdValue_again":
				if (!check_pwd_again(current_value)) {
					//改变样式
					$(target).parent().parent().addClass("null_input");
				}
				break;
		}
	}
})

/**
 * @param {Object} pwd
 * 验证密码格式 6-16位数字、字母、符号
 */
function checkPwd(pwd) {
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
	var re = new RegExp(reg)
	if (re.test(pwd)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 验证码输入框失焦事件
 */
$(".identity_value_register").bind("blur", function(dom) {
	var current_value = dom.currentTarget.value;
	var target = dom.currentTarget; //当前节点
	if (!notNull(current_value)) {
		//改变样式
		$(target).parent().addClass("null_input");
	} else {
		//改变样式
		$(target).parent().removeClass("null_input");
	}
})


/**
 * 点击注册
 */
$(".registerBtn").bind("click", function(dom) {
	var userName = $(".userName").val().trim(); //用户名
	var phoneNumber = $(".phoneNumber").val().trim(); //手机号
	var idCardNumber = $(".idCardNumber").val().trim(); //身份证号
	var loginPwdValue = $(".loginPwdValue").val().trim(); //登录密码
	var loginPwdValue_again = $(".loginPwdValue_again").val().trim(); //确认登录密码
	var identity_value_register = $(".identity_value_register").val().trim(); //验证码

	//验证非空
	if (check_null(userName, phoneNumber, idCardNumber, loginPwdValue, loginPwdValue_again, identity_value_register)) {
		return;
	}
	//验证身份证
	//验证身份证号格式是否正确
	if (!isCardNo(idCardNumber)) {
		layer.ready(function() {
			layer.msg("身份证号码不正确！", {
				icon: 2,
				time: 1000
			}, function() {
				//改变样式
				$(".idCardNumber").parent().parent().addClass("null_input");
				$(".idCardNumber").focus();
			});
		})
		return;
	};

	//验证两次密码是否一致
	if (!check_pwd_again(loginPwdValue_again)) {
		layer.ready(function() {
			layer.msg("两次密码不一致,请重新输入！", {
				icon: 2,
				time: 1000
			}, function() {
				//改变样式
				$(".loginPwdValue_again").parent().parent().addClass("null_input");
				$(".loginPwdValue_again").focus();
			});
		})
		return;
	}

	//是否勾选用户协议
	if (!$(".check_agree_box").is(':checked')) {
		layer.ready(function() {
			layer.msg("请勾选用户协议！", {
				icon: 2,
				time: 1000
			}, function() {
				//改变勾选框样式
				$('.check_agree_box').addClass("null_input");
			});
		})
		return;
	}


	//md5加密
	loginPwdValue = hex_md5(loginPwdValue);

	var formData = new FormData();
	formData.append("userName", userName);
	formData.append("phone", phoneNumber);
	formData.append("idCardNum", idCardNumber);
	formData.append("password", loginPwdValue);
	formData.append("IdentityCode", identity_value_register);

	//请求注册
	$.ajax({
		url: PATH + "userInfo/register",
		type: "post",
		data: formData,
		contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		processData: false, // 告诉jQuery不要去处理发送的数据
		success: function(res) {
			console.log(res);
			if (res.state == 200) {
				layer.ready(function() {
					layer.msg("注册成功！", {
						icon: 1,
						time: 1000
					}, function() {
						//清空输入框的值
						$(".right_input_area input").val("");
						$(".identity_value_register").val("");
						$(".check_agree_box").prop("checked", false);
						//隐藏注册框
						$(".register_box_area").fadeOut();
						//隐藏验证码登录框
						$(".identityCode_box").fadeOut();
						//显示登录框
						$(".login_box_area").fadeIn();
					});
				})
			} else if (res.state == 500) {
				layer.ready(function() {
					layer.msg(res.message, {
						icon: 2,
						time: 3000
					}, function() {});
				})
			}
		},
		error: function(badRes) {}
	});
})

/**
 * 点击用户协议事件
 */
$(".user_agreement").bind("click", function(dom) {
	var html = document.getElementById("user_agreement_Modal").innerHTML;
	//页面层-自定义
	layer.open({
		type: 1,
		title: false,
		skin: 2,
		area: ['45%', '50vh'],
		shadeClose: true,
		scrollbar: false,
		resize: false,
		content: html,
		success: function() {
			//渲染layui表单元素_下拉框
			form.render()
		}
	});
})

//验证非空
function check_null(userName, phoneNumber, idCardNumber, loginPwdValue, loginPwdValue_again, identity_value_register) {
	var is_null = false;
	if (!notNull(userName)) {
		//改变样式
		$(".userName").parent().parent().addClass("null_input");
		is_null = true;
	}
	if (!notNull(phoneNumber)) {
		//改变样式
		$(".phoneNumber").parent().parent().addClass("null_input");
		is_null = true;
	}
	if (!notNull(idCardNumber)) {
		//改变样式
		$(".idCardNumber").parent().parent().addClass("null_input");
		is_null = true;
	}
	if (!notNull(loginPwdValue)) {
		//改变样式
		$(".loginPwdValue").parent().parent().addClass("null_input");
		is_null = true;
	}
	if (!notNull(loginPwdValue_again)) {
		//改变样式
		$(".loginPwdValue_again").parent().parent().addClass("null_input");
		is_null = true;
	}
	if (!notNull(identity_value_register)) {
		//改变样式
		$(".identity_value_register").parent().addClass("null_input");
		is_null = true;
	}
	return is_null;
}


/**
 * 点击获取验证码
 */
$(".getIdentityBtn_register").bind("click", function(dom) {
	//注册手机号
	var register_phone = $(".phoneNumber").val().trim();
	if (!notNull(register_phone)) {
		layer.ready(function() {
			layer.msg("请输入您的手机号", {
				icon: 2,
				time: 1000
			}, function() {
				$(".phoneNumber").focus();
			});
		})
		return;
	} else {
		//验证手机号格式
		if (isPoneAvailable(register_phone)) {
			//发送验证码--注册验证码
			send_sms_code(register_phone, "register");
		} else {
			layer.ready(function() {
				layer.msg("手机号码格式不正确", {
					icon: 2,
					time: 1000
				}, function() {
					$(".phoneNumber").focus();
				});
			})
		}
	}
})


// 验证二次确认密码是否一致
function check_pwd_again(pwd_again) {
	var first_pwd = $(".loginPwdValue").val();
	if (pwd_again == first_pwd) {
		return true;
	}
	return false;
}



// 验证身份证号格式
function isCardNo(num) {
	num = num.toUpperCase();
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		return false;
	}
	//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
	//下面分别分析出生日期和校验位 
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);

		//检查生日日期是否正确 
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bCorrectDay;
		bCorrectDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
			(
				dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bCorrectDay) {
			return false;
		} else {
			//将15位身份证转成18位 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return true;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);

		//检查生日日期是否正确 
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bCorrectDay;
		bCorrectDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
			(dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bCorrectDay) {
			return false;
		} else {
			//检验18位身份证的校验码是否正确。 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				return false;
			}
			return true;
		}
	}
	return false;
}
