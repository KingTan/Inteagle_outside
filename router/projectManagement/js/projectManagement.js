$(function() {
	//绘制地图
	drawMap();
	//隐藏过度动画
	hideAnimation();
	
})

/**
 * 隐藏过度动画
 */
function hideAnimation() {
	//关闭动画
	$(".loading").fadeOut();
	//显示内容
	$(".mainBody").css("visibility", "visible");
}

/**
 * 绘制地图
 */
function drawMap() {
	//高德地图SDKKey
	var sdkKey = "402de582c702368a9620fa176e221a24";
	//设置经纬度
	var lat = 113.874675;
	var lng = 22.947508;
	window.onLoad = function() {
		//项目位置标记点
		var marker = new AMap.Marker({
			position: new AMap.LngLat(lat, lng), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: '项目位置'
		})
		//地图配置项
		var map = new AMap.Map('mapContainer', {
			zoom: 14, //设置地图显示的缩放级别
			center: [lat, lng], //设置地图中心点坐标
			mapStyle: 'amap://styles/normal', //设置地图的显示样式
			viewMode: '2D', //设置地图模式
			lang: 'zh_cn', //设置地图语言类型
		});
		//添加标记点
		map.add(marker);
	}
	//拼接调用高德JSAPI
	var url = 'https://webapi.amap.com/maps?v=1.4.15&key=' + sdkKey + '&callback=onLoad';
	var jsapi = document.createElement('script');
	jsapi.charset = 'utf-8';
	jsapi.src = url;
	document.head.appendChild(jsapi);
}
