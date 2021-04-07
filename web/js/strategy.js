//定义策略
var Strategy=(function(){
    var ploy ={
        "notEmpty":function(str){
            var reg = /^\s*$/;
            if(reg.test(str)){
                return '请输入内容'
            }
            return '';
        },
        'allEn':function(str){
            var reg = /^[a-zA-Z]{5,10}$/;
            if(reg.test(str)){
                return '';
            }
            return "请输入5~10位的英文字符";
        },
        "equal_both":function(str1,str2) {
            if(str1 === str2){
                return "";
            }else {
                return "两次输入密码不一致";
            }
        },
    }
    //返回方法
    return {
        use:function(type,str){
            if(ploy[type]){
                return ploy[type](str);
            }
            throw new Error(type + "策略不存在");
        },
        add:function(type,handler){
            // 判定是否已经存在该策略
            if (ploy[type]) {
                throw new Error("该策略已经存在");
            }
            ploy[type] = handler;
        },
        equal:function(str1,str2) {
            return ploy.equal_both(str1,str2);
        }
    }
})();