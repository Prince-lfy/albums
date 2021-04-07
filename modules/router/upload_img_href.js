const fs = require('fs');
module.exports = function(req,res){
    let username = req.session.username;
    //读取用户文件夹
    fs.readdir('albums/'+username,function(err,result){
        if(err){
            res.send({
                error:1,
                data:'读取用户文件夹失败文件'
            })
            return;
        }
        //读取成功，渲染页面
        res.render('upload_img',{
            username:req.session.username,
            head_pic_path:req.session.head_pic_path,
            albumName:result

        })
    })

}
