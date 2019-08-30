/**
 * 初始化laydate
 */
$(function() {
	//加载layui组件
	initialLay();
	//验证登录
	check_is_login();
})

/**
 * 点击进入按钮事件
 */
$(".enter_btn").bind("click", function(dom) {

	var projectCode = $(".project_code").val();

	if (!notNull(projectCode)) {
		layer.ready(function() {
			layer.msg('请输入工地编码', {
				icon: 2,
				time: 1000
			}, function() {
				$(".project_code").focus();
			});
		})
		return;
	}

	//跳转至首页
	window.location.href = "../index/index.html?code=" + projectCode;
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
		$(".headShotIcon").attr("src",loginUser.headPortrait);
	} else {
		window.location.href = "../login/login.html";
	}
}


/**
 * 点击关闭按钮
 */
$(".close_btn").bind("click", function(dom) {
	//移除动画
	$(".add_project_Modal").removeClass("fadeInLeft");
	//添加动画
	$(".add_project_Modal").addClass("fadeOutLeft");

	//关闭弹窗
	// $(".add_project_Modal").hide();
})

/**
 * 点击创建新项目
 */
$(".create_new_project_btn").bind("click", function() {
	//显示弹窗
	$(".add_project_Modal").show();
	//移除动画
	$(".add_project_Modal").removeClass("fadeOutLeft");
	//添加动画
	$(".add_project_Modal").addClass("fadeInLeft");
})

//配置插件目录
layui.config({
	base: '../common/mods/',
	version: '1.0'
});

function initialLay() {
	//初始化 laydate 对象
	layui.use(['layer', 'laydate', 'form', 'layarea'], function() {
		var laydate = layui.laydate,
			form = layui.form,
			layarea = layui.layarea,
			layer = layui.layer;
		laydate.render({
			elem: "#establishTime",
			type: "datetime",
			format: "yyyy年M月d日H时m分s秒"
		});
		laydate.render({
			elem: "#commenceTime",
			type: "datetime",
			format: "yyyy年M月d日H时m分s秒"
		});
		layarea.render({
			elem: '#area-picker',
			change: function(res) {
				//选择结果
				console.log(res);
			}
		});
	})
}
