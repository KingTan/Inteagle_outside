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
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(10,10);
	ctx.lineWidth=2;
	ctx.closePath();
	ctx.stroke();
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
