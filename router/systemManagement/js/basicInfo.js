var click_edit = 0;

/**
 * 页面加载事件
 */
$(function() {
	//页面加载完成关闭过度动画
	closeAnimattion();
})

/**
 * 点击编辑事件
 */
$(".edit_text").bind("click", function(dom) {
	var edit_text;
	click_edit++;
	if (click_edit % 2 == 0) {
		edit_text = "编辑";
		$(".edit_val").show();
		$(".right_input_value").hide();
	} else {
		edit_text = "完成";
		$(".edit_val").hide();
		$(".right_input_value").show();
	}
	//赋值
	$(".email").text($(".email_val").val());
	$(".job_unit").text($(".job_unit_val").val());
	$(".department").text($(".department_val").val());
	$(".edit_text").text(edit_text);
})


/**
 * 点击修改头像按钮
 */
$(".change_head_icon").bind("click", function(dom) {
	//调用上传文件
	$(".input_head_icon").click();
})

/**
 * 上传文件 显示图片预览图
 */
$(".input_head_icon").on('change', function() {
	var filePath = $(this).val(),
		fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
		src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
	// 检查是否是图片
	if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
		error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
		return;
	} else {
		$('.head_icon_pic').attr('src', src);
	}
});
