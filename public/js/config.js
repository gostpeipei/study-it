'use strict';
require.config({
	baseUrl: '/public/',
	paths: {
		jquery: 'assets/jquery/jquery.min',
		bootstrap: 'assets/bootstrap/js/bootstrap.min',
		nprogress: 'assets/nprogress/nprogress',
		cookie: 'assets/jquery-cookie/jquery.cookie',
		form: 'assets/jquery-form/jquery.form',
		template: 'assets/artTemplate/template',
		datepicker: 'assets/bootstrap-datepicker/js/bootstrap-datepicker',
		datelanguage: 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate: 'assets/jquery-validate/jquery-validate',
		uploadify: 'assets/uploadify/jquery.uploadify',
		ckeditor: 'assets/ckeditor/ckeditor',
		region: 'assets/jquery-region/jquery.region',

		common: 'js/common',
		utils: 'js/utils'
	},
	shim: {
		bootstrap:{
			deps:['jquery']
		},
		datelanguage:{
			deps:['datepicker']
		},
		validate:{
			deps:['jquery']
		},
		uploadify:{
			deps:['jquery']
		},
		ckeditor:{
			exports: 'CKEDITOR'
		},
		region:{
			deps:['jquery']
		},
		utils:{
			deps:['jquery']
		}
	}
})

require(['common']);