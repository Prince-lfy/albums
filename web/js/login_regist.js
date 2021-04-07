
/**
 * 01 注册，登陆表单切换
 * */
const $show_login = $('#show_login')
const $show_regist = $('#show_regist')
const $login_form = $('#login_form')
const $regist_form = $('#regist_form')
const $regist_username = $('#regist_username')
const $regist_password = $('#regist_password')
const $regist_repeat_password = $('#regist_repeat_password')
const $login_username = $('#login_username')
const $login_password = $('#login_password')

$show_login.click(function(){
    $regist_username.val('')
    $regist_password.val('');
    $regist_repeat_password.val('');
    $show_login.addClass('active').siblings().removeClass('active');
    $login_form.removeClass('hide').siblings('form').addClass('hide');
})
$show_regist.click(function(){
    $login_username.val('')
    $login_password.val('');
    $show_regist.addClass('active').siblings().removeClass('active');
    $regist_form.removeClass('hide').siblings('form').addClass('hide');
})



/**
 * 	02 注册表单，
 * 		username：
 * 			    控件失去焦点时，检测用户名是够符合要求:策略模式
 *		password：重复密码失去焦点时，检测
 * 				两次输入的密码是否一致
 */

const $login_tips = $('#login_tips')
const $regist_tips = $('#regist_tips')
let regist_username_lock=false
let regist_password_lock=false
let regist_repeat_password_lock=false
$regist_username.blur(function(){
    $regist_tips.html('');
    let val = $(this).val();
    let result_empty = Strategy.use('notEmpty',val)
    let result_allEn = Strategy.use('allEn',val)
    if(result_empty){
        regist_username_lock=false
        $regist_tips.html(result_empty);
        return ;
    }
    if(result_allEn){
        regist_username_lock=false
        $regist_tips.html(result_allEn);
        return ;
    }
    //策略都满足的情况下，发情请求验证用户名
    $.ajax({
        url:'http://localhost:3000/checkName',
        type:'get',
        dataType:'json',
        data:{
            username:val
        },
        success:function (data) {
            $regist_tips.html(data.data);
            if(!data.error){
                regist_username_lock=true
            }else{
                regist_username_lock=false
            }

        }

    })

})
$regist_password.blur(function(){
    $regist_tips.html('');
    let val = $(this).val();
    let result_empty = Strategy.use('notEmpty',val)
    let result_allEn = Strategy.use('allEn',val)
    if(result_empty){
        regist_password_lock=false
        $regist_tips.html(result_empty);
        return ;
    }
    if(result_allEn){
        regist_password_lock=false
        $regist_tips.html(result_allEn);
        return ;
    }
    //策略都满足，改变锁
    regist_password_lock=true
})
$regist_repeat_password.change(function(){
    let pass_repeat = $(this).val();
    let pass = $('#regist_password').val();
    let result = Strategy.equal(pass,pass_repeat);
    $regist_tips.html(result);
    if(!result){
        regist_repeat_password_lock = true
        return ;
    }else{
        regist_repeat_password_lock = false
        return ;
    }
})

/**
 *
 * 03 注册按钮：创建文件夹，向数据库插入数据：
 * 		前提：锁都是true时，才发送ajax请求
 * 		formData发送:
 * */
const $regist=$('#regist')
$regist.click(function(){
    //序列化数据
    let formData = new FormData($regist_form[0])
    if(regist_username_lock==true&&regist_password_lock==true&&regist_repeat_password_lock==true){
        $.ajax({
            url:'http://localhost:3000/regist',
            type:'post',
            data:formData,
            dataType:"json",
            //内容设置
            contentType:false,
            //序列化数据
            processData:false,
            success:function (data) {
                if(!data.error){
                    //触发登陆form
                    $show_login.trigger("click");
                }
            }
        })
    }
})

/**
 *04 登陆 ： 检测用户名
 *
 * 用户名合格，密码不为空时，	发送ajax
 *
 */

const $login  = $('#login')
$login.click(function () {
    let username = $login_username.val();
    let password = $login_password.val();
    let result_name = Strategy.use('notEmpty',username)
    let result_pass = Strategy.use('notEmpty',password)
    if(result_name || result_pass){
        $login_tips.html(result_name)
        //阻止form表单发送请求
        return false;
    }
})




