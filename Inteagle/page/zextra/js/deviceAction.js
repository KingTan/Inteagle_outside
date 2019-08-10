/**
 * 页面加载事件
 */
$(function() {

})

// 本地路径
// http://127.0.0.1:8080/getDeviceActionList

// 服务器路径
// https://www.inteagle.com.cn/Inteagle_java/getDeviceActionList

layui.use('table', function() {
	var table = layui.table;
	table.render({
		elem: '#test',
		url: 'https://www.inteagle.com.cn/Inteagle_java/getDeviceActionList',
		parseData: function(res) { //res 即为原始返回的数据
			console.log(res);

			var dataList = res.data.list;
			
			var data_array=[];

			for (var i = 0; i < dataList.length; i++) {
				
				var action_str = "";
				var device_type_str = "";
				
				if (dataList[i].action == 0) {
					action_str = "on"
				}else if(dataList[i].action == 1){
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
				
				var dataObj={
					"action_str":action_str,
					"device_type_str":device_type_str,
					"priority":dataList[i].priority,
					"inDate":dataList[i].inDate
				};
				
				data_array.push(dataObj);
			}
			console.log("data_array-------",data_array);

			return {
				"code": res.state, //解析接口状态
				"msg": res.message, //解析提示文本
				"count": res.data.total,
				"data": data_array//解析数据列表
			};
		},
		response: {
			statusCode: 200, //重新规定成功的状态码为 200，table 组件默认为 0
		},
		cols: [
			[{
				field: 'action_str',
				width: '25%',
				title: '设备行为'
			}, {
				field: 'device_type_str',
				width: '25%',
				title: '设备类型'
			}, {
				field: 'priority',
				width: '25%',
				title: '优先级'
			}, {
				field: 'inDate',
				width: '26%',
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
});
