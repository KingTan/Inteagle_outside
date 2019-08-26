/**
 * 页面加载
 */
$(function() {
	//初始化 Swiper
	initialSwiper();

	//本地已存在记录经纬度时  直接查询天气
	if (lat_local != null && lng_local != null) {
		getWeatherInfo(lat_local, lng_local);
		//启动定时器 每一小时请求一次天气数据
		var intervalId = window.setInterval(function() {
			getWeatherInfo(lat_local, lng_local);
		}, 1000 * 60 * 60);
	}

})

/**
 * 初始化 Swiper
 */
function initialSwiper() {

	//底部缩略图
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 20,
		slidesPerView: 4,
		loop: true,
		freeMode: true,
		loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});

	//顶部大图
	var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 8,
		loop: true,
		loopedSlides: 4, //looped slides should be the same
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});

}
