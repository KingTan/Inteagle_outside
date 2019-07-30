/**
 * 页面加载事件
 */
$(function() {
	layui.use('element', function() {
		var $ = layui.jquery,
			element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
	});
	
	//初始化 Swiper
	initialSwiper();
	
})

/**
 * 初始化 Swiper
 */
function initialSwiper() {
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 8,
		slidesPerView: 4,
		loop: true,
		freeMode: true,
		loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
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
