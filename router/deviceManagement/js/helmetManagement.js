/**
 * 页面加载事件
 */
$(function() {
	//关闭过度动画
	closeAnimattion();
	//获取路由、设置样式
	getRouterPath();
	//拼接数据表格
	appendTable();
})

/**
 * @param {Object} path
 * 设置菜单样式
 */
function setmenuStyle(path) {
	//移除选中样式
	$(".left_bottom_options ul li").removeClass("checked_option");
	//中间显示标题
	var middleTitle;
	switch (path) {
		case "router":
			middleTitle = "摄像头";
			$(".left_bottom_options ul li[data-index='router']").addClass("checked_option");
			break;
		case "camera":
			middleTitle = "单灯";
			$(".left_bottom_options ul li[data-index='camera']").addClass("checked_option");
			break;
		case "helmet":
			middleTitle = "基坑电机";
			$(".left_bottom_options ul li[data-index='helmet']").addClass("checked_option");
			break;
		case "electric":
			middleTitle = "测斜仪";
			$(".left_bottom_options ul li[data-index='electric']").addClass("checked_option");
			break;
	}
	$(".middle_title_value").text(middleTitle);
}

/**
 * 左边菜单点击事件
 */
$(".left_bottom_options ul li").bind("click", function(dom) {
	var data_index = dom.currentTarget.dataset.index;
	setmenuStyle(data_index);
	
	//显示列表 隐藏详情
	$(".device_list").show();
	$(".device_detail").hide();
	
})

/**
 * 获得页面跳转路由、设置样式
 */
function getRouterPath() {
	var path = getParam("path");
	setmenuStyle(path);
}

/**
 * 点击查看 查看设备详情
 */
$(".get_device_detail").bind("click", function(dom) {
	$(".device_list").hide();
	$(".device_detail").show();
	//弹窗隐藏完全之后执行的事件
	$(".device_detail").promise().done(function(arg) {
		//绘制电池饼图
		drawPieCharts();
	})
})

/**
 * 绘制电量饼图
 */
function drawPieCharts() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('right_pie_charts'));
	var value=0.1;
	var option = {
		backgroundColor: 'transparent',
		graphic: [{
			type: 'group',
			left: 'center',
			bottom: 10,
			children: []
		}],
		series: [{
			type: 'liquidFill',
			radius: '70%',
			center: ['40%', '40%'],
			data: [{
					value: 0.15,
					itemStyle: {
						normal: { //正常样式
							color: '#D53A35',
							opacity: 0.6
						}
					}
				}, {
					value: 0.16,
					itemStyle: {
						normal: { //正常样式
							color: '#D53A35',
							opacity: 0.6
						}
					}
				},
				{
					value: 0.1,
					itemStyle: {
						normal: { //正常样式
							color: '#D53A35',
							opacity: 0.6
						}
					}
				}
			],
			backgroundStyle: {
				borderWidth: 5,
				borderColor: '#1daaeb',
				color: '#428FD4'
			},
			label: {
				normal: {
					formatter: (value * 100).toFixed(2) + '%',
					textStyle: {
						fontSize: 20,
						color:'#001832'
					}
				}
			}
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}


/**
 * 拼接表格数据
 */
function appendTable() {
	var shtml = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	var zhtml = "";
	for (var i = 0; i < 7; i++) {
		zhtml += shtml;
	}
	$(".data_table tbody").append(zhtml);
}
