//初始化 大echarts
function inintialEcharts(id, rate, data) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('bigCharts'));
	var text = 'id:' + id + ' ' + rate;
	//表格配置项
	var option = {
		title: {
			text: text
		},
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			data: data.map(function(item) {
				return item[0];
			})
		},
		yAxis: {
			splitLine: {
				show: false
			}
		},
		toolbox: {
			left: 'center',
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				restore: {},
				saveAsImage: {}
			}
		},
		dataZoom: [{
			startValue: '2019-06-01'
		}, {
			type: 'inside'
		}],
		series: {
			name: text,
			type: 'line',
			data: data.map(function(item) {
				return item[1];
			}),
			markLine: {
				silent: true,
				data: [{
					yAxis: 50
				}, {
					yAxis: 100
				}, {
					yAxis: 150
				}, {
					yAxis: 200
				}, {
					yAxis: 300
				}]
			}
		}
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

//初始化 小echarts
function inintialSLEcharts(data) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('slChars'));
	var text = "围护桩体和土体深层侧向位移偏移速率";
	//表格配置项
	var option = {
		title: {
			text: text
		},
		tooltip: {
			trigger: 'axis'
		},
		xAxis: {
			data: data.map(function(item) {
				return item[0];
			})
		},
		yAxis: {
			splitLine: {
				show: false
			}
		},
		dataZoom: [{
			startValue: '2019-06-01'
		}, {
			type: 'inside'
		}],
		series: {
			name: text,
			type: 'line',
			data: data.map(function(item) {
				return item[1];
			}),
			markLine: {
				silent: true,
				data: [{
					yAxis: 50
				}, {
					yAxis: 100
				}, {
					yAxis: 150
				}, {
					yAxis: 200
				}, {
					yAxis: 300
				}]
			}
		}
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

//位移图
function drawRate() {
	var canvas = document.getElementById("rightCanvas");
	canvas.width = 225;
	canvas.height = 380;

	// 获取设备像素比
	console.log("window.devicePixelRatio-------", window.devicePixelRatio);
	
	var ctx = canvas.getContext("2d");
	//绘制矩形
	ctx.beginPath();
	ctx.moveTo(0, 0); //定义开始绘制路径
	ctx.strokeRect(20.5, 20.5, 185, 340);
	ctx.closePath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.stroke();

	//绘制x,y轴对应的值
	//字体
	ctx.font = "10px  MicrosoftYaHei";
	//颜色
	ctx.fillStyle = "black";
	//设置水平对齐方式
	ctx.textAlign = "center";
	//设置垂直对齐方式
	ctx.textBaseline = "middle";
	//绘制文字（参数：x坐标，y坐标,值）
	var numberList=[{p:{x:20,y:10,number:0}},{p:{x:81,y:10,number:5}},{p:{x:143,y:10,number:10}},{p:{x:205,y:10,number:15}},
					{p:{x:10,y:20,number:0}},{p:{x:10,y:76,number:2}},{p:{x:10,y:133,number:4}},{p:{x:10,y:189,number:6}},
					{p:{x:10,y:246,number:8}},{p:{x:10,y:303,number:10}},{p:{x:10,y:360,number:12}}];
	for (var i = 0; i < numberList.length; i++) {
		ctx.fillText(numberList[i].p.number, numberList[i].p.x, numberList[i].p.y);
	}
	//绘制坐标轴
	var numberRateList=[{p:[{x:81,y:20},{x:81,y:30}]},{p:[{x:143,y:20},{x:143,y:30}]},
						{p:[{x:20,y:76},{x:30,y:76}]},{p:[{x:20,y:133},{x:30,y:133}]},
						{p:[{x:20,y:189},{x:30,y:189}]},{p:[{x:20,y:246},{x:30,y:246}]},{p:[{x:20,y:303},{x:30,y:303}]}];				
	for(var i=0;i<numberRateList.length;i++){
		ctx.beginPath();
		ctx.moveTo(numberRateList[i].p[0].x,numberRateList[i].p[0].y);  //定义开始绘制路径
		for(var j=1;j<numberRateList[i].p.length;j++){
				ctx.lineTo(numberRateList[i].p[j].x,numberRateList[i].p[j].y);
			}
		ctx.closePath();
		ctx.lineWidth=1;
		ctx.stroke();
	}
	
	drawDisplacementFilter(ctx);

}

//绘制位移曲线
function drawDisplacementFilter(ctx){
	
	//x,y轴开始坐标
	var x_begin=20;
	var y_begin=20;
	
	//x,y轴 一刻度的倍率
	var x_rate=12.3;
	var y_rate=28.3;
	
	//数据刻度线
	var disLineList=[{p:[{"x":(x_begin+x_rate*7),"y":(y_begin+y_rate*0),"color":"#FF0000"},{"x":(x_begin+x_rate*5.2),"y":(y_begin+y_rate*1),"color":"#FF0000"}]},
	 			 {p:[{"x":(x_begin+x_rate*5.2),"y":(y_begin+y_rate*1),"color":"#FED432"},{"x":(x_begin+x_rate*5.2),"y":(y_begin+y_rate*2),"color":"#FED432"}]},
	 			 {p:[{"x":(x_begin+x_rate*5.2),"y":(y_begin+y_rate*2),"color":"#FED432"},{"x":(x_begin+x_rate*4.5),"y":(y_begin+y_rate*3),"color":"#00C00B"}]},
	 			 {p:[{"x":(x_begin+x_rate*4.5),"y":(y_begin+y_rate*3),"color":"#00C00B"},{"x":(x_begin+x_rate*4),"y":(y_begin+y_rate*4),"color":"#00C00B"}]},
	 			 {p:[{"x":(x_begin+x_rate*4),"y":(y_begin+y_rate*4),"color":"#00C00B"},{"x":(x_begin+x_rate*3),"y":(y_begin+y_rate*5),"color":"#00C00B"}]},
	 			 {p:[{"x":(x_begin+x_rate*3),"y":(y_begin+y_rate*5),"color":"#00C00B"},{"x":(x_begin+x_rate*2.5),"y":(y_begin+y_rate*6),"color":"#00C00B"}]},
				 {p:[{"x":(x_begin+x_rate*2.5),"y":(y_begin+y_rate*6),"color":"#00C00B"},{"x":(x_begin+x_rate*2),"y":(y_begin+y_rate*7),"color":"#00C00B"}]},
				 {p:[{"x":(x_begin+x_rate*2),"y":(y_begin+y_rate*7),"color":"#00C00B"},{"x":(x_begin+x_rate*0),"y":(y_begin+y_rate*8),"color":"#00C00B"}]},
				 {p:[{"x":(x_begin+x_rate*0),"y":(y_begin+y_rate*8),"color":"#00C00B"},{"x":(x_begin+x_rate*0),"y":(y_begin+y_rate*9),"color":"#00C00B"}]},
				 {p:[{"x":(x_begin+x_rate*0),"y":(y_begin+y_rate*9),"color":"#00C00B"},{"x":(x_begin+x_rate*0),"y":(y_begin+y_rate*10),"color":"#00C00B"}]}];
	
	for(var i=0;i<disLineList.length;i++){
		ctx.beginPath();
		ctx.moveTo(disLineList[i].p[0].x,disLineList[i].p[0].y);  //定义开始绘制路径
		for(var j=1;j<disLineList[i].p.length;j++){
				ctx.lineTo(disLineList[i].p[j].x,disLineList[i].p[j].y);
				ctx.strokeStyle=disLineList[i].p[j].color;	
			}
		ctx.lineWidth=1;
		ctx.closePath();
		ctx.stroke();
		
		//绘制矩形
		ctx.beginPath();
		ctx.fillStyle="rgba(205,36,35,1)";
		ctx.fillRect(disLineList[i].p[0].x-4,disLineList[i].p[0].y, 7, 7);
		ctx.closePath();
	}
	
	
	
	
	
}



/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam(paramName) {
	paramValue = "", isFound = !1;
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
		while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
			paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
	}
	return paramValue == "" && (paramValue = null), paramValue
}
