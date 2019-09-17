//深层水平位移初始数据
var data_array=	[{"2019/8/8 08:00:00":[{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 09:00:00":[{"x":22,"y":12},{"x":20,"y":12},{"x":28,"y":26},{"x":19,"y":32},{"x":12,"y":33},{"x":11,"y":12},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 10:00:00":[{"x":32,"y":33},{"x":13,"y":22},{"x":16,"y":33},{"x":32,"y":14},{"x":42,"y":21},{"x":22,"y":32},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 11:00:00":[{"x":15,"y":24},{"x":46,"y":35},{"x":34,"y":26},{"x":25,"y":28},{"x":23,"y":12},{"x":33,"y":43},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 12:00:00":[{"x":23,"y":16},{"x":25,"y":38},{"x":25,"y":18},{"x":45,"y":36},{"x":12,"y":18},{"x":44,"y":23},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]},
					{"2019/8/8 13:00:00":[{"x":24,"y":46},{"x":32,"y":25},{"x":27,"y":32},{"x":32,"y":32},{"x":34,"y":29},{"x":21,"y":12},{"x":12,"y":20},{"x":24,"y":20},{"x":38,"y":30},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":21,"y":25},{"x":-17,"y":27},{"x":15,"y":36},{"x":-17,"y":27}]}
];
				
//顶部水平位移初始数据
var top_data_array=[
		{"2019/09/17 08:00:00":[{"x":10,"y":18}]},
		{"2019/09/17 08:00:05":[{"x":15,"y":36}]},
		{"2019/09/17 08:00:10":[{"x":20,"y":45}]},
		{"2019/09/17 08:00:15":[{"x":25,"y":5}]},
		{"2019/09/17 08:00:20":[{"x":10,"y":-20}]},
		{"2019/09/17 08:00:25":[{"x":0,"y":-10}]},
		{"2019/09/17 08:00:30":[{"x":-25,"y":5}]},
		{"2019/09/17 08:00:35":[{"x":10,"y":-8}]}
];				
	
				
//当前选中的时间
var current_check_time = "";

//X轴显示的数据(深层水平位移)
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
	// //横轴 时间_天  纵轴 深度  值 速率
	// var x_data = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];
	// var days = ['8-11', '8-12', '8-13', '8-14', '8-15', '8-16', '8-17'];
	// //数据数组
	// var data = [];
	// for (var i = 0; i < 7; i++) {
	// 	for (var j = 0; j < 16; j++) {
	// 		var single_data = [i, j, Math.floor(Math.random() * 10 + 1)]; //生成0-9的随机数
	// 		data.push(single_data);
	// 	}
	// }
	//横轴 时间_天  纵轴 深度  值 速率
	var x_data = ['0', '2', '4', '6', '8', '10', '12','14', '16', '18', '20', '22','24', '26', '28', '30'];
	var days = ['8-11'];
	var data = [[0,0,9],[0,1,3],[0,2,4],[0,3,1],[0,4,1],[0,5,6],[0,6,7],
				[0,7,2],[0,8,5],[0,9,2],[0,10,4],[0,11,5],[0,12,9],[0,13,8],
				[0,14,1],[0,15,8]];
				
	data = data.map(function(item) {
		return [item[1], item[0], item[2] || '-'];
	});
	var option = {
		title: {
			text: 'x轴',
			x: 'center',
			top:'20%',
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
			height: '40%',
			left: '0%',
			right: '4%',
			top: '35%',
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
	// var x_data = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];
	// var days = ['8-11', '8-12', '8-13', '8-14', '8-15', '8-16', '8-17'];
	// //数据数组
	// var data = [];
	// for (var i = 0; i < 7; i++) {
	// 	for (var j = 0; j < 16; j++) {
	// 		var single_data = [i, j, Math.floor(Math.random() * 10 + 1)]; //生成0-9的随机数
	// 		data.push(single_data);
	// 	}
	// }
	var x_data = ['0', '2', '4', '6', '8', '10', '12','14', '16', '18', '20', '22','24', '26', '28', '30'];
	var days = ['8-11'];
	var data = [[0,0,9],[0,1,3],[0,2,4],[0,3,1],[0,4,1],[0,5,6],[0,6,7],
				[0,7,2],[0,8,5],[0,9,2],[0,10,4],[0,11,5],[0,12,9],[0,13,8],
				[0,14,1],[0,15,8]];
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
			height: '40%',
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
 * 绘制顶部水平位移图表
 */
function draw_top_charts(top_data_single){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById("horizontal_charts"));
	//横轴时间数据
	var x_time_data=[];
	//x轴数据
	var x_rate_data=[];
	//y轴数据
	var y_rate_data=[];
	if(top_data_single!=null&&top_data_single!=undefined){
		top_data_array.push(top_data_single);
	}
	if(top_data_array.length>7){
		//删除数组第一个元素
		top_data_array.shift();
	}
	for(var i=0;i<top_data_array.length;i++){
		var json_data = top_data_array[i]; 
		for(var key in json_data){
			x_time_data.push(key);
			var single_json_data=json_data[key];
			x_rate_data.push(single_json_data[0].x);
			y_rate_data.push(single_json_data[0].y);
		}
	}
	x_time_data=x_time_data.map(function(str){
		return str.replace("2019/",'');
	})
	var option = {
		color:['#D53A35','#FBE289'],
	    title: {
	        text: '顶部水平位移',
			x: 'center',
			textStyle: {
				color: '#FFFFFF'
			}
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['x轴位移','y轴位移'],
			top:'10%',
			textStyle:{
				color:"#FFFFFF"
			}
	    },
		grid: [{
			left: 50,
			right: 50,
			top:'20%',
			height: '60%'
		}],
	    xAxis:  {
	        type: 'category',
	        boundaryGap: false,
			axisLine: {
				onZero: false,
				lineStyle: {
					type: 'solid',
					color: '#FFFFFF'
				}
			},
	        data: x_time_data
	    },
	    yAxis: {
			name: '位移量(mm)',
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
	    series: [
	        {
	            name:'x轴位移',
	            type:'line',
	            data:x_rate_data,
				smooth:true,
	            markPoint: {
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	        },
	        {
	            name:'y轴位移',
	            type:'line',
	            data:y_rate_data,
				smooth:true,
				markPoint: {
				    data: [
				        {type: 'max', name: '最大值'},
				        {type: 'min', name: '最小值'}
				    ]
				},
	        }
	    ]
	};
	//折线图
	myChart.setOption(option);
}

/**
 * 绘制顶部水平位移速率图表
 */
function draw_top_speed_charts(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById("top_speed_charts"));
	var	option = {
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	            axisTick: {
	                alignWithLabel: true
	            },
				axisLine: {
					onZero: false,
					lineStyle: {
						type: 'solid',
						color: '#FFFFFF'
					}
				}
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
				axisLine: {
					onZero: false,
					lineStyle: {
						type: 'solid',
						color: '#FFFFFF'
					}
				}
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            barWidth: '60%',
	            data:[10, 52, 200, 334, 390, 330, 220]
	        }
	    ]
	};
	//折线图
	myChart.setOption(option);
}


