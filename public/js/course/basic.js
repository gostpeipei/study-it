'use strict';
define(['jquery','utils','template','ckeditor','form'],function( $,utils,template,CKEDITOR ){

	utils.setMenuClass('/course/course_add')
	//获取链接上的cs_id
	var id = utils.getParam('cs_id')

	//子分类模板
	var course_child_tpl = '{{ each list }}' +
	'<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>' +
	'{{ /each }}'

	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data:{
			cs_id:id
		},
		success:function( data ){
			var html = template('course_basic_tpl',data.result)
			$('#course_basic').html(html)
			CKEDITOR.replace('cs_brief')

			//获取子分类
			$('#category_top').on('change',function(){
				var id = $(this).val();
				console.log(id)
				$.ajax({
					url:'/api/category/child',
					type: 'get',
					data:{
						cg_id:id
					},
					success:function( data2 ){
						var render = template.compile( course_child_tpl );
						var html2 = render( { list:data2.result } )
						$( '#category_child' ).html( html2 )

					}
				})
			})
		}
	})


	//保存事件
	$('#course_basic').on('submit','form',function(){
		// console.log(id)
		$(this).ajaxSubmit({
			url: '/api/course/update/basic',
			type: 'post',
			data:{
				cs_id:id
			},
			success:function( data ){
				if( data.code === 200 ){
					location.href = "/course/course_add_step2?cs_id=" + data.result.cs_id;
				}
			}

		})

		return false;
	})




})
