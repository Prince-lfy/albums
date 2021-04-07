/*
* 选择相册下拉框改变事件，显示对应相册图片
* */
var $upload_select = $("#upload_select");
var $img_list = $("#img_list");
$upload_select.change(function() {
    // 获取相册名称
    var album_name = $(this).val();
    //console.log(album_name);
    // 发送ajax请求数据
    $.ajax({
        url: "/get_album_imgs",
        data: {
            album_name: album_name
        },
        type: "get",
        dataType: "json",
        success: function(data) {
            // 清除旧内容
            $img_list.html("");
            if (!data.error) {
                // 循环格式化模板并上树
                for(var i = 0; i < data.data.imgs_arr.length; i++) {

                    var dir = data.data.dir;
                    var username = data.data.imgs_arr[i].username;
                    var album_name = data.data.imgs_arr[i].albumName;
                    var imgname = data.data.imgs_arr[i].imgName;
                    var checked = data.data.imgs_arr[i].share === "1" ? "checked"  :  "";
                    var share = data.data.imgs_arr[i].share === "1" ?  "unshare" : "share";
                    var str = `
								<li><img src="${dir}/${username}/${album_name}/${imgname}" />
								<div id="span_close"></div>
								<input  class="change_state hide" data-share=${share} data-album-name=${album_name} data-imgname=${imgname} type="checkbox"   ${checked}/>
								<input  class="hide delete" type="checkbox" />
								</li>
							`;
                    $img_list.append(str);

                }
            }
        }
    })
});


//页面加载,触发change事件
$upload_select.trigger("change");
/*
* 上传文件按钮触发,上传多张图片
*
* */
const $upload = $("#upload");
const $form = $("#form");
const $upload_pic = $("#upload_pic");
// 点击上传按钮时 发送ajax 提交数据
$upload.click(function() {
    // 获取文件信息
    var file = $upload_pic[0].files;
    // console.log("1:"+ $upload_pic)//object Object
    // console.log("2:"+ $upload_pic[0])//object HTMLInputElement
    // console.log("3:"+ $upload_pic[0].files)//object FileList
    var formData = new FormData($form[0]);
    //console.log("form表单" + $form[0]);//object HTMLFormElement
    if (file.length === 0 ) {
        alert("	请选择图片 ")
        return;
    }
    // 发送ajax
    $.ajax({
        url: "/upload_file",
        dataType: "json",
        data: formData,
        type: "post",
        contentType: false,
        processData: false,
        success: function(data) {
            console.log(data);
            //判定是否上传成功
            if (!data.error) {
                // 成功
                $upload_select.trigger("change");
            } else {

            }
        }
    })
})
/*
*  批量删除点击
* */
//批量删除
var $del_many = $("#del_many");
//单个删除
var $del = $("#check_del");
var $del_btn = $("#del_btn");
var $cancles = $("#cancles");
$del_many.click(function() {
    var className = $(".delete").attr("class").split(" ");
    //console.log("我" +className);
    if(className.length === 2 ){
        $del_many.attr("value","取消操作");
        //	console.log("我" +className);
        var $select_change_state = $img_list.find(".change_state").addClass("hide");
        var $select_del = $img_list.find(".delete");
        //移除hide类
        setTimeout(function() {

            $select_del.removeClass("hide")
            // 打开删除按钮
            $del_btn.removeClass("hide");
            // 打开取消按钮
            $cancles.removeClass("hide");
        }, 500)
    }else {
        $del_many.attr("value","批量删除");
        var $select_change_state = $img_list.find(".change_state").addClass("hide");
        var $select_del = $img_list.find(".delete");
        //移除hide类
        setTimeout(function() {

            $select_del.addClass("hide")
            // 打开删除按钮
            $del_btn.addClass("hide");
            // 打开取消按钮
            $cancles.addClass("hide");
        }, 500)
    }

});


//取消按钮
$cancles.click(function() {
    //$img_list.find(".change_state").removeClass("hide");
    $del_many.attr("value","批量删除");
    $img_list.find(".delete").addClass("hide");
    $del_btn.addClass("hide");
    $cancles.addClass("hide");
})


//选中图片添加属性choose:1,未选中添加choose:0
$img_list.on("click",".delete",function() {
    //获取相册名
    var albums_name = $(this).siblings(".change_state").data("album-name");
    //获取图片名
    var imgname = $(this).siblings(".change_state").data("imgname");
    //获取当前input的选中状态
    let check_flag = $(this).is(":checked");
    console.log(check_flag);
    $.ajax({
        type:"get",
        url:"/choose_img",
        dataType:"json",
        data:{
            albums_name:albums_name,
            imgname:imgname,
            check_flag:check_flag
        },
        success:function(data) {
            console.log(data);

        }
    });
});
//设为私密，改变选择框的显示隐藏
var $secret = $("#secret");
$secret.click(function() {
    //获取类名
    var className = $(".change_state").attr("class").split(" ");
    //console.log(className.length);
    if(className.length === 2){
        $secret.attr("value","保存设置");
        $img_list.find(".change_state").removeClass("hide");
    }else {
        $secret.attr("value","设为私密");
        $img_list.find(".change_state").addClass("hide");
    }

});


//选中图片添加属性share:1,未选中添加share:0
$img_list.on("click",".change_state",function() {
    //获取相册名
    var albums_name = $(this).data("album-name");
    //获取图片名
    var imgname = $(this).data("imgname");
    var share = $(this).is(':checked');
    $.ajax({
        type:"get",
        url:"/change_sta",
        dataType:"json",
        data:{
            albums_name:albums_name,
            imgname:imgname,
            share:share
        },
        success:function(data) {
            console.log(data);

        }
    });
});


//确认删除,批量删除
$del_btn.click(function() {
    //获取相册名
    var albums_name = $upload_select.val();
    $.ajax({
        url:"/del_many_img",
        type:"get",
        dataType:"json",
        data:{
            albums_name:albums_name
        },
        success:function(data) {
            console.log(data);
            if(!data.error){

                //触发渲染图片的事件
                $upload_select.trigger("change");
                //触发input按钮隐藏事件
                setTimeout(function() {
                    $cancles.trigger("click");
                },500)
            }


        }
    });
})

//单个删除按钮
$img_list.on("click","#span_close",function() {
    //获取相册名
    var albums_name = $(this).siblings(".change_state").data("album-name");
    //获取图片名
    var imgname = $(this).siblings(".change_state").data("imgname");
    $.ajax({
        type:"get",
        url:"/del_single_img",
        dataType:"json",
        data:{
            albums_name:albums_name,
            imgname:imgname
        },
        success:function(data) {
            //	console.log(data);
            if(!data.error){
                $upload_select.trigger("change");
            }

        }
    });
});

// 获取元素
var $back = $("#back");
// 添加点击事件
$back.click(function (){
    // 设置history
    window.history.back();
    return false;
})