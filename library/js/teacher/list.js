'use strict';
define(['jquery','template'],function( $, template ){
	var $teacherList = $('#teacher_list');
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success:function( data ){
			var html = template('teacher_list_tpl', {list:data.result})
			$teacherList.html(html)
		}
	})

	$teacherList.on('click','.view',function(){
		var id = $(this).parent('td').data('id');
		console.log(id);
		$.ajax({
			type: 'get',
			url: '/api/teacher/view?tc_id=' + id,
			success:function( data ){
				console.log(data)
			}
		})
	})
})