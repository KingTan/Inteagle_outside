//右边canvas
var canvas_right = document.getElementById("toolCanvas_right");
canvas_right.width = 30;
canvas_right.height = 100;
var ctx_right = canvas_right.getContext("2d");

//左边canvas
var canvas_left = document.getElementById("toolCanvas_left");
canvas_left.width = 30;
canvas_left.height = 100;
var ctx_left = canvas_left.getContext("2d");

/**
 * canvas绘制拉托工具
 */
function canvasTool() {
	//绘制底图
	drawTool();
	//绘制箭头
	drawArrow();
	var fns = [drawTool, drawArrow];
	
	//绑定鼠标移动事件
	canvas_right.addEventListener("mousemove", function(e) {
		//当前点击位置x y
		let eventX = e.clientX - canvas_right.getBoundingClientRect().left;
		let eventY = e.clientY - canvas_right.getBoundingClientRect().top;
		//判断是否在工具内部
		// isInPoint(eventX, eventY, fns);
		canvas_right.style.cursor = "pointer";
	}, false)
	//绑定鼠标移动事件
	canvas_right.addEventListener("click", function(e) {
		//修改iframe的宽度
		$(".mainFrame").css("width","88.5%");
		//隐藏中间菜单栏
		$(".middleMenu").hide(200);	
		//显示左边拖拉工具
		$(".left_canvas").show(300);
		
	}, false);
	
	//绑定鼠标移动事件
	canvas_left.addEventListener("mousemove", function(e) {
		//当前点击位置x y
		let eventX = e.clientX - canvas_left.getBoundingClientRect().left;
		let eventY = e.clientY - canvas_left.getBoundingClientRect().top;
		//判断是否在工具内部
		// isInPoint(eventX, eventY, fns);
		canvas_left.style.cursor = "pointer";
	}, false)
	//绑定鼠标移动事件
	canvas_left.addEventListener("click", function(e) {
			//修改iframe的宽度
		$(".mainFrame").css("width","77%");
		//隐藏左边拖拉工具
		$(".left_canvas").hide(300);
		//显示中间菜单栏
		$(".middleMenu").show(300);	
	
	}, false)
	
	

}
//绘制底图
function drawTool() {
	
	//右边canvas
	ctx_right.beginPath();
	//三次方贝塞尔曲线
	// ctx_right.moveTo(100, 0);
	// ctx_right.bezierCurveTo(100, 0, 45, 45, 100, 100);
	ctx_right.moveTo(30, 0);
	ctx_right.bezierCurveTo(30, 0, -30, 45, 30, 100);
	ctx_right.fillStyle = "#024B7F";
	ctx_right.strokeStyle = "#024B7F";
	ctx_right.fill();
	ctx_right.stroke();
	ctx_right.closePath();
	
	//左边canvas
	ctx_left.beginPath();
	//三次方贝塞尔曲线
	// ctx_right.moveTo(100, 0);
	// ctx_right.bezierCurveTo(100, 0, 45, 45, 100, 100);
	ctx_left.moveTo(0, 0);
	ctx_left.bezierCurveTo(0, 0, 60, 45, 0, 100);
	ctx_left.fillStyle = "#024B7F";
	ctx_left.strokeStyle = "#024B7F";
	ctx_left.fill();
	ctx_left.stroke();
	ctx_left.closePath();
	
}
//绘制箭头
function drawArrow() {
	//左箭头
	var img_left = new Image();
	img_left.src = "img/left_arrow.png";
	/**等图片资源加载完成后，才在 Canvas 上进行绘制渲染*/
	img_left.onload = function() {
		ctx_right.drawImage(img_left, 8, 38, 20, 20);
	}
	
	//右箭头
	var img_right = new Image();
	img_right.src = "img/right_arrow.png";
	/**等图片资源加载完成后，才在 Canvas 上进行绘制渲染*/
	img_right.onload = function() {
		ctx_left.drawImage(img_right, 3, 38, 20, 20);
	}
}

//是否在canvas内部
function isInPoint(x, y, fns) {
	// 遍历绘制图形
	for (var i = fns.length; i--;) {
		fns[i]();
		// 每绘制一个图形就判断一次当前鼠标的坐标是否在这个图形上，然后进行自定义操作
		if (ctx_right.isPointInPath(x, y)) {
			canvas_right.style.cursor = "pointer";
		} else {
			canvas_right.style.cursor = "default";
		}
	}
}
