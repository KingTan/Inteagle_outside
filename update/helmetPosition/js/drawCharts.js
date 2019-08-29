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
		center: ['45%', '50%'],
		data: [{
				value: 335,
				name: '一线工人---' + 335 + "人"
			},
			{
				value: 310,
				name: '管理人员' + 310 + "人"
			},
			{
				value: 234,
				name: '塔吊司机' + 234 + "人"
			},
			{
				value: 135,
				name: '塔机司机' + 135 + "人"
			},
			{
				value: 1548,
				name: '后勤人员' + 1548 + "人"
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
