/*
* @Author: asus
* @Date:   2017-02-25 23:47:40
* @Last Modified by:   asus
* @Last Modified time: 2017-02-25 23:53:16
*/

'use strict';
define(['jquery','cookie'],function( $ ){
    $('#loginForm').on('submit',function(){
    console.log(1)
    var username = $('#username').val(),
    pwd = $('#pwd').val();
    $.ajax({
        url: '/api/login',
        type:'post',
        data:{
            tc_name: username,
            tc_pass: pwd
        },
        success:function( data ){
            $.cookie('userinfo', JSON.stringify(data.result));
            location.href = '/index';
        },
        error:function( error ){
            console.log( error )
        }
    })
    return false;
    })
})