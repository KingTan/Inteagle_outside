var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数


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
				break;
			case "idCardNumber":
				//验证身份证号格式是否正确
				if (!isCardNo(current_value)) {
					//改变样式
					$(target).parent().parent().addClass("null_input");
				};
				break;
			case "loginPwdValue":
				break;
			case "loginPwdValue_again":
				if(!check_pwd_again(current_value)){
					//改变样式
					$(target).parent().parent().addClass("null_input");
				}
				break;
		}
	}
})



/**
 * 点击注册
 */
$(".registerBtn").bind("click", function(dom) {
	var userName = $(".userName").val(); //用户名
	var phoneNumber = $(".phoneNumber").val(); //手机号
	var idCardNumber = $(".idCardNumber").val(); //身份证号
	var loginPwdValue = $(".loginPwdValue").val(); //登录密码
	var loginPwdValue_again = $(".loginPwdValue_again").val(); //确认登录密码
	var identity_value_register = $(".identity_value_register").val(); //验证码
})



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
			var target = dom.currentTarget;
			curCount = count;
			// 设置button效果，开始计时
			$(".getIdentityBtn_register").attr("disabled", true); //设置按钮为禁用状态
			$(".getIdentityBtn_register").text(curCount + "秒后重获"); //更改按钮文字
			InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器timer处理函数，1秒执行一次
			//发送验证码--注册验证码
			send_sms_code(register_phone, "Register_Code");
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


// 判断是否为手机号
function isPoneAvailable(phone) {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
};

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
