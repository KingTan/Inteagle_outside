var table;

// 本地路径
// http://127.0.0.1:8080/layuiTableData
// 服务器路径
// https://www.inteagle.com.cn/Inteagle_java/layuiTableData

/**
 * 页面加载事件
 */
$(function() {

	layui.use('table', function() {
		table = layui.table;
		initialTable(table);
	});


})





/**
 * 删除所有数据
 */
$(".delDataBtn").bind("click", function() {
	$.ajax({
		url: "https://www.inteagle.com.cn/Inteagle_java/delHelmetSensorData",
		type: "post",
		data: {},
		success: function(res) {
			console.log("res", res);
			if (res.state == 500) {
				layer.ready(function() {
					layer.msg("数据删除失败", {
						icon: 2,
						time: 1000
					}, function() {});
				})
			} else {
				//跳转到index界面
				layer.ready(function() {
					layer.msg("删除成功", {
						icon: 1,
						time: 1000
					}, function() {
						//刷新列表
						table.reload("ztable", { //此处是上文提到的 初始化标识id
							page: {
								curr: 1 //重新从第 1 页开始
							},
							where: {
								time: new Date()
							},
						});
					});
				})
			}
		},
		error: function(badRes) {}
	});
})


/**
 * 导出所有数据excel
 */
$(".exportBtn").bind("click", function(dom) {
	//导出excel
	window.location.href = "https://www.inteagle.com.cn/Inteagle_java/exportHelmetSensorData";
})



/**
 * @param {Object} table
 * 初始化表格数据
 */
function initialTable(table) {
	table.render({
		id: "ztable",
		elem: '#test',
		method: "POST",
		url: 'https://www.inteagle.com.cn/Inteagle_java/layuiTableData',
		parseData: function(res) { //res 即为原始返回的数据
			console.log(res);
			return {
				"code": res.state, //解析接口状态
				"msg": res.message, //解析提示文本
				"count": res.data.total,
				"data": res.data.list //解析数据列表
			};
		},
		limit: 10,
		limits: 10,
		response: {
			statusCode: 200, //重新规定成功的状态码为 200，table 组件默认为 0
		},
		cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
			,
		cols: [
			[{
				field: 'unSignedId',
				width: '20%',
				title: '设备ID',
				sort: true
			}, {
				field: 'vol',
				width: '20%',
				title: '电压'
			}, {
				field: 'temp',
				width: '20%',
				title: '温度'
			}, {
				field: 'helmet_on',
				width: '20%',
				title: '是否戴帽'
			}, {
				field: 'inDate',
				width: '20%',
				title: '创建时间'
			}]
		],
		page: {
			//支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 1 页
			groups: 1, //只显示 1 个连续页码
			first: '首页', //不显示首页
			last: '末页', //不显示尾页
		}
	});
}
