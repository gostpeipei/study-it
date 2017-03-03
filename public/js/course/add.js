'use strict';
define(['jquery','utils','validate','form'],function( $,utils ){

	utils.setMenuClass('/course/course_add')
	$('#course_create').validate({
		onKeyup: true,
		onBlur: true,
		sendForm: false,
		eachInvalidField:function(){
			$(this).parent().addClass('has-error').removeClass('has-success');
		},
		eachValidField:function(){
			$(this).parent().addClass('has-success').removeClass('has-error');
		},
		valid:function(){
			$('#course_create').ajaxSubmit({
				url:'/api/course/create',
				success:function( data ){
					location.href = "/course/course_basic?cs_id=" + data.result.cs_id
				}
			})
		},
		description:{
			csName:{
				required: '不能为空'
			}
		}
	})
})