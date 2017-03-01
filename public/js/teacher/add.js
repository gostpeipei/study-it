'use strict';
define(['jquery','template','utils','cookie','datelanguage','validate','form'],function( $,template,utils ){

    utils.setMenuClass('/teacher/teacher_list')
	//获取链接中的ID
	var id = utils.getParam('tc_id');

	var validateTeacher = function(){
		$('#teacher_edit form').validate({
			sendForm: false,
			onKeyup: true,
			onBlur: true,
			eachInvalidField:function(){
				$(this).parent().addClass('has-error').removeClass('has-success');
			},
			eachValidField:function(){
				$(this).parent().addClass('has-success').removeClass('has-error');
			},
			valid:function(){
				if(id){
					$('#teacher_edit form').ajaxSubmit({
						url: '/api/teacher/update',
						//数据中没有id  需要添加隐藏域input:hidden
						type: 'post',
						success:function( data ){
							if( data.code === 200 ){
								alert('修改成功')
							}
						}
					})
				}else{
					console.log('else')
					$('#teacher_edit form').ajaxSubmit({
						url: '/api/teacher/add',
						type: 'post',
						success:function( data ){
							if( data.code === 200 ){
								location.href = '/teacher/teacher_list'
							}
						},
						error:function(error){
							console.log(error)
						}
					})

				}
			},
		    description: {
		    	tcNameDesc: {
		    		required: '用户名为必填项'
		    	},
		    	tcPassDesc: {
		    		required: '请输入密码'
		    	},
		    	tcJoinDateDesc: {
		    		required: '请选择入职日期'
		    	}
		    }
		})
	}

	//判断是否有ID  有ID为加载编辑,没ID加载添加
	if( id ){
		$.ajax({
			url: '/api/teacher/edit',
			data : {
				tc_id : id
			},
			type: 'get',
			success:function( data ){
				data.result.title = '讲师编辑';
				data.result.btnTxt = '修 改';
				var html = template('teacher_edit_tpl',data.result);
				$('#teacher_edit').html(html);

				//验证并提交信息
				validateTeacher();
			}
		})
	}else{
		var html = template('teacher_edit_tpl',{title:'讲师添加',btnTxt:'修 改'});
		$('#teacher_edit').html(html);
		//验证并提交信息
		validateTeacher();
	}
})