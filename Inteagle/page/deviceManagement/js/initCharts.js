//初始化 大echarts
function inintialEcharts(id, data_single_array_all) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('bigCharts'));
	//X轴显示的数据
	var x_rate_data = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

	// 总时间数组
	var timeData = [];
	
	//总配置项数组
	var data_option = [];
	
	//总数据数组
	var data_array = [];
	
	// var data_array=	[{"2019/8/6 08:00:00":[{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
	// 				{"2019/8/6 09:00:00":[{"x":22,"y":12},{"x":20,"y":12},{"x":28,"y":26},{"x":19,"y":32},{"x":12,"y":33},{"x":11,"y":12},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
	// 				{"2019/8/6 10:00:00":[{"x":32,"y":33},{"x":13,"y":22},{"x":16,"y":33},{"x":32,"y":14},{"x":42,"y":21},{"x":22,"y":32},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
	// 				{"2019/8/6 11:00:00":[{"x":15,"y":24},{"x":46,"y":35},{"x":34,"y":26},{"x":25,"y":28},{"x":23,"y":12},{"x":33,"y":43},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
	// 				{"2019/8/6 12:00:00":[{"x":23,"y":16},{"x":25,"y":38},{"x":25,"y":18},{"x":45,"y":36},{"x":12,"y":18},{"x":44,"y":23},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
	// 				{"2019/8/6 13:00:00":[{"x":24,"y":46},{"x":32,"y":25},{"x":27,"y":32},{"x":32,"y":32},{"x":34,"y":29},{"x":21,"y":12},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]}
	// 			];
	
	if (data_single_array_all != null && data_single_array_all != undefined) {
		data_array = data_array.concat(data_single_array_all)
	}

	console.log("data-array------------", data_array);
	
	for (var i = 0; i < data_array.length; i++) {
		var single_x_data = [];
		var single_y_data = [];
		var json_data = data_array[i];
		//获取所有的时间
		for (var key in json_data) {
			timeData.push(key);
			var singleData = json_data[key];
			for (var j = 0; j < singleData.length; j++) {
				single_x_data.push(singleData[j].x);
				single_y_data.push(singleData[j].y)
			}
			// console.log("single_x_data----------", single_x_data);
			// console.log("single_y_data------------", single_y_data)
			data_option.push(setSingleOption(single_x_data, single_y_data));
		}
	}

	timeData = timeData.map(function(str) {
		return str.replace('2019/', '');
	});

	console.log("data_option", data_option);

	function setSingleOption(single_x_data, single_y_data) {
		// 单个配置项
		var singleOption = {
			title: {
				text: '深层水平位移',
				x: 'center'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					animation: false
				}
			},
			legend: {
				data: ['位移量', '位移量'],
				x: 'left'
			},
			axisPointer: {
				link: {
					xAxisIndex: 'all'
				}
			},
			grid: [{
				left: 50,
				right: 50,
				height: '30%'
			}, {
				left: 50,
				right: 50,
				top: '55%',
				height: '30%'
			}],
			xAxis: [{
					type: 'category',
					name: '深度(m)',
					nameGap: 5,
					boundaryGap: false,
					axisLine: {
						onZero: false,
						lineStyle: {
							type: 'solid'
						}
					},
					data: x_rate_data
				},
				{
					gridIndex: 1,
					name: '深度(m)',
					type: 'category',
					nameGap: 5,
					boundaryGap: false,
					axisLine: {
						onZero: false,
						lineStyle: {
							type: 'solid'
						}
					},
					data: x_rate_data
				}
			],
			yAxis: [{
					name: 'x_位移量(mm)',
					nameGap: 20,
					type: 'value',
					max: 50,
					min: -50
				},
				{
					gridIndex: 1,
					nameGap: 30,
					name: 'y_位移量(mm)',
					type: 'value',
					max: 50,
					min: -50,
					inverse: false
				}
			],
			series: [{
					name: 'x_位移量',
					type: 'line',
					symbolSize: 8,
					hoverAnimation: true,
					data: single_x_data
				},
				{
					name: 'y_位移量',
					type: 'line',
					xAxisIndex: 1,
					yAxisIndex: 1,
					symbolSize: 8,
					hoverAnimation: true,
					data: single_y_data
				}
			]
		};

		return singleOption;
	}

	// 总配置项
	var option = {
		baseOption: {
			timeline: {
				show: true,
				bottom: 0,
				left: 80,
				type: 'slider',
				axisType: 'category',
				// autoPlay: true,
				// playInterval: 1000,
				currentIndex: data_array.length - 1,
				loop: false,
				symbolSize: 10,
				data: timeData,
				controlStyle: {
					showPlayBtn: false
				}
			},
		},
		options: data_option
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

}

//初始化热力图
function initHeatCharts(data) {

}

//初始化 右下echarts
function inintialRightSLEcharts(data) {

	//显示echarts
	// $("#rightCharts").show();

	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('rightCharts'));
	var text = "累计水平位移";
	//表格配置项
	var option = {
		title: {
			text: text,
			x: 'center',
			y: 'top',
			textAlign: 'left',
			textStyle: {
				fontSize: 13,
				fontFamily: 'MicrosoftYaHei-Bold',
				color: 'rgba(53,78,101,1)',
			}
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
			type: 'slider'
		}],
		visualMap: {
			top: 10,
			right: 10,
			precision: 1,
			pieces: [{
				min: 0,
				max: 0.1,
				color: '#00C00B'
			}, {
				min: 0.1,
				max: 0.2,
				color: '#FF9B00'
			}, {
				min: 0.2,
				max: 0.3,
				color: '#CD2423'
			}, {
				max: 0,
				min: -0.1,
				color: '#00C00B'
			}, {
				max: -0.1,
				min: -0.2,
				color: '#FF9B00'
			}, {
				max: -0.2,
				min: -0.3,
				color: '#CD2423'
			}],
			outOfRange: {
				color: '#CD2423'
			}
		},
		series: {
			name: text,
			type: 'line',
			smooth: true,
			data: data.map(function(item) {
				return item[1];
			}),
		}
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

//初始化 小echarts
function inintialSLEcharts(data) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('slChars'));
	var hours = ['08:00:00', '08:10:00', '08:20:00', '08:30:00', '08:40:00', '08:50:00', '09:00:00'];

	var days = ['1m', '2m', '3m',
		'4m', '5m', '6m', '7m'
	];

	data = [
		[0, 0, 1],
		[1, 0, 2],
		[2, 0, 3],
		[3, 0, 4],
		[0, 1, 5],
		[1, 1, 6],
		[2, 1, 7]
	];

	data = data.map(function(item) {
		return [item[1], item[0], item[2] || '-'];
	});

	option = {
		tooltip: {
			position: 'top'
		},
		animation: false,
		grid: {
			height: '50%',
			y: '10%'
		},
		xAxis: {
			type: 'category',
			name: "时间",
			data: hours,
			splitArea: {
				show: true
			}
		},
		yAxis: {
			type: 'category',
			name: "深度",
			data: days,
			splitArea: {
				show: true
			}
		},
		visualMap: {
			min: 0,
			max: 10,
			calculable: true,
			orient: 'horizontal',
			left: 'center',
			bottom: '15%'
		},
		series: [{
			name: '水平位移',
			type: 'heatmap',
			data: data,
			label: {
				normal: {
					show: true
				}
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	/* var text = "围护桩体和土体深层侧向位移偏移速率";
	//表格配置项
	var option = {
		title: {
			text: text,
			x:'center',
			y:'top',
			textAlign:'left',
			textStyle: {
			   fontSize:13,
			   fontFamily:'MicrosoftYaHei-Bold',
			   color:'rgba(53,78,101,1)',
			}
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
			type: 'slider'
		}],
		series: {
			name: text,
			type: 'line',
			smooth: true,
			data: data.map(function(item) {
				return item[1];
			}),
			markLine: {
				silent: true,
				symbolSize:[6,6],
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
	}; */
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

//位移图
function drawRate() {

	//显示画布
	$(".rightCanvas").show();

	var canvas = document.getElementById("rightCanvas");
	canvas.width = 280;
	canvas.height = 300;
	var ctx = canvas.getContext("2d");
	//绘制矩形
	ctx.beginPath();
	ctx.moveTo(0, 0); //定义开始绘制路径
	ctx.strokeRect(20.5, 20.5, 245, 240);
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
	var numberList = [{
			p: {
				x: 20.5,
				y: 10,
				number: 0
			}
		}, {
			p: {
				x: 102,
				y: 10,
				number: 5
			}
		}, {
			p: {
				x: 183,
				y: 10,
				number: 10
			}
		}, {
			p: {
				x: 265,
				y: 10,
				number: 15
			}
		},
		{
			p: {
				x: 10,
				y: 20,
				number: 0
			}
		}, {
			p: {
				x: 10,
				y: 60,
				number: 2
			}
		}, {
			p: {
				x: 10,
				y: 100,
				number: 4
			}
		}, {
			p: {
				x: 10,
				y: 140,
				number: 6
			}
		},
		{
			p: {
				x: 10,
				y: 180,
				number: 8
			}
		}, {
			p: {
				x: 10,
				y: 220,
				number: 10
			}
		}, {
			p: {
				x: 10,
				y: 260,
				number: 12
			}
		}
	];
	for (var i = 0; i < numberList.length; i++) {
		ctx.fillText(numberList[i].p.number, numberList[i].p.x, numberList[i].p.y);
	}
	//绘制坐标轴
	var numberRateList = [{
			p: [{
				x: 102,
				y: 20
			}, {
				x: 102,
				y: 30
			}]
		}, {
			p: [{
				x: 183,
				y: 20
			}, {
				x: 183,
				y: 30
			}]
		},
		{
			p: [{
				x: 20,
				y: 60
			}, {
				x: 30,
				y: 60
			}]
		}, {
			p: [{
				x: 20,
				y: 100
			}, {
				x: 30,
				y: 100
			}]
		},
		{
			p: [{
				x: 20,
				y: 140
			}, {
				x: 30,
				y: 140
			}]
		}, {
			p: [{
				x: 20,
				y: 180
			}, {
				x: 30,
				y: 180
			}]
		}, {
			p: [{
				x: 20,
				y: 220
			}, {
				x: 30,
				y: 220
			}]
		}
	];
	for (var i = 0; i < numberRateList.length; i++) {
		ctx.beginPath();
		ctx.moveTo(numberRateList[i].p[0].x, numberRateList[i].p[0].y); //定义开始绘制路径
		for (var j = 1; j < numberRateList[i].p.length; j++) {
			ctx.lineTo(numberRateList[i].p[j].x, numberRateList[i].p[j].y);
		}
		ctx.closePath();
		ctx.lineWidth = 1;
		ctx.stroke();
	}

	drawDisplacementFilter(ctx);

}

//绘制位移曲线
function drawDisplacementFilter(ctx) {

	//x,y轴开始坐标
	var x_begin = 20;
	var y_begin = 20;

	//x,y轴 一刻度的倍率
	var x_rate = 16.3;
	var y_rate = 20;

	//数据刻度线
	var disLineList = [{
			p: [{
				"x": (x_begin + x_rate * 7),
				"y": (y_begin + y_rate * 0),
				"color": "#FF0000"
			}, {
				"x": (x_begin + x_rate * 5.2),
				"y": (y_begin + y_rate * 1),
				"color": "#FF0000"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 5.2),
				"y": (y_begin + y_rate * 1),
				"color": "#FED432"
			}, {
				"x": (x_begin + x_rate * 5.2),
				"y": (y_begin + y_rate * 2),
				"color": "#FED432"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 5.2),
				"y": (y_begin + y_rate * 2),
				"color": "#FED432"
			}, {
				"x": (x_begin + x_rate * 4.5),
				"y": (y_begin + y_rate * 3),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 4.5),
				"y": (y_begin + y_rate * 3),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 4),
				"y": (y_begin + y_rate * 4),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 4),
				"y": (y_begin + y_rate * 4),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 3),
				"y": (y_begin + y_rate * 5),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 3),
				"y": (y_begin + y_rate * 5),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 2.5),
				"y": (y_begin + y_rate * 6),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 2.5),
				"y": (y_begin + y_rate * 6),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 2),
				"y": (y_begin + y_rate * 7),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 2),
				"y": (y_begin + y_rate * 7),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 0),
				"y": (y_begin + y_rate * 8),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 0),
				"y": (y_begin + y_rate * 8),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 0),
				"y": (y_begin + y_rate * 9),
				"color": "#00C00B"
			}]
		},
		{
			p: [{
				"x": (x_begin + x_rate * 0),
				"y": (y_begin + y_rate * 9),
				"color": "#00C00B"
			}, {
				"x": (x_begin + x_rate * 0),
				"y": (y_begin + y_rate * 10),
				"color": "#00C00B"
			}]
		}
	];

	for (var i = 0; i < disLineList.length; i++) {
		ctx.beginPath();
		ctx.moveTo(disLineList[i].p[0].x, disLineList[i].p[0].y); //定义开始绘制路径
		for (var j = 1; j < disLineList[i].p.length; j++) {
			ctx.lineTo(disLineList[i].p[j].x, disLineList[i].p[j].y);
			ctx.strokeStyle = disLineList[i].p[j].color;
			ctx.fillStyle = disLineList[i].p[j].color;
		}
		ctx.lineWidth = 1;
		ctx.closePath();
		ctx.stroke();

		//绘制矩形
		ctx.beginPath();
		ctx.fillRect(disLineList[i].p[0].x - 5, disLineList[i].p[0].y, 6, 6);
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
