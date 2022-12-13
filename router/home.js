const express = require('express')
// 创建路由对象
const router = express.Router()

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_home_schema } = require('../schema/home.js')
const homeHandler = require('../router_handler/home.js')

// 获取文章系列
router.get('/:page', expressJoi(reg_home_schema), homeHandler.fetchHome)

// 将路由对象共享出去
module.exports = router
