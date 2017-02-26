'use strict';
require.config({
	baseUrl: '/library/',
	paths: {
		jquery: 'assets/jquery/jquery.min',
		bootstrap: 'assets/bootstrap/js/bootstrap',
		cookie: 'assets/jquery-cookie/jquery.cookie',
		nprogress: 'assets/nprogress/nprogress',
		template: 'assets/artTemplate/template',
		common: 'js/common',
		add: 'js/teacher/add'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	}
})


require(['common']);