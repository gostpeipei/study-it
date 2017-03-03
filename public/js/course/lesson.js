'use strict';
define(['jquery','template','utils'],function( $,template,utils ){

    var id=utils.getParam('cs_id');

    $.ajax({
        url: '/api/course/lesson',
        type: 'get',
        data: {
            cs_id: id
        },
        success: function( data ){
            console.log(data);
            var html = template('course_lesson_tpl',data.result);
            $('#course_lesson').html(html);
        }
    })
})