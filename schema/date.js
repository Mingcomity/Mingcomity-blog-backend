const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const page = joi.number().min(1).required()
const period = joi.number().min(1).required()

// 注册和登录表单的验证规则对象
exports.reg_date_schema = {
  // 表示需要对 req.body 中的数据进行验证
  query: {
    page,
    period
  }
}
