'use strict';
define(['jquery','template'],function( $ , template){
	// console.log(location);
	function getParam(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return null;
	}
	//判断是否有ID;
	var id = getParam('tc_id');

	// 有id就是编辑
	if( id ){
		$.ajax({
			url:'/api/teacher/edit',
			type: 'get',
			data:{
				tc_id: id
			},
			success:function( data ){
				console.log( data )
				data.result.title = '讲师编辑';
				data.result.btnTxt = '修 改';
				var html = template('teacher_edit_tpl',data.result);
				$('#teacher_edit').html(html);
			}
		})
	}else{
		var html = template('teacher_edit_tpl',{
			title: '讲师添加',
			btnTxt: '添 加'
		})
		$('#teacher_edit').html(html);
	}
})