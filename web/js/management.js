//创建相册按钮
const $create_albums = $('#create_albums')
//创建相册弹出框
const $create= $('#create')
//弹出框右上角x按钮
const $close = $('#close')
$create_albums.click(function(){
    // 弹出框去cur
    $create.removeClass("cur");
})
// 弹出框消失
$close.click(function(){
    // 弹出框加cur
    $create.addClass("cur");
})

// 获取相册名输入框
var $AlbumName = $("#AlbumName");
albumInfo
var $albumInfo = $("#albumInfo");

// 设置锁
let AlbumName_lock = false;
$AlbumName.blur(function(){
    let val = $(this).val();
    let result = Strategy.use("notEmpty", val);
    if(result){
        AlbumName_lock = false;
        alert("相册名不能为空");
        return;
    }
    AlbumName_lock = true;
})
// 获取提交按钮
var $create_btn = $("#create_btn");
$create_btn.click(function(){
    let albumName = $AlbumName.val()
    let albumInfo = $albumInfo.val()
    if(AlbumName_lock === false){
        alert("相册名不能为空");
        return
    }
    //发送请求，创建相册
    $.ajax({
        url: "/create_album",
        data: {
            albumName: albumName,
            albumInfo:albumName
        },
        type: "get",
        dataType: "json",
        success: function(data){
            if(!data.error){
                // 弹出框加cur
                $create.addClass("cur");
                // 强制刷新页面、同F5功能一样
                document.location.reload();
            }
        }
    })
})
//获取删除相册按钮
const $albums = $("#albums");
//deleteAlbum点击事件委托给父元素albums
$albums.on('click','.deleteAlbum',function(e){
    //获取点击的相册名称
    const albumName = $(this).parent('div').siblings('.info').children('.getImg').html();
    //发送请求
    // 发送ajax
    $.ajax({
        url: "/deleteAlbum",
        data: {
            albumName : albumName
        },
        type: "get",
        dataType: "json",
        success: function(data){
            // console.log(data);
            if(!data.error){
                //刷新页面
                document.location.reload();
            }
        }
    })

});
//图片点击事件,显示图片
$albums.on("click",".imgs", function(){
    var albumName = $(this).siblings(".info").children(".getImg").html();
    var username = $(this).attr("data-targetUsername");
    // 发送ajax
    $.ajax({
        url: "/getImg",
        data: {
            albumName: albumName,
            username : username
        },
        type: "get",
        dataType: "json",
        success: function(data){
            if(!data.error){
                $albums.html("");
                $albums.append("<div class='txt'>图片信息</div>")
                for(var i=0; i<data.data.length; i++){
                    $albums.append("<li class='lisimg'><div class='img'><img src="+data.dir + '/' + data.data[i].username + '/' + albumName + '/' + data.data[i].imgName+ " ></div><p class='imgName'><span>"+data.data[i].imgName+"</span></p></li>")

                }
            }
        }
    })
})


/*
*  添加点击事件，用于仔细查看图片
* */
// 获取节点元素
var $mask = $("#mask");
var $clos = $("#clos");
$albums.on("click", ".lisimg", function(){
    // 去cur
    $(".big_body").removeClass("cur");
    var src = $(this).children(".img").children("img").attr("src");
    // console.log(src);
    // 创建img元素
    var img = new Image();
    img.src = src;
    // 上树
    $mask.append(img);
    $clos.html("&times;")
})

// 添加事件，由于关闭展示图片窗口
$clos.click(function(){
    // img下数
    $("#mask img").remove();
    // 同时关闭窗口
    // 加cur
    $(".big_body").addClass("cur");
})


// 获取元素
var $back = $("#back");
// 添加点击事件
$back.click(function (){
    // 设置history
    window.history.back();
    return false;
})

var $cancle_btn = $("#cancle_btn");
$cancle_btn.click(function(){
    // 弹出框加cur
    $create.addClass("cur");
})


// 获取public
var $public_ = $("#public_");
$public_.click(function(){
    $(".question_visit").addClass("hide");
    $(".psd_visit").addClass("hide");
})

// 获取question
var $question = $("#question");
$question.click(function(){
    $(".question_visit").removeClass("hide");
    $(".psd_visit").addClass("hide");
})

var $psd_question = $("#psd_question");
// 获取psd_question
$psd_question.click(function(){
    $(".psd_visit").removeClass("hide");
    $(".question_visit").addClass("hide");
})

// 获取personal
var $persn =$("#persn");
$persn.click(function() {
    $(".question_visit").addClass("hide");
    $(".psd_visit").addClass("hide");
})
