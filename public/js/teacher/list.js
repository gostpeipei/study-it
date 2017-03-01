'use strict';
define(['jquery','template','utils','bootstrap'],function( $,template,utils){

    utils.setMenuClass('/teacher/teacher_list')
	//加载讲师列表
	$.ajax({
		url: '/api/teacher',
		success:function( data ){
			var html = template('teacher_list_tpl',{list:data.result});
			$('#teacher_list').html(html);
		}
	})

	$('#teacher_list').on('click','.view',function(){
		//查看讲师信息
		// $('#teacherModal').modal();
		//获取要查看某个人的ID
		var id = $(this).parent().data('id')
		$.ajax({
			data:{
				tc_id:id
			},
			url:'/api/teacher/view',
			type: 'get',
			success:function( data ){
				if( !data.code === 200 ){
					return;
				}
				console.log(data.result)
				var html = template('teacher_info_tpl',data.result)
				$('#teacher_info').html(html)
			}
		})
	})

	//启用或注销
	$('#teacher_list').on('click','.handle',function(){
		var $this = $(this);
		var tc_id = $(this).parent().data('id'),
			tc_status = $(this).parent().data('status');
		$.ajax({
			url: '/api/teacher/handle',
			type: 'post',
			data: {
				tc_id: tc_id,
				tc_status:tc_status
			},
			success:function( data ){
				$this.text( data.result.tc_status === 1 ? '启 用' : '注 销');
				//储存新的data
				$this.parent().data('status',data.result.tc_status)
			}
		})
	})

})