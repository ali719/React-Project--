/**
 * Created by Administrator on 2018/10/31.
 */
// 引入express模块
const express = require('express');

//引入md5加密
const md5 = require('blueimp-md5');

//引入Users
const Users = require('../models/users');


//获取Router
const Router = express.Router;

//创建路由对象
const router = new Router();

//解析请求体数据
router.use(express.urlencoded({extend:true}));

//登录
router.post('/login', (req,res) => {
  //收集用户提交的信息
  const {username,password} = req.body;
  console.log(username,password);
  //判断用户输入是否合法
  if (!username || !password ){
    //有不合法的数据
    res.json({
      "code": 2,
      "msg": "用户输入不合法"
    });
    return;
  }
})
router.post('/register',async (req,res) => {
 //收集用户提交的信息
  const {username,password,type} = req.body;
  console.log(username,password,type);
  //判断用户输入是否合法
  if (!username || !password || !type){
    //有不合法的数据
    res.json({
      "code": 2,
      "msg": "用户输入不合法"
    });
    return;
  }
  
  try {
    const data = await Users.findOne({username,password:md5(password),type});
    
    if (data){
      //返回错误
      res.json({
        "code": 1,
        "msg": "此用户已存在"
      });
    }else {
      const data = await Users.create({username,password:md5(password),type});
      res.json({
        code:0,
        data:{
          _id:data.id,
          username:data.username,
          type:data.type
        }
      })
    }
  }catch (e){
    res.json({
      "code": 3,
      "msg": "网络不稳定请稍后重试"
    });
  }
/*  //去数据库中查找用户是否存在
  Users.findOne(username),(err,data) =>{
    if (!err){
      //方法没有出错
      if (data){
        //找到了指定用户，用户名已存在
        res.json({
          "code": 1,
          "msg": "此用户已存在"
        });
      }else {
        //将用户信息保存在数据库中
        Users.create({username,password:md5(password),type})
          if(!err){
          //注册成功
            res.json({
              code:0,
              data:{
                _id:data.id,
                username:data.username,
                type:data.type
              }
            })
          }else {
            //方法出了问题
            res.json({
              "code": 3,
              "msg": "网络不稳定请稍后重试"
            });
          }
      }
    }else {
      //方法出了问题
      res.json({
        "code": 3,
        "msg": "网络不稳定请稍后重试"
      });
    }
  }*/
})

module.exports = router;
