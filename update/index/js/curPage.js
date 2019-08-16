/**
 * 页面加载
 */
$(function() {
	//关闭动画
	// closeAnimate();
	//初始化 Swiper
	initialSwiper();
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
