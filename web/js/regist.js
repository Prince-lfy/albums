// 获取输入框
var $regist_username = $("#regist_username");
// 获取密码框
var $regist_password = $("#regist_password");
// 获取确认密码框
var $regist_Repeat_password = $("#regist_Repeat_password");
// 获取注册按钮
var $regist_btn = $("#regist_btn");
// 获取提示文本
var $tips = $("#tips");
// 获取表单
var $registForm = $("#registForm");


// 设置锁
var regist_username_lock = false;
// 账户输入框添加失焦事件
$regist_username.blur(function(){
    // 获取输入内容
    var val = $(this).val();

    // 获取正则验证
    var result = Strategy.use("notEmpty", val);
    var result1 = Strategy.use("allEn", val);

    // 判断
    if(result){
        // 上锁
        regist_username_lock = false;
        // 输出提示文本
        $tips.html(result);
        return;
    }
    if(result1){
        // 上锁
        regist_username_lock = false;
        // 输出提示文本
        $tips.html(result1);
        return;
    }
    // 当上面两个都满足
    // 输出提示文本
    $tips.html("");

    // 发送ajax
    $.ajax({
        url : "http://localhost:3000/checkName",
        type : "get",
        data : {
            username : val
        },
        dataType : "json",
        success : function(data){
            // console.log(data);
            // 输出文本到提示区域
            $tips.html(data.data);
            if(!data.error){
                // 开锁
                regist_username_lock = true;
            }else {
                // 上锁
                regist_username_lock = false;
            }
        }
    })
})

// 设置锁
var regist_password_lock = false;
// 添加失焦事件
$regist_password.blur(function(){
    // 获取输入内容
    var val = $(this).val();

    // 获取正则验证
    var result = Strategy.use("notEmpty", val);
    var result1 = Strategy.use("allEn", val);

    // 判断
    if(result){
        // 上锁
        regist_password_lock = false;
        // 输出提示文本
        $tips.html(result);
        return;
    }
    if(result1){
        // 上锁
        regist_password_lock = false;
        // 输出提示文本
        $tips.html(result1);
        return;
    }
    // 当上面两个都满足
    // 输出提示文本
    $tips.html("");
    // 开锁
    regist_password_lock = true;
})

// 设置锁
regist_Repeat_password_lock = false;
// 添加确认密码事件内容改变事件
$regist_Repeat_password.change(function(){
    // 获取密码
    var val = $regist_password.val();
    // 获取自身输入内容
    var val1 = $(this).val();

    if(val === val1){
        // 输出提示文本
        $tips.html("确认密码成功");
        // 开锁
        regist_Repeat_password_lock = true;
    }else {
        // 输出提示文本
        $tips.html("密码不相同");
        // 上锁
        regist_Repeat_password_lock = false
    }
})

// 添加注册事件
$regist_btn.click(function(){
    console.log(213412341)
    console.log(regist_username_lock);
    console.log(regist_password_lock)
    console.log(regist_Repeat_password_lock);
    if(regist_username_lock === true && regist_password_lock === true && regist_Repeat_password_lock === true){
        // 表单序列化
        var formData = new FormData($registForm.get(0));
        // console.log(formData);

        // 发送ajax
        $.ajax({
            url : "http://localhost:3000/regist",
            data : formData,
            type : "post",
            dataType : "json",
            // 内容类型设置
            contentType: false,
            // 序列化数据
            processData: false,
            success : function(data){
                console.log(data);
                if(!data.error){
                    // 跳转到登录页面
                    location.href = "http://localhost:3000/web/html/login.html";
                }
            }
        })
    }
})