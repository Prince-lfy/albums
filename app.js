const express = require("express")
const app = express()

const conf = require('./modules/conf')
const router = require('./modules/router')

conf(app)
app.use(router)




app.listen('3000',function(){
    console.log('3000端口已经开启')
})