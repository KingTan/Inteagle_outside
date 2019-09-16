// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('leftBottomCharts'));

var option = {
	title: {
		text: '',
		subtext: '',
		x: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	series: [{
		name: getNowFormatDate(),
		type: 'pie',
		radius: '55%',
		center: ['50%', '40%'],
		label: {
			normal: {
				textStyle: {
					color: '#FFFFFF',
					fontWeight: 'normal',
					fontSize: 15
				}
			}
		},
		labelLine: {
			normal: {
				lineStyle: {
					color: '#014A7E'
				},
				smooth: 0.2,
				length: 10,
				length2: 20
			}
		},
		legendHoverLink: true,
		data: [{
				value: 335,
				name: '项目登记人数 \n' + 335 + "人",
				nameStyle: {
					size: 15
				}
			},
			{
				value: 310,
				name: '管理人员 \n' + 310 + "人"
			},
			{
				value: 234,
				name: '来访人员 \n' + 234 + "人"
			},
			{
				value: 135,
				name: '施工人员 \n' + 135 + "人"
			}
		],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
