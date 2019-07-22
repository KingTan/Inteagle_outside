//当前屏幕可用区域
var clientWidth=document.body.clientWidth*0.85;
var clientHeight=$(window).height()*0.85;

var canvas = document.getElementById("myCanvas");
canvas.width = clientWidth;
canvas.height = clientHeight;

console.log()


// canvas.width = 1103;
// canvas.height = 653;

//绘制底图
var img = new Image();
	img.src = "img/foundation_SL.jpg";
	/**等图片资源加载完成后，才在 Canvas 上进行绘制渲染*/
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	}



//缩放倍数
var scaleNum=0.8;

//创建 context 对象
var ctx = canvas.getContext("2d");

ctx.scale(0.8,0.8);

//外圈
var tangram_inside =[{p:[{x:150,y:360},{x:310,y:720}]},{p:[{x:310,y:720},{x:360,y:730}]},
					{p:[{x:360,y:730},{x:475,y:680}]},{p:[{x:475,y:680},{x:550,y:665}]},
					{p:[{x:550,y:665},{x:1180,y:250}]},{p:[{x:1180,y:250},{x:1050,y:75}]},
					{p:[{x:1050,y:75},{x:180,y:240}]},{p:[{x:180,y:240},{x:150,y:360}]}];
//内圈
var tangram_outside =[{p:[{x:180,y:360},{x:320,y:680}]},{p:[{x:320,y:680},{x:365,y:695}]},
					 {p:[{x:365,y:695},{x:475,y:645}]},{p:[{x:475,y:645},{x:550,y:630}]},
					 {p:[{x:550,y:630},{x:1150,y:245}]},{p:[{x:1150,y:245},{x:1045,y:100}]},
					 {p:[{x:1045,y:100},{x:200,y:260}]},{p:[{x:200,y:260},{x:180,y:360}]}];
			
//绘制基坑
drawFoundation(tangram_inside,ctx);
			
//绘制基坑
function drawFoundation(tangram_inside,ctx){
	
	for(var i=0;i<tangram_inside.length;i++){
		drawLine(tangram_inside[i],ctx,"red");
		drawLine(tangram_outside[i],ctx,"gray");
		}
}
					
			
//绘制边线
function drawLine(tangram_inside,ctx,strokeStyle){
		ctx.beginPath();
		ctx.moveTo(tangram_inside.p[0].x,tangram_inside.p[0].y);  //定义开始绘制路径
		for(var j=1;j<tangram_inside.p.length;j++){
				ctx.lineTo(tangram_inside.p[j].x,tangram_inside.p[j].y);
			}
		ctx.closePath();
		ctx.strokeStyle=strokeStyle;
		ctx.lineWidth=2;
		ctx.stroke();
}
			
//小圆点
var pointArray=[{p:{x:150,y:360,r:5,checked:0,color:"black",id:"1"}},{p:{x:190,y:450,r:5,checked:0,color:"black",id:"2"}},
				{p:{x:247,y:580,r:5,checked:0,color:"black",id:"3"}},{p:{x:300,y:700,r:5,checked:0,color:"black",id:"4"}},
				{p:{x:360,y:730,r:5,checked:0,color:"black",id:"5"}},{p:{x:500,y:675,r:5,checked:0,color:"black",id:"6"}},
				{p:{x:575,y:650,r:5,checked:0,color:"black",id:"7"}},{p:{x:715,y:560,r:5,checked:0,color:"black",id:"8"}},
				{p:{x:850,y:468,r:5,checked:0,color:"black",id:"9"}},{p:{x:995,y:375,r:5,checked:0,color:"black",id:"10"}},
				{p:{x:1180,y:250,r:5,checked:0,color:"black",id:"11"}},{p:{x:1095,y:135,r:5,checked:0,color:"black",id:"12"}},
				{p:{x:1050,y:75,r:5,checked:0,color:"black",id:"13"}},{p:{x:900,y:103,r:5,checked:0,color:"black",id:"14"}},
				{p:{x:700,y:140,r:5,checked:0,color:"black",id:"15"}},{p:{x:500,y:178,r:5,checked:0,color:"black",id:"16"}},
				{p:{x:300,y:215,r:5,checked:0,color:"black",id:"17"}},{p:{x:180,y:240,r:5,checked:0,color:"black",id:"18"}}];
							
//绘制圆点				
drwaPoint(pointArray,ctx);

//绘制小圆点		
function drwaPoint(pointArray,ctx){
	
	//字体
	ctx.font="13px bold 黑体";
	//颜色
	ctx.fillStyle="black";
	//设置水平对齐方式
	ctx.textAlign="left";
	//设置垂直对齐方式
	ctx.textBaseline = "middle";
	
	for(var i=0;i<pointArray.length;i++){
		ctx.beginPath();
		ctx.arc(pointArray[i].p.x,pointArray[i].p.y,pointArray[i].p.r, 0, 2 * Math.PI,true);
		ctx.fillStyle=pointArray[i].p.color;
		ctx.stroke();
		ctx.fill();
		
		var x_rate=0;
		var y_rate=0;
		
		if(i>=4&&i<10){
			x_rate=pointArray[i].p.x;
			y_rate=pointArray[i].p.y+20;
		}else{
			if(i==10){
				x_rate=pointArray[i].p.x+20;
				y_rate=pointArray[i].p.y;
			}else if(i==11){
				x_rate=pointArray[i].p.x+20;
				y_rate=pointArray[i].p.y;
			}else{
				x_rate=pointArray[i].p.x-50;
				y_rate=pointArray[i].p.y;
			}
		}
		ctx.fillText("id:"+pointArray[i].p.id,x_rate,y_rate);
	}
	
}

//提示面板小圆点位置
var hitPanelArray=[{p:{x:1150,y:600,color:"blue"}},{p:{x:1150,y:650,color:"green"}},{p:{x:1150,y:700,color:"red"}}];

drawHitPanel(hitPanelArray,ctx);

//绘制提示面板
function drawHitPanel(hitPanelArray,ctx){
	for(var i=0;i<hitPanelArray.length;i++){
			ctx.beginPath();
			ctx.arc(hitPanelArray[i].p.x,hitPanelArray[i].p.y,5, 0, 2 * Math.PI,true);
			ctx.fillStyle=hitPanelArray[i].p.color;
			ctx.stroke();
			ctx.fill();
	}
	
	//绘制提示文字
	//字体
	ctx.font="16px bold 黑体";
	//颜色
	ctx.fillStyle="black";
	//设置水平对齐方式
	ctx.textAlign="left";
	//设置垂直对齐方式
	ctx.textBaseline = "middle";
	//绘制文字（参数：要写的字，x坐标，y坐标）
	ctx.fillText("选中", 1200, 600);
	ctx.fillText("数据正常",1200, 650);
	ctx.fillText("数据异常", 1200, 700);
}

//绑定点击事件
canvas.addEventListener("click", function(e) {
	//当前点击位置x y
	let eventX = e.clientX - canvas.getBoundingClientRect().left;
	let eventY = e.clientY - canvas.getBoundingClientRect().top;

	//判断是否选中圆点
	if (isInPoint(eventX, eventY) != null) {
		//当前选中圆点对象
		var checkedObj = isInPoint(eventX, eventY);
		
		console.log("checkedObj.id---",checkedObj.id);
		
		//跳转到对应圆点的 图表  页面
		 window.location.href = "charts.html?id=" + checkedObj.id+"&router=foundation";
	}
}, false)

//绑定鼠标移动事件
canvas.addEventListener("mousemove", function(e) {
	//当前点击位置x y
	let eventX = e.clientX - canvas.getBoundingClientRect().left;
	let eventY = e.clientY - canvas.getBoundingClientRect().top;

	//判断是否选中圆点
	if (isInPoint(eventX, eventY) != null) {
		canvas.style.cursor = "pointer";
		//改变样式
		// changePointStyle(isInPoint(eventX, eventY),ctx);
	} else {
		canvas.style.cursor = "default";
	}
}, false)

//根据圆点ID改变圆点的样式
function changePointStyle(checkedPointObj,ctx) {

	//获取当前选中点的对象
	var object = pointArray[checkedPointObj.id - 1];
	if (checkedPointObj.checked == 0) {
		//清除其他选中的圆点的样式
		for (var i = 0; i < pointArray.length; i++) {
			if (pointArray[i].p.checked == 1) {
				pointArray[i].p.r = pointArray[i].p.r - 5;
				pointArray[i].p.checked = 0;
				pointArray[i].p.color = "black";
			}
		}
		//修改半径
		object.p.r = object.p.r + 5;
		//修改选中状态
		object.p.checked = 1;
		//修改选中颜色
		object.p.color = "#002FFF";
		//替换
		pointArray.splice(checkedPointObj.id - 1, 1, object);
		
	} else {
		//修改半径
		object.p.r = object.p.r - 5;
		//修改选中状态
		object.p.checked = 0;
		//修改选中颜色
		object.p.color = "black";
		//替换
		pointArray.splice(checkedPointObj.id - 1, 1, object);
	}
	
	//清空所有画布
	ctx.clearRect(0, 0, 1024, 768);

	//绘制基坑
	drawFoundation(tangram_inside, ctx);
	//绘制小圆点
	drwaPoint(pointArray, ctx);
	//绘制提示面板
	drawHitPanel(hitPanelArray,ctx);
}

//是否在小圆点内部
function isInPoint(eventX, eventY) {
	var circleId = null;
	//圆点半径
	let radius = 5;
	//所有圆点数组
	var circleArray = [];
	for (var i = 0; i < pointArray.length; i++) {
		var circleObject = {
			id: pointArray[i].p.id,
			x1: pointArray[i].p.x*scaleNum - 5,
			x2: pointArray[i].p.x*scaleNum + 5,
			y1: pointArray[i].p.y*scaleNum - 5,
			y2: pointArray[i].p.y*scaleNum + 5,
			checked: pointArray[i].p.checked,
			color: pointArray[i].p.color
		}
		circleArray.push(circleObject);
	}
	for (var i = 0; i < circleArray.length; i++) {
		if (eventX > circleArray[i].x1 && eventX < circleArray[i].x2 && eventY > circleArray[i].y1 &&
			eventY < circleArray[i].y2) {
			// console.log("在圆内...");
			circleId = circleArray[i];
			break;
		}
	}
	return circleId;
}



			
				