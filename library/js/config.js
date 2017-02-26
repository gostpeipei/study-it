'use strict';
require.config({
	baseUrl: '/library/',
	paths: {
		jquery: 'assets/jquery/jquery.min',
		bootstrap: 'assets/bootstrap/js/bootstrap.min',
		cookie: 'assets/jquery-cookie/jquery.cookie',
		nprogress: 'assets/nprogress/nprogress',
		template: 'assets/artTemplate/template',
		common: 'js/common'
	}
})


require(['common']);