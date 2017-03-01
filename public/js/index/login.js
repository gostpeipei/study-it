'use strict';
define(['jquery', 'cookie'], function($) {
	
  $('#loginForm').on('submit', function() {
    var params = $(this).serialize();

	$.ajax({
		url: '/api/login',
		data: params,
		type: 'post',
		success:function( data ){
			console.log( data );
			if( data.code !== 200 ){
				return
			}
			//data.result 存着头像src和姓名
			//转为字符串存到cookie中,方便调用
			$.cookie('userinfo', JSON.stringify(data.result));
			location.href = '/';
		}
	})

    return false;
  });
  
});
