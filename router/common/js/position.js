var map = new AMap.Map('container', {
	resizeEnable: true
});
AMap.plugin('AMap.Geolocation', function() {
	var geolocation = new AMap.Geolocation({
		enableHighAccuracy: true, //是否使用高精度定位，默认:true
		timeout: 20000, //超过10秒后停止定位，默认：5s
		buttonPosition: 'RB', //定位按钮的停靠位置
		buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
		GeoLocationFirst: true, //为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
	});
	map.addControl(geolocation);
	geolocation.getCurrentPosition(function(status, result) {
		if (status == 'complete') {
			onComplete(result)
		} else {
			onError(result)
		}
	});
});

//解析定位结果
function onComplete(data) {
	console.log('定位成功');
	var str = [];
	str.push('定位结果：' + data.position);
	str.push('定位类别：' + data.location_type);
	if (data.accuracy) {
		str.push('精度：' + data.accuracy + ' 米');
	} //如为IP精确定位结果则没有精度信息
	str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
	console.log(str);
}
//解析定位错误信息
function onError(data) {
	console.log('定位失败');
	console.log('失败原因排查信息:' + data.message);
}
