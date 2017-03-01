'use strict';
define(['jquery','utils','template'],function( $,utils,template ){
	//获取链接上的cs_id
	var id = utils.getParam('cs_id')
	// console.log(id)
	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data:{
			cs_id:id
		},
		success:function( data ){
			var html = template('course_basic_tpl',data.result)
			$('#course_basic').html(html)
		}
	})
})