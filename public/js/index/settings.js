'use strict';
define(['jquery','template','ckeditor','validate','cookie','uploadify','datelanguage','form','region'],function( $,template,CKEDITOR ){

	// 个人资料是根据cookie中登录后存的ID来返回数据的,请求不需要发送数据
	$.ajax({
		url: '/api/teacher/profile',
		type: 'get',
		success:function( data ){
			var html = template('user_settings_tpl',data.result)
			$('#user_settings').html(html);

			//城市三级联动
			$('#hometown').region({
				url:'/public/assets/jquery-region/region.json'
			})

			// 验证表单
			$('#user_settings form').validate({
				onKeyup: true,
				onBlur: true,
				sendForm: false,
				eachInvalidField:function(){
					$(this).parent().addClass('has-error').removeClass('has-success')
				},
				eachValidField:function(){
					$(this).parent().addClass('has-success').removeClass('has-error')
				},
				valid:function(){
					$('#user_settings').on('submit','form',function(){
					// 拼接城市
					var p = $('#pro').children(':selected').text();
					var c = $('#cit').children(':selected').text();
					var d = $('#d2').children(':selected').text();
					var tc_hometown = p + '|' + c + '|' + d;
					console.log(tc_hometown)
					$('#user_settings form').ajaxSubmit({
						url:'/api/teacher/modify',
						success:function(data){
							console.log(data)
						}
					})
						return false;
					})
				},
				description:{
					tcRosterDesc:{
						required: '不能为空'
					},
					tcBirthdayDesc:{
						required: '不能为空'
					}
				}
			})

			// 上传头像功能
			$('#upfile').uploadify({
				buttonText: '',
				height: 120,
				width: 120,
				fileObjName: 'tc_avatar',
				fileSizeLimit: '2MB',
				swf: '/public/assets/uploadify/uploadify.swf',
				uploader: '/api/uploader/avatar',
				onUploadSuccess:function( file, data, response){
					var ret = JSON.parse(data);
					// 渲染头像
					$('.preview img').attr('src', ret.result.path);

					// 存cookie
					var userinfo = JSON.parse($.cookie('userinfo'));
						userinfo.tc_avatar = ret.result.path;
					$.cookie('userinfo',JSON.stringify(userinfo))
				}
			})

			//富文本编辑器
			CKEDITOR.replace('tc_introduce');
		}
	})



})