'use strict';
define(['jquery','utils','template','uploadify','jcrop','form'],function( $,utils,template ){

    var id=utils.getParam('cs_id')
    $.ajax({
        url: '/api/course/picture',
        type: 'get',
        data: {
            cs_id:id
        },
        success:function( data ) {
            console.log(data.result.cs_cover_original)
            var html = template( 'course_picture_tpl',data.result )
            $('#course_picture').html(html);

            // 保存图片剪裁对象的实例
            var jcropInstance = null;
            var ret = null;
            var jcropPic = function(){
                $('.preview > img').Jcrop({
                bgColor: 'pink',
                aspectRatio:2,
                // 控制上传图片盒子大小
                boxWidth: 400
               },function(){
                    // this 就是当前的剪裁图片对象
                        jcropInstance = this;

                        // 获取坐标以及宽高
                        var w = this.ui.stage.width,
                            h = w / 2,
                            x = 0,
                            y = (this.ui.stage.height - h) / 2;

                            // 初始化一个选区
                            this.newSelection();
                            // 设置选区的范围
                            this.setSelect([x, y, w, h]);

                            //预览
                            this.initComponent('Thumbnailer',{
                                width: 240,
                                height: 120
                            })
               })

            }

            //上传图片插件
            $('#upfile').uploadify({
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original',
                buttonText: '选择图片',
                fileTypeExts: '*.gif; *.jpg; *.png',
                fileSizeLimit: '2MB',
                buttonClass: 'btn btn-success btn-sm',
                height: 'auto',
                width: 70,
                cursor: 'hand',
                itemTemplate: '<span></span>',
                formData: {
                    cs_id: id
                },
                onUploadSuccess: function( file,data ) {
                    ret = JSON.parse( data )
                    if( ret.code !== 200){
                        return;
                    }
                    console.log('success')
                    // $('.preview img').attr('src',ret.result.path)

                    $('.preview').children('img').attr('src', ret.result.path);
                    $('#btnSavePic').prop('disabled', false);

                    if(jcropInstance !== null) {
                        // 重置剪裁对象
                        jcropInstance.destroy();
                    }
                    jcropPic();
                },
            });

            if(ret !== null){
                jcropPic();
            }

            //获取并设置上传的参数坐标和宽高
            $('.preview').on('cropmove cropend',function(a,b,c){
                console.log(c.x)
                console.log(c.y)
                console.log(c.w)
                console.log(c.h)
                $('#picture_x').val( c.x );
                $('#picture_y').val( c.y );
                $('#picture_w').val( c.w );
                $('#picture_h').val( c.h );
            })

            // 通过ajax上传数据
            $('#btnSavePic').on('click',function(){
                $('#course_picture_form').ajaxSubmit({
                    url: '/api/course/update/picture',
                    type: 'post',
                    data: {cs_id: id},
                    success:function( data ){
                        // console.log(data);
                        location.href = '/course/course_add_step3?cs_id=' + id;
                    },
                    error:function( error ){
                        console.log(error)
                    }
                })
            })
        }
    })

})