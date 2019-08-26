/**
 * 页面加载事件
 */
$(function(){
	
})

/**
 * 点击注册账号
 */
$(".register_text").on("click",function(){
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
$(".return_login").on("click",function(){
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
$(".identityCode_text").on("click",function(){
	//隐藏注册框
	$(".register_box_area").fadeOut();
	//隐藏验证码登录框
	$(".login_box_area").fadeOut();
	//显示登录框
	$(".identityCode_box").fadeIn();
})
