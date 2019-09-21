/**
 * 初始化laydate
 */
$(function() {
	//验证登录
	check_is_login();
})


/**
 * 跳转到首页
 */
$(".toIndex").bind("click", function(dom) {
	var data_index = dom.currentTarget.dataset.index;
	window.location.href = "../index/index.html?path=" + data_index;
})


/**
 * 验证是否登录
 */
function check_is_login() {
	var session_login_user = sessionStorage.getItem("LoginUserInfo");
	if (session_login_user != null && session_login_user != undefined && session_login_user != "") {
		var loginUser = JSON.parse(session_login_user);
		//用户名
		$(".loginUserName").text(loginUser.userName);
		//头像
		$(".headShotIcon").attr("src", loginUser.headPortrait);
	} else {
		window.location.href = "../login/login.html";
	}
}
