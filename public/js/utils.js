'use strict';
define(['jquery'],function( $ ){

	return {
		setMenuClass : function ( path ){
			var $aLink = $('.navs a[href="'+ path +'"]');
			$aLink.addClass('active').parent().siblings().children('a').removeClass('active');

			//课程管理选中的话展开
			$aLink.parent().parent().css('display','block')
		},
		getParam: function (name) {
		   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		   var r = window.location.search.substr(1).match(reg);
		   if (r!=null) return (r[2]); return null;
		}
	}
})