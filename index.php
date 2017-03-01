<?php 

	// 处理错误级别 不显示 注意信息(不写$filename = $pathinfo[1] 不输入时会提示错误)
	// http://www.w3school.com.cn/php/func_error_reporting.asp
	error_reporting(E_ALL & ~E_NOTICE);

	$pathinfo = $_SERVER['PATH_INFO'];

	$pathinfo = explode('/', substr($pathinfo, 1));

	$folder = $pathinfo[0];
	
	$filename = $pathinfo[1];

	if( count($pathinfo) == 1 ){
		if( !$folder ){
			$filename = 'index';
		}else{
			$filename = $folder;
		}
		$folder = 'index';
	}
	
	include '/views/' . $folder .'/' . $filename . '.html';  
?>