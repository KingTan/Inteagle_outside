/**
 * 导出所有数据excel
 */
$(".exportBtn").bind("click", function(dom) {
	//导出excel
	window.location.href = "https://www.inteagle.com.cn/Inteagle_java/exportHelmetPositionData";
})

// 本地路径
// http://127.0.0.1:8080/getHelmetData
// 服务器路径
// https://www.inteagle.com.cn/Inteagle_java/getHelmetData

var table ;

/**
 * 删除所有数据
 */
$(".delDataBtn").bind("click", function() {
	$.ajax({
		url: "https://www.inteagle.com.cn/Inteagle_java/delAllIdInfoData",
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
							where: {
								type: "all",
								id: "ztable"
							}
						});
					});
				})
			}
		},
		error: function(badRes) {}
	});
})

layui.use('table', function() {
	table = layui.table;
	table.render({
		id: "ztable",
		elem: '#demo',
		url: 'https://www.inteagle.com.cn/Inteagle_java/getHelmetData',
		parseData: function(res) { //res 即为原始返回的数据
			console.log(res);
			return {
				"code": res.state, //解析接口状态
				"msg": res.message, //解析提示文本
				"count": res.data.total,
				"data": res.data.list //解析数据列表
			};
		},
		response: {
			statusCode: 200, //重新规定成功的状态码为 200，table 组件默认为 0
		},
		cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
			,
		cols: [
			[{
				field: 'id',
				width: '16%',
				title: '设备ID',
				sort: true
			}, {
				field: 'camera_id',
				width: '16%',
				title: '相机ID'
			}, {
				field: 'x',
				width: '16%',
				title: 'x_Data'
			}, {
				field: 'y',
				width: '16%',
				title: 'y_Data'
			}, {
				field: 't',
				width: '16%',
				title: 't_Data'
			}, {
				field: 'createTime',
				width: '21%',
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
});
