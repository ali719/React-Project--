/**
 * Created by Administrator on 2018/10/31.
 */
//引入express模块
const express = require('express');3
// 引入连接的数据库
const db = require('./db');
// 引入路由器模块
const router = require('./router');
// 创建app应用对象
const app = express();

(async () => {
  await db;
  //应用路由器
  app.use(router);
})()

// 监听端口号
app.listen(3002,err => {
  if (!err) console.log('服务器启动成功');
  else console.log(err);
})