const connect = require('../db');

module.exports = function(req,res) {
    //查询数据库，获取用户的全部信息
    connect(function(err,client){
        if(err){
            res.send({
                error:1,
                data:'连接数据失败'
            })
            return
        }

        let db = client.db("xiangce")
        let collection = db.collection('users')
        collection.find({username:req.session.username}).toArray(function(err,result){
            if(err){
                res.send({
                    error:2,
                    data:'查询用户数据失败'
                })
                return
            }
            req.session.sex = result[0].sex;
            res.render("personInfo",{
                username : req.session.username,
                head_pic_path: result[0].head_pic_path,
                role: result[0].role,
                age: result[0].age,
                work: result[0].worK,
                sex: result[0].sex,
                email: result[0].email


            })
            return ;
        })

    })


}
