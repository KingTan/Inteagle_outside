/**
 * @param {Object} cityName
 * 查询天气
 */
function getWeatherInfo(cityName) {
	//"areaId": areaId
	$.ajax({
		url: PATH + "weather/getWeatherByAreaNameAndAreaId",
		type: "post",
		data: {
			"areaName": cityName
		},
		success: function(res) {
			// console.log("res", res);
			if (res.state == 200) {
				var now_weather = res.data.showapi_res_body.now;
				if (now_weather != null) {
					//当前的温度
					$(".nowTemp").text(now_weather.temperature);
					//当前的天气
					$(".nowWeatherTextStrValue").text(now_weather.weather);
					//当前天气图标
					$(".currentWeatherIcon").attr("src", now_weather.weather_pic);
					//风
					$(".stationText").text(now_weather.wind_direction + now_weather.wind_power);
				}
				//当天的数据
				var today = res.data.showapi_res_body.f1;
				//温度区间
				var tempPeriod = today.night_air_temperature + "~" + today.day_air_temperature;
				$(".tempPeriodValue").text(tempPeriod);
	
				//当天日期
				var todayDate = today.day;
				$(".todayDateValue").text(todayDate.substring(0, 4) + "年" + todayDate.substring(4, 6) + "月" + todayDate.substring(
					6, 8) + "日");
				//当天星期
				$(".todayWeek").text(getWeek(today.weekday));
	
				//第二天的天气数据
				var day_two = res.data.showapi_res_body.f2;
				//第二天日期
				$(".day_two_date").text(day_two.day.substring(4, 6) + "月" + day_two.day.substring(
					6, 8) + "日");
				//天气图标
				$(".day_two_icon").attr("src",day_two.day_weather_pic)
				//天气
				$(".day_two_value").text(day_two.day_weather);
				//温度区间
				$(".day_two_temperiod").text(day_two.night_air_temperature+"~"+day_two.day_air_temperature);
				
				//第三天的天气数据
				var day_three = res.data.showapi_res_body.f3;
				//第三天日期
				$(".day_three_date").text(day_three.day.substring(4, 6) + "月" + day_three.day.substring(
					6, 8) + "日");
				//天气图标
				$(".day_three_icon").attr("src",day_three.day_weather_pic)
				//天气
				$(".day_three_value").text(day_three.day_weather);
				//温度区间
				$(".day_three_temperiod").text(day_three.night_air_temperature+"~"+day_three.day_air_temperature);
				
				//关闭动画
				$(".loading").fadeOut();
				//显示内容
				$(".curPageBody").css("visibility","visible");
				
			} else if (res.state == 500) {
				console.log("天气查询失败...")
			}
		},
		error: function(badRes) {
			console.log(badRes);
		}
	});
	
	// $.ajax({
	// 	url: PATH + "weather/getAreaIdByAreaName",
	// 	type: "post",
	// 	async: true,
	// 	data: {
	// 		"areaName": cityName
	// 	},
	// 	success: function(res) {
	// 		console.log("res", res);
	// 		if (res.state == 200) {
	// 			var areaId = res.data.showapi_res_body.list[0].areaid;
	// 			console.log("areaId---------", areaId);
	// 			if (areaId != null && areaId != undefined && areaId != "") {
	// 			}
	// 		} else if (res.state == 500) {
	// 			console.log("根据城市名查询城市ID失败...")
	// 		}
	// 	},
	// 	error: function(badRes) {
	// 		console.log(badRes);
	// 	}
	// });
}

/**
 * @param {Object} weekNum
 * 查询星期
 */
function getWeek(weekNum) {
	var weekStr = "";
	switch (weekNum) {
		case 0:
			weekStr = "周一";
			break;
		case 1:
			weekStr = "周一";
			break;
		case 2:
			weekStr = "周二";
			break;
		case 3:
			weekStr = "周三";
			break;
		case 4:
			weekStr = "周四";
			break;
		case 5:
			weekStr = "周五";
			break;
		case 6:
			weekStr = "周六";
			break;
		case 7:
			weekStr = "周天";
			break;
	}
	return weekStr;
}
