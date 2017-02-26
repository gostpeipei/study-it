'use strict';
define(['jquery'],function( $ ){

	return {
		setMenuClass:function( path ){
			$('.navs a[href="'+path+'"]').addClass('active').parent().siblings().children('a').removeClass('active')
			// var $aLink = $('.navs a[href="' + path + '"]');
		 //    $aLink.addClass('active');
		 //    // 将其兄弟元素移除样式
		 //    $aLink.parent().siblings().children('a').removeClass('active')
		}
	}
})