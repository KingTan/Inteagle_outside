var table;

// 本地路径
// http://127.0.0.1:8080/getDeviceActionList
// 服务器路径
// https://www.inteagle.com.cn/Inteagle_java/getDeviceActionList

/**
 * 页面加载事件
 */
$(function() {

	layui.use(['form', 'table'], function() {
		var form = layui.form,
			table = layui.table;
		//初始渲染设备行为表格
		initialDeviceAction(table);
		form.on('select(table_type)', function(data) {
			var value = data.value;
			console.log("value-----", typeof(value));
			switch (value) {
				case "1":
					console.log("1");
					//设备行为
					//初始渲染设备行为表格
					$(".deviceTableArea").show();
					initialDeviceAction(table);
					$(".helmetSensorTableArea").hide();
					$(".receiveTableArea").hide();
					break;
				case "2":
					console.log("2");
					//基坑电池
					//初始渲染电池表格
					$(".helmetSensorTableArea").show();
					initialHelmetSensor(table);
					$(".deviceTableArea").hide();
					$(".receiveTableArea").hide();
					break;
				case "3":
					console.log("3");
					//人员定位
					//初始渲染电池表格
					$(".receiveTableArea").show();
					initialReceiveTable(table);
					$(".helmetSensorTableArea").hide();
					$(".deviceTableArea").hide();
					break;
			}
		});
	})
})



/**
 * 初始化设备行为的方法
 */
function initialDeviceAction(table) {
	table.render({
		id: "action_table",
		elem: '#device_table',
		cache: false,
		even: false,
		loading: true,
		method: "POST", //设置POST请求 防止页面数据缓存
		where: {
			type: "all"
		},
		url: 'https://www.inteagle.com.cn/Inteagle_java/getDeviceActionList',
		parseData: function(res) { //res 即为原始返回的数据
			console.log(res);
			var dataList = res.data.list;
			var data_array = [];
			for (var i = 0; i < dataList.length; i++) {
				var action_str = "";
				var device_type_str = "";
				if (dataList[i].action == 0) {
					action_str = "on"
				} else if (dataList[i].action == 1) {
					action_str = "off"
				}
				switch (dataList[i].device_type) {
					case 0:
						device_type_str = "6LBR";
						break;
					case 1:
						device_type_str = "HELMET";
						break;
					case 2:
						device_type_str = "CAMERA_MASTER";
						break;
					case 3:
						device_type_str = "CAMERA_SLAVE";
						break;
					case 4:
						device_type_str = "MOTOR";
						break;
					case 5:
						device_type_str = "IMU";
						break;
					default:
						device_type_str = "未知";
						break;
				}
				var dataObj = {
					"device_id": dataList[i].unSignedId,
					"action_str": action_str,
					"device_type_str": device_type_str,
					"priority": dataList[i].priority,
					"inDate": dataList[i].inDate
				};
				data_array.push(dataObj);
			}
			return {
				"code": res.state, //解析接口状态
				"msg": res.message, //解析提示文本
				"count": res.data.total,
				"data": data_array //解析数据列表
			};
		},
		response: {
			statusCode: 200, //重新规定成功的状态码为 200，table 组件默认为 0
		},
		cols: [
			[{
				field: 'device_id',
				width: '20%',
				title: '设备ID'
			}, {
				field: 'action_str',
				width: '20%',
				title: '设备行为'
			}, {
				field: 'device_type_str',
				width: '20%',
				title: '设备类型'
			}, {
				field: 'priority',
				width: '20%',
				title: '优先级'
			}, {
				field: 'inDate',
				width: '21%',
				title: '创建时间'
			}]
		],
		page: {
			//支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
				,
			curr: 1 //设定初始在第 1 页
				,
			groups: 1 //只显示 1 个连续页码
				,
			first: '首页' //不显示首页
				,
			last: '末页', //不显示尾页
		}
	});
}

/**
 * @param {Object} table
 * 初始化电池表格数据
 */
function initialHelmetSensor(table) {
	table.render({
		id: "sensor_table",
		elem: '#helmet_table',
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

/**
 * 初始化人员定位数据
 */
function initialReceiveTable(table) {
	table.render({
		id: "receive_table",
		elem: '#receive_table',
		method: "POST",
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
				field: 'unSignedId',
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
}

/**
 * 删除设备行为数据
 */
$(".delDataBtn").bind("click", function(e) {
	var type = e.currentTarget.dataset.type;
	switch (type) {
		case "device_action_del":
			$.ajax({
				url: "https://www.inteagle.com.cn/Inteagle_java/delDeviceAction",
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
								table.reload("action_table", { //此处是上文提到的 初始化标识id
									page: {
										curr: 1 //重新从第 1 页开始
									},
									where: {
										time: new Date()
									},
									cache: false
								});
							});
						})
					}
				},
				error: function(badRes) {}
			});
			break;
		case "helmet_sensor_del":
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
								table.reload("sensor_table", { //此处是上文提到的 初始化标识id
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
			break;
		case "receive_del":
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
								table.reload("receive_table", { //此处是上文提到的 初始化标识id
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
			break;
	}

})
