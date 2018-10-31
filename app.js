/**
 * Created by Administrator on 2018/10/31.
 */
//引入express模块
const express = require('express');
// 引入连接的数据库
const db = require('./db');


// 创建app应用对象
const app = express();

// 监听端口号
app.listen(4000,err => {
  if (!err) console.log('服务器启动成功');
  else console.log(err);
})