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
		add: 'js/teacher/add',
		utils: 'js/utils'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		},
		utils:{
			deps:['jquery']
		}
	}
})


require(['common']);