// 获取输入框
var $login_username = $("#login_username");
var $login_password = $("#login_password");
var $loginBtn = $("#loginBtn");
// 获取免登录选择
var $check = $("#check");
// 获取文本提示框
var $tip = $("#tip");

// 设置登录锁
var login_username_lock = false;
var login_password_lock = false;

// 输入框添加失焦事件
$login_username.blur(function(){
    // 获取输入框内容
    var val = $(this).val();
    // console.log(val);
    // 获取正则验证
    var result = Strategy.use("notEmpty", val);
    var result1 = Strategy.use("allEn", val);

    // 判断
    if(result){
        // 上锁
        login_username_lock = false;
        // 输出提示信息
        $tip.html(result);
        return;
    }
    if(result1){
        // 上锁
        login_username_lock = false;
        // 输出提示信息
        $tip.html(result1);
        return;
    }

    // 当上面两项都通过
    // 输出提示信息
    login_username_lock = true;
})
$login_password.blur(function(){
    // 获取输入框内容
    var val = $(this).val();
    var result = Strategy.use("notEmpty", val);
    var result1 = Strategy.use("allEn", val);
    // 判断
    if(result){
        // 上锁
        login_password_lock = false;
        // 输出提示信息
        $tip.html(result);
        return ;
    }
    if(result1){
        // 上锁
        login_password_lock = false;
        // 输出提示信息
        $tip.html(result1);
        return;
    }

    // 当上面两项都通过
    // 输出提示信息
    $tip.html("账号类型正确,请登录");
    login_password_lock = true;
})
$loginBtn.click(function () {
    if(login_password_lock ==true && login_username_lock == true){
        $.ajax({
            url:'http://localhost:3000/login',
            type:'get',
            dataType:'json',
            data:{
                username:$login_username.val(),
                password:$login_password.val()
            },
            success:function(data){
                $tip.html(data.data);
                if(!data.error){
                    location.href = "http://localhost:3000/main";
                }
                // return false;
            }
        })
    }
    return false
})