const mongodb = require('mongodb');
//连接客户端
const mongoClient = mongodb.MongoClient;
const connectStr = 'mongodb://localhost:27017'

function connect(callback){
    //连接数据库
    mongoClient.connect(connectStr,{useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
        if(err){
            callback(err,null)
            return
        }
        callback(null,client)
    })
}

module.exports = connect;