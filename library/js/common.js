// NProgress.start();

// NProgress.done();

// $('.navs ul').prev('a').on('click', function () {
// 	$(this).next().slideToggle();
// });

define(['jquery','template','cookie'],function( $ ,template){
	if( location.pathname === '/login'){
		return;
	}

	if( !$.cookie('PHPSESSID') && location.pathname !== '/login'){
		// console.log(1)
		location.href = '/login';
	}

	var userinfo =  JSON.parse( $.cookie('userinfo') || '{}' );
	// console.log(userinfo)


	//
	//
	// $('.profile img').attr('src', userinfo.tc_avatar);

	// $('.profile h4').text(userinfo.tc_name);
	//通过模板引擎生成头像和用户名
	var ohtml = '<!-- 头像 -->' +
        '<div class="avatar img-circle">' +
            '<img src="{{tc_avatar}}">' +
        '</div>' +
        '<h4>{{tc_name}}</h4>';
    var render = template.compile(ohtml);
    $('#userinfo').html(render(userinfo));

	//退出功能
	$('#logout').on('click',function(){
		$.ajax({
			url: '/api/logout',
			type: 'post',
			success:function( data ){
				location.href = '/login'
			}
		})
	})
})