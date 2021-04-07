
const fs = require('fs');
module.exports = function management(req, res){
    console.log('管理相册');
    // 获取用户当前文件夹
    fs.readdir("albums/" + req.session.username , function(err, arr){
        if(err){
            res.redirect("error?msg=" + "获取文件失败")
            return;
        }
        //console.log(arr.length,arr)
        let imgarr = [];
        for(var i=0; i<arr.length; i++){
            // 获取用户相册
            // 这里一定要使用同步方法
            let arr1 = fs.readdirSync("albums/" + req.session.username + "/" + arr[i])
            imgarr.push(arr1[0]);
        }
         //console.log(imgarr);
        // 渲染新页面
        //console.log("2141"+req.session.head_pic_path);
        res.render("management", {
            username : req.session.username,
            head_pic_path : req.session.head_pic_path,
            albumName : arr,
            imgName : imgarr
        })
    })

}

