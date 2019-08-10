// socket消息处理
if (window.parent.webSocket != null) {
	window.parent.webSocket.writeScreen = function(res) {
		if (res.senderType == 4) {
			console.log("心跳..");
			return;
		} else {
			console.log(res);
			//判断是否mqtt发送过来的数据
			if (res.messageType == "mqtt") {
				//调接口发送的数据
				if (res.invoke == "send") {
					
					// layui.use('table', function(){
					//   var table = layui.table;
					//   table.render({
					//     elem: '#test'
					//     ,url: 'https://www.inteagle.com.cn/Inteagle_java/layuiTableData'
					//     ,parseData: function(res){ //res 即为原始返回的数据
					// 		console.log(res);
					// 		return {
					// 		  "code": res.state, //解析接口状态
					// 		  "msg": res.message, //解析提示文本
					// 		  "count":res.data.total,
					// 		  "data": res.data.list //解析数据列表
					// 		};
					// 	},
					// 	response: {
					//            statusCode: 200 ,//重新规定成功的状态码为 200，table 组件默认为 0
					// 	}
					// 	,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
					//     ,cols: [[
					// 	   {field:'id', width:'20%', title: '设备ID',sort: true}
					//       ,{field:'vol', width:'20%', title: '电压'}
					//       ,{field:'temp', width:'20%', title: '温度'}
					//       ,{field:'helmet_on',width: '20%', title: '是否戴帽'} 
					//       ,{field:'inDate', width:'20%', title: '创建时间'}
					//     ]]
					// 	,page:{
					// 		//支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					//       layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
					//       ,curr: 1 //设定初始在第 1 页
					//       ,groups: 1 //只显示 1 个连续页码
					//       ,first: '首页' //不显示首页
					//       ,last: '末页', //不显示尾页
					// 	}
					//   });
					// });
					
					
				} else if (res.invoke == "receive") {
					
					
					
					
				}
			}
		}
	}
}
