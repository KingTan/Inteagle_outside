
var userId="ivan";

//消息的类型 --新的
var NEWMESSAGETYPE = {
	"text": 1, //文字
	"picture": 2, //图片
	"voice": 3, //语音
	"video": 4, //视频
	"notice": "notice", //提醒
	"event": "event" //自定义事件
}

//心跳消息
var heartbeatPack = {
	"messageId": uuid(8,2),
	"senderUserId": userId,
	"senderType": 4,
	"messageStatus": 1,
	"sendTime": getNowFormatDate()
}

//封装原型添加方法
Function.prototype.addSocketMethod = function(name, fn) {
	this.prototype[name] = fn;
	return this
}

//创建一个原型
var socketEntity = function() {};

socketEntity
	//添加获取玩状态方法，注意：navigator.onLine只会在机器未连接到局域网或路由器时返回false，其他情况下均返回true。
	.addSocketMethod("getNetWorkState", function() {
		//		(callback && typeof(callback) === "function") && callback(evt.data);
		return window.navigator.onLine
	})
	.addSocketMethod("webSocketState", {
		CONNECTING: 0,
		OPEN: 1,
		CLOSING: 2,
		CLOSED: 3
	})
	.addSocketMethod("timedTask", {})
	//添加心跳包发送方法
	.addSocketMethod("heartbeatPackage", function(ws) {
		var that = this;
		that.timedTask.heartbeat = setInterval(function() {
			// console.log("发送心跳包")
			that.ws.sendMsg(JSON.stringify(heartbeatPack));
		}, 10000);
	})
	//添加连接地址
	.addSocketMethod("wsServer", null)
	//添加接收信息后的输出方法
	.addSocketMethod("writeScreen", null)
	//是否主动关闭
	.addSocketMethod("isInitiative", false)
	//添加webscket对象
	.addSocketMethod("ws", null)
	.addSocketMethod("onlineTodo", null)
	.addSocketMethod("offlineTodo", null)
	//添加网络状态监听方法
	.addSocketMethod("netListener", function() {
		var that = this;
		if(that.onlineTodo == null) {
			that.onlineTodo = function() {
				console.log('网络已经连接！');
				console.log(that.webSocketState)
				if(that.ws != null) {
					switch(that.ws.readyState) {
						case that.webSocketState.CONNECTING:
							break;
						case that.webSocketState.OPEN:
							break;
						case that.webSocketState.CLOSING:
							break;
						case that.webSocketState.CLOSED:
							console.log("关闭状态下重连...");
							that.connect();
							break;
						default:
							console.log("未知状态下重连...");
							that.connect();
							break;
					}
				}
			}
		}
		if(that.offlineTodo == null) {
			that.offlineTodo = function() {
				console.log('网络已断开！websocket关闭');
				that.ws.close();
			}
		}
		window.removeEventListener('online', that.onlineTodo);
		window.removeEventListener('offline', that.offlineTodo);
		window.addEventListener('online', that.onlineTodo);
		window.addEventListener('offline', that.offlineTodo);
	})
	//添加页面关闭事件
	.addSocketMethod("onbeforeunload", function() {
		var that = this;
		window.onbeforeunload = function(evt) {
			//alert(evt)
			that.ws.close();
		};
	})
	//
	.addSocketMethod("connect", function(callback) {
		var that = this;
		var netState = that.getNetWorkState();
		if(netState == false) {
			console.log("网络连接未打开,请检查网络设置");
			return;
		}
		window.WebSocket = window.WebSocket || window.MozWebSocket;
		if(!window.WebSocket) {
			this.error('Error: WebSocket is not supported.');
			return;
		}
		that.ws = new WebSocket(that.wsServer);
		that.ws.onopen = function(evt) {
			//连接成功，启动心跳
			that.heartbeatPackage(that.ws);
			//连接成功，启动网络状态监听
			that.netListener();
			//连接成功，启动页面卸载监听
			that.onbeforeunload();
			//返回websocket连接是否就绪：true则为就绪
			(callback && typeof(callback) === "function") && callback(true);
		}
		that.ws.sendMsg = function(evt) {
			switch(that.ws.readyState) {
				case this.CONNECTING:
					//console.log("正在连接...");
					break;
				case this.OPEN:
					//console.log("已经接连成功...");
					this.send(evt);
					break;
				case this.CLOSING:
					console.log("连接正在关闭...");
					break;
				case this.CLOSED:
					console.log("连接已经关闭，正在清除定时任务...");
					window.clearInterval(that.timedTask.heartbeat);
					break;
				default:
					//console.log("未知状态");
					break;
			}
		}
		that.ws.onmessage = function(evt) {
			that.writeScreen(JSON.parse(evt.data));
		}
		that.ws.onclose = function(evt) {
			console.log("连接已经关闭,启动重连");
			if(!that.isInitiative) {
				that.connect();
			}
		}
		that.ws.onerror = function(evt) {
			console.log("通信发生错误...");
		}
	})
	


//生成UUID
function uuid(len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;

	if(len) {
		// Compact form
		for(i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		// rfc4122, version 4 form
		var r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for(i = 0; i < 36; i++) {
			if(!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('');
}

//获得当前系统时间  yyyy-MM-dd HH:mm:ss
function getNowFormatDate() {

	var date = new Date();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();

	var strHours = date.getHours();
	var strMinutes = date.getMinutes();
	var strSeconds = date.getSeconds();

	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(strHours >= 0 && strHours <= 9) {
		strHours = "0" + strHours;
	}
	if(strMinutes >= 0 && strMinutes <= 9) {
		strMinutes = "0" + strMinutes;
	}
	if(strSeconds >= 0 && strSeconds <= 9) {
		strSeconds = "0" + strSeconds;
	}

	var currentDate = date.getFullYear() + "-" + month + "-" + strDate +
		" " + strHours + ":" + strMinutes + ":" + strSeconds;

	return currentDate;
}

//获得当前系统时间 时间戳
function getNowFormatDateStamp() {
	var timestamp = new Date().getTime();

	return timestamp;
}