// 导入 express 模块
const express = require('express')
// 数据验证
const joi = require('joi')
const fs = require('fs')
const https = require('https')
const path = require('path')

// 端口号
const port = process.env.PORT || 1205

// 导入获取文章系列
const listsRouter = require('./router/lists.js')
const homeRouter = require('./router/home.js')
const seriesRouter = require('./router/series.js')
const dateRouter = require('./router/date.js')
const aritcleRouter = require('./router/article.js')
// 导入 cors 中间件
const cors = require('cors')

// 创建 express 的服务器实例
const app = express()

// 表单解析
app.use(express.urlencoded({ extended: false }))

// 将 cors 注册为全局中间件
app.use(cors())

// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 表单验证错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})

// 注册
app.use('/fetch', listsRouter)
app.use('/home', homeRouter)
app.use('/series', seriesRouter)
app.use('/date', dateRouter)
app.use('/article', aritcleRouter)

//key文件
// const privateKey = fs.readFileSync(
//   path.join(__dirname, './https/mingcomity.cn.key'),
//   'utf8'
// )
//crt文件
// const certificate = fs.readFileSync(
//   path.join(__dirname, './https/mingcomity.cn_bundle.crt'),
//   'utf8'
// )
// const credentials = {
//   key: privateKey,
//   cert: certificate
// }

//app是创建的express实例
// const httpsServer = https.createServer(credentials, app)

// httpsServer.listen(port, () => {
//   console.log(`listening on port:${port}`)
// })

//调用 app.listen 方法，指定端口号并启动web服务器
app.listen(443, function () {
  console.log('api server running at http://127.0.0.1:1205')
})
