const express = require('express')
// 创建路由对象
const router = express.Router()

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_article_schema } = require('../schema/article.js')
const articleHandler = require('../router_handler/article.js')

// 获取文章系列
router.get('', expressJoi(reg_article_schema), articleHandler.fetchArticle)

// 将路由对象共享出去
module.exports = router
