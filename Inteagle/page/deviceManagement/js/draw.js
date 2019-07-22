//当前屏幕可用区域
var clientWidth=document.body.clientWidth*0.85;
var clientHeight=$(window).height()*0.85;

var canvas = document.getElementById("myCanvas");
// canvas.width = clientWidth;
// canvas.height = clientHeight;
// console.log("clientWidth-------",clientWidth);
// console.log("clientHeight-------",clientHeight);

canvas.width = 1131;
canvas.height = 653;

//绘制底图
var img = new Image();
img.src = "img/foundation_CR_SL.jpg";
/**等图片资源加载完成后，才在 Canvas 上进行绘制渲染*/
img.onload = function() {
	ctx.drawImage(img, 0, 0,1131,653);
	//绘制基坑
	drawFoundation(tangram_inside, ctx);
	//绘制小圆点
	drwaPoint(pointArray, ctx);
	//绘制提示面板
	drawHitPanel(hitPanelArray,ctx);
    
}


//缩放倍数
var scaleNum=1;

//创建 context 对象
var ctx = canvas.getContext("2d");

// ctx.scale(0.8,0.8);

//外圈
var tangram_inside =[{p:[{x:90,y:267},{x:200,y:590}]},{p:[{x:200,y:590},{x:250,y:610}]},
					{p:[{x:250,y:610},{x:365,y:560}]},{p:[{x:365,y:560},{x:450,y:545}]},
					{p:[{x:450,y:545},{x:965,y:210}]},{p:[{x:965,y:210},{x:900,y:10}]},
					{p:[{x:900,y:10},{x:120,y:230}]},{p:[{x:120,y:230},{x:90,y:267}]}];
//内圈
var tangram_outside =[{p:[{x:115,y:297},{x:210,y:580}]},{p:[{x:210,y:580},{x:250,y:598}]},
					 {p:[{x:250,y:598},{x:370,y:546}]},{p:[{x:370,y:546},{x:435,y:537}]},
					 {p:[{x:435,y:537},{x:950,y:210}]},{p:[{x:950,y:210},{x:895,y:30}]},
					 {p:[{x:895,y:30},{x:120,y:230}]},{p:[{x:140,y:250},{x:115,y:297}]}];
			
//绘制基坑
function drawFoundation(tangram_inside,ctx,color){
	
	for(var i=0;i<tangram_inside.length;i++){
		//外圈
		if(tangram_inside[i].p[0].x==900){
			console.log("1");
			//三次方贝塞尔曲线
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			ctx.moveTo(120,230);
			ctx.bezierCurveTo(120,230,665,20,900,10);
			ctx.stroke();
			ctx.globalCompositeOperation = 'source-over';
		}else{
			drawLine(tangram_inside[i],ctx,"red");
		}
		//内圈
		if(tangram_outside[i].p[0].x==895){
			console.log("2");
			//三次方贝塞尔曲线
			ctx.beginPath();
			ctx.strokeStyle = 'gray';
			ctx.moveTo(140,250);
			ctx.bezierCurveTo(140,250,665,20,895,30);
			ctx.stroke();
			ctx.globalCompositeOperation = 'source-over';
		}else{
			drawLine(tangram_outside[i],ctx,"gray");
		}
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
		ctx.lineWidth=3;
		ctx.stroke();
}
			
//小圆点
var pointArray=[{p:{x:90,y:267,r:5,checked:0,color:"black",id:"1"}},{p:{x:122,y:360,r:5,checked:0,color:"black",id:"2"}},
				{p:{x:163,y:480,r:5,checked:0,color:"black",id:"3"}},{p:{x:200,y:590,r:5,checked:0,color:"black",id:"4"}},
				{p:{x:250,y:610,r:5,checked:0,color:"black",id:"5"}},{p:{x:365,y:560,r:5,checked:0,color:"black",id:"6"}},
				{p:{x:450,y:545,r:5,checked:0,color:"black",id:"7"}},{p:{x:580,y:460,r:5,checked:0,color:"black",id:"8"}},
				{p:{x:700,y:382,r:5,checked:0,color:"black",id:"9"}},{p:{x:830,y:300,r:5,checked:0,color:"black",id:"10"}},
				{p:{x:965,y:210,r:5,checked:0,color:"black",id:"11"}},{p:{x:933,y:105,r:5,checked:0,color:"black",id:"12"}},
				{p:{x:900,y:10,r:5,checked:0,color:"black",id:"13"}},{p:{x:750,y:33,r:5,checked:0,color:"black",id:"14"}},
				{p:{x:550,y:83,r:5,checked:0,color:"black",id:"15"}},{p:{x:400,y:130,r:5,checked:0,color:"black",id:"16"}},
				{p:{x:230,y:190,r:5,checked:0,color:"black",id:"17"}},{p:{x:120,y:230,r:5,checked:0,color:"black",id:"18"}}];


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
var hitPanelArray=[{p:{x:950,y:550,color:"blue"}},{p:{x:950,y:590,color:"green"}},{p:{x:950,y:630,color:"red"}}];


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
	ctx.fillText("选中", 1000, 550);
	ctx.fillText("数据正常",1000, 590);
	ctx.fillText("数据异常", 1000, 630);
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



			
				