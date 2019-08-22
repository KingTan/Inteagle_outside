var data_array=	[{"2019/8/8 08:00:00":[{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 09:00:00":[{"x":22,"y":12},{"x":20,"y":12},{"x":28,"y":26},{"x":19,"y":32},{"x":12,"y":33},{"x":11,"y":12},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 10:00:00":[{"x":32,"y":33},{"x":13,"y":22},{"x":16,"y":33},{"x":32,"y":14},{"x":42,"y":21},{"x":22,"y":32},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 11:00:00":[{"x":15,"y":24},{"x":46,"y":35},{"x":34,"y":26},{"x":25,"y":28},{"x":23,"y":12},{"x":33,"y":43},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 12:00:00":[{"x":23,"y":16},{"x":25,"y":38},{"x":25,"y":18},{"x":45,"y":36},{"x":12,"y":18},{"x":44,"y":23},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 13:00:00":[{"x":24,"y":46},{"x":32,"y":25},{"x":27,"y":32},{"x":32,"y":32},{"x":34,"y":29},{"x":21,"y":12},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]}
				];
//当前选中的时间
var current_check_time = "";

//X轴显示的数据
var x_rate_data = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];


/**
 * @param {Object} single_x_data
 * @param {Object} single_y_data
 * 返回单个折线图option配置项
 */
function setSingleOption(single_x_data, single_y_data) {
	// 单个配置项
	var singleOption = {
		title: {
			text: '深层水平位移',
			x: 'center',
			textStyle: {
				color: '#FFFFFF'
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params, ticket, callback) {
				var htmlStr = '';
				for (var i = 0; i < params.length; i++) {
					var param = params[i];
					var xName = param.name; //x轴的名称
					var seriesName = param.seriesName; //图例名称
					var value = param.value; //y轴值
					var color = param.color; //图例颜色

					xName = "当前深度:" + xName + "米";

					if (i === 0) {
						htmlStr += current_check_time + '<br/>'; //当前选中时间
						htmlStr += xName + '<br/>'; // 当前深度
					}
					htmlStr += '<div>';
					//为了保证和原来的效果一样，这里自己实现了一个点的效果
					htmlStr +=
						'<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
						color + ';"></span>';

					//圆点后面显示的文本
					htmlStr += seriesName + '：' + value;

					htmlStr += '</div>';
				}
				return htmlStr;
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
				nameTextStyle: {
					color: '#FFFFFF'
				},
				boundaryGap: false,
				axisLine: {
					onZero: false,
					lineStyle: {
						type: 'solid',
						color: '#FFFFFF'
					}
				},
				data: x_rate_data
			},
			{
				gridIndex: 1,
				name: '深度(m)',
				type: 'category',
				nameGap: 5,
				nameTextStyle: {
					color: '#FFFFFF'
				},
				boundaryGap: false,
				axisLine: {
					onZero: false,
					lineStyle: {
						type: 'solid',
						color: '#FFFFFF'
					}
				},
				data: x_rate_data
			}
		],
		yAxis: [{
				name: 'x_位移量(mm)',
				nameGap: 20,
				nameTextStyle: {
					color: '#FFFFFF'
				},
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#FFFFFF'
					}
				},
				max: 50,
				min: -50
			},
			{
				gridIndex: 1,
				nameGap: 30,
				name: 'y_位移量(mm)',
				nameTextStyle: {
					color: '#FFFFFF'
				},
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#FFFFFF'
					}
				},
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
				data: single_x_data,
				itemStyle: {
					normal: {
						lineStyle: {
							color: 'red'
						}
					}
				}
			},
			{
				name: 'y_位移量',
				type: 'line',
				xAxisIndex: 1,
				yAxisIndex: 1,
				symbolSize: 8,
				hoverAnimation: true,
				data: single_y_data,
				itemStyle: {
					normal: {
						lineStyle: {
							color: 'yellow'
						}
					}
				}
			}
		]
	};
	return singleOption;
}
/**
 * @param {Object} id
 * @param {Object} data_single_array_all
 * @param {Object} showTimeLine
 * 绘制折线图 option
 */
function drawLineCharts(id, data_single_array_all, showTimeLine) {
	// 总时间数组
	var timeData = [];

	//总配置项数组
	var data_option = [];

	//实时接收的单个数据
	// console.log("data_array_single-----------",data_single_array_all);

	if (data_single_array_all != null && data_single_array_all != undefined) {
		data_array.push(data_single_array_all);
	}

	if (data_array.length > 7) {
		//删除第一个元素
		data_array.shift();
	}

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
			data_option.push(setSingleOption(single_x_data, single_y_data));
		}
	}

	timeData = timeData.map(function(str) {
		return str.replace('2019/', '');
	});

	//当前选中时间
	current_check_time = timeData[timeData.length - 1];

	// 总配置项
	var option = {
		baseOption: {
			timeline: {
				show: showTimeLine,
				bottom: 0,
				left: 36,
				right: 36,
				lineStyle: {
					color: '#FFFFFF'
				},
				itemStyle: {
					color: '#FFFFFF'
				},
				label: {
					color: '#FFFFFF'
				},
				type: 'slider',
				axisType: 'category',
				// autoPlay: true,
				// playInterval: 1000,
				currentIndex: data_array.length - 1,
				loop: false,
				symbol: 'circle',
				symbolSize: 10,
				data: timeData,
				controlStyle: {
					showPlayBtn: false,
					itemSize: 12,
					color: '#FFFFFF',
					borderColor: '#FFFFFF'
				}
			},
		},
		options: data_option
	};
	return option;
}


/**
 * 绘制热力图option_X
 */
function drawHeatMapX() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById("heat_x"));

	//横轴 时间_天  纵轴 深度  值 速率
	var x_data = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];

	var days = ['8-11', '8-12', '8-13', '8-14', '8-15', '8-16', '8-17'];

	//数据数组
	var data = [];
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 16; j++) {
			var single_data = [i, j, Math.floor(Math.random() * 10 + 1)]; //生成0-9的随机数
			data.push(single_data);
		}
	}

	data = data.map(function(item) {
		return [item[1], item[0], item[2] || '-'];
	});

	var option = {
		title: {
			text: 'x轴',
			x: 'center',
			textStyle: {
				color: '#FFFFFF'
			}
		},
		visualMap: {
			show: false,
			min: 0,
			max: 10,
			calculable: true,
			orient: 'horizontal',
			left: 'center',
			bottom: '15%'
		},
		tooltip: {
			trigger: 'item',
			formatter: function(params, ticket, callback) {
				var shtml = "时间:" + days[params.value[1]] + "<br/>";
				shtml += "当前深度:" + params.name + "米<br/>";
				shtml += "速率:" + params.value[2];

				return shtml;
			}
		},
		animation: false,
		grid: {
			height: '80%',
			left: '0%',
			right: '4%',
			top: '15%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			name: '深度',
			data: x_data,
			splitArea: {
				show: true
			},
			axisLine: {
				lineStyle: {
					color: '#FFFFFF'
				}
			}
		},
		yAxis: {
			type: 'category',
			name: '日期',
			data: days,
			splitArea: {
				show: true
			},
			axisLine: {
				lineStyle: {
					color: '#FFFFFF'
				}
			}
		},
		series: [{
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
	myChart.setOption(option);
}

/**
 * 绘制热力图option_Y
 */
function drawHeatMapY() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById("heat_y"));

	var x_data = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];

	var days = ['8-11', '8-12', '8-13', '8-14', '8-15', '8-16', '8-17'];

	//数据数组
	var data = [];
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 16; j++) {
			var single_data = [i, j, Math.floor(Math.random() * 10 + 1)]; //生成0-9的随机数
			data.push(single_data);
		}
	}

	data = data.map(function(item) {
		return [item[1], item[0], item[2] || '-'];
	});

	var option = {
		title: {
			text: 'y轴',
			x: 'center',
			textStyle: {
				color: '#FFFFFF'
			}
		},
		visualMap: {
			show: false,
			min: 0,
			max: 10,
			calculable: true,
			orient: 'horizontal',
			left: 'center',
			bottom: '15%'
		},
		tooltip: {
			trigger: 'item',
			formatter: function(params, ticket, callback) {
				var shtml = "时间:" + days[params.value[1]] + "<br/>";
				shtml += "当前深度:" + params.name + "米<br/>";
				shtml += "速率:" + params.value[2];
		
				return shtml;
			}
		},
		animation: false,
		grid: {
			height: '80%',
			left: '0%',
			right: '4%',
			top: '15%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: x_data,
			name: '深度',
			splitArea: {
				show: true
			},
			axisLine: {
				lineStyle: {
					color: '#FFFFFF'
				}
			}
		},
		yAxis: {
			type: 'category',
			data: days,
			name: '日期',
			splitArea: {
				show: true
			},
			axisLine: {
				lineStyle: {
					color: '#FFFFFF'
				}
			}
		},
		series: [{
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
	myChart.setOption(option);
}

//初始化 echarts
function inintialEcharts(dom, id, data_single_array_all, showTimeLine) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(dom));
	//折线图
	myChart.setOption(drawLineCharts(id, data_single_array_all, showTimeLine));
}

/**
 * 数据对比图 配置项
 */
function twoChartsOption() {

	// 单个配置项
	var singleOption = {
		title: {
			text: '深层水平位移',
			x: 'center',
			textStyle: {
				color: '#FFFFFF'
			}
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params, ticket, callback) {
				var htmlStr = '';
				for (var i = 0; i < params.length; i++) {
					var param = params[i];
					var xName = param.name; //x轴的名称
					var seriesName = param.seriesName; //图例名称
					var value = param.value; //y轴值
					var color = param.color; //图例颜色
					xName = "当前深度:" + xName + "米";
					if (i === 0) {
						htmlStr += current_check_time + '<br/>'; //当前选中时间
						htmlStr += xName + '<br/>'; // 当前深度
					}
					htmlStr += '<div>';
					//为了保证和原来的效果一样，这里自己实现了一个点的效果
					htmlStr +=
						'<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
						color + ';"></span>';
					//圆点后面显示的文本
					htmlStr += seriesName + '：' + value;
					htmlStr += '</div>';
				}
				return htmlStr;
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
				nameTextStyle: {
					color: '#FFFFFF'
				},
				boundaryGap: false,
				axisLine: {
					onZero: false,
					lineStyle: {
						type: 'solid',
						color: '#FFFFFF'
					}
				},
				data: x_rate_data
			},
			{
				gridIndex: 1,
				name: '深度(m)',
				type: 'category',
				nameGap: 5,
				nameTextStyle: {
					color: '#FFFFFF'
				},
				boundaryGap: false,
				axisLine: {
					onZero: false,
					lineStyle: {
						type: 'solid',
						color: '#FFFFFF'
					}
				},
				data: x_rate_data
			}
		],
		yAxis: [{
				name: 'x_位移量(mm)',
				nameGap: 20,
				nameTextStyle: {
					color: '#FFFFFF'
				},
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#FFFFFF'
					}
				},
				max: 50,
				min: -50
			},
			{
				gridIndex: 1,
				nameGap: 30,
				name: 'y_位移量(mm)',
				nameTextStyle: {
					color: '#FFFFFF'
				},
				type: 'value',
				axisLine: {
					lineStyle: {
						color: '#FFFFFF'
					}
				},
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
				data: single_x_data,
				itemStyle: {
					normal: {
						lineStyle: {
							color: 'red'
						}
					}
				}
			},
			{
				name: 'y_位移量',
				type: 'line',
				xAxisIndex: 1,
				yAxisIndex: 1,
				symbolSize: 8,
				hoverAnimation: true,
				data: single_y_data,
				itemStyle: {
					normal: {
						lineStyle: {
							color: 'yellow'
						}
					}
				}
			}
		]
	};
}






/**
 * 当前选中时间-当前时间 数据对比图
 */
function makeTwoCharts(dom, id, data_single_array_all, showTimeLine) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(dom));
	//折线图
	myChart.setOption(drawLineCharts(id, data_single_array_all, showTimeLine));
}
