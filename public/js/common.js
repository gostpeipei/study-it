// NProgress.start();

// NProgress.done();

// $('.navs ul').prev('a').on('click', function () {
// 	$(this).next().slideToggle();
// });
define(['jquery', 'template' ,'nprogress','cookie' ],function( $,template,nprogress ){

	// 是登录页面直接返回
	if( location.pathname === '/login' ){
		return;
	}

	// 判断是否登录,没有登录自动返回登录页面
	if ( !$.cookie('PHPSESSID')){
		location.href = '/login';
	}


	//利用模板引擎生成个人头像和昵称
	var htmlTpl = '<div class="avatar img-circle">' +
        '<img src="{{ tc_avatar }}">' +
        '</div>' +
        '<h4>{{ tc_name }}</h4>';

	var userinfo = JSON.parse( $.cookie('userinfo') || {} );

	var render = template.compile( htmlTpl );
	var html = render(userinfo);
    $('.aside .profile').html(html);


    //退出功能
    $('#logout').on('click',function(){
    	if( !confirm( '你确定要退出吗?' ) ){
    		return;
    	}

    	$.ajax({
    		url:'/api/logout',
    		type: 'post',
    		success:function( data ){
    			if( !data.code === 200 ){
    				return;
    			}
    			location.href = "/login"
    		}
    	})
    })


    //进度条功能, 全屏loding
    $.ajaxSetup({
    	beforeSend:function(){
    		nprogress.start();
    		$('.mask').show();
    	},
    	complete:function(){
    		nprogress.done();
    		$('.mask').hide();
    	}
    })

    //菜单展开
    $('.childMenu').on('click',function(){
    	$(this).next('ul').slideToggle();
    	$(this).children('.arrow').toggleClass('fa-angle-down');
    })

})