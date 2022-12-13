const express = require('express')
// 创建路由对象
const router = express.Router()

const listsHandler = require('../router_handler/lists.js')

// 获取文章系列
router.get('', listsHandler.fetchLists)

// 将路由对象共享出去
module.exports = router
