'use strict';
define(['jquery','template','utils','bootstrap'],function( $, template ,utils){

	utils.setMenuClass('/teacher/list');

	var $teacherList = $('#teacher_list');
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success:function( data ){
			var html = template('teacher_list_tpl', {list:data.result})
			$teacherList.html(html)
		}
	})
	// var $mgModal = $('#myModal')
	// console.log($mgModal)
	$teacherList.on('click','.view',function(){
		var id = $(this).parent('td').data('id');
		$.ajax({
			type: 'get',
			url: '/api/teacher/view?tc_id=' + id,
			success:function( data ){
				console.log(data)
				// $('#myModal').modal();
				var html = template('teacher_info_tpl', data.result);
				$('#teacher_info').html(html);
				$('#teacherModal').modal();
			}
		})
	})

	//注销功能
	$teacherList.on('click','.handle',function(){
		var $this = $(this);
		//状态0表示启用
		var status = $(this).parent('td').data('status');
		var id = $(this).parent('td').data('id');
		// console.log(status);
		$.ajax({
			type: 'post',
			url: '/api/teacher/handle',
			data:{
				tc_id: id,
				tc_status: status
			},
			success:function( data ){
				if( data.code !== 200 ){
					return;
				}
				// $('#myModal').modal();
				$this.text( data.result.tc_status === 1 ? '启 用' : '注 销');
				$this.parent('td').data('status',data.result.tc_status);
			}
		})
	})
})