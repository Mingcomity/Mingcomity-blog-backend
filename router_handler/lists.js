// 导入数据库
const db = require('../db/index.js')

exports.fetchLists = async function (req, res) {
  try {
    const sqlPig = `SELECT id,name,href FROM series ORDER BY id DESC`
    const classify = await new Promise((resolve) => {
      db.query(sqlPig, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) throw err
        resolve(results)
      })
    })
    for (let i = 0; i < classify.length; i++) {
      const val = classify[i]
      const sql = `SELECT id,title,brief,href FROM lists WHERE type = ${val.id}`
      await new Promise((resolve) => {
        db.query(sql, (err, results) => {
          if (err) throw err
          val.article = results
          resolve()
        })
      })
    }

    const sqlCla = `SELECT id,name,href FROM period ORDER BY id DESC`
    const pigeonhole = await new Promise((resolve) => {
      db.query(sqlCla, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) throw err
        resolve(results)
      })
    })
    for (let i = 0; i < pigeonhole.length; i++) {
      const val = pigeonhole[i]
      const sql = `SELECT id,title,brief,href FROM lists WHERE period = ${val.id}`
      await new Promise((resolve) => {
        db.query(sql, (err, results) => {
          if (err) throw err
          val.article = results
          resolve()
        })
      })
    }
    const sqlRec = `SELECT id,title,brief,href FROM lists ORDER BY id DESC LIMIT 2`
    const recently = await new Promise((resolve) => {
      db.query(sqlRec, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) throw err
        resolve(results)
      })
    })
    const data = {
      state: 0,
      data: {
        pigeonhole: {
          index: 0,
          data: pigeonhole,
          recently: recently
        },
        classify: {
          index: 1,
          data: classify,
          recently: recently
        }
      }
    }
    res.send(data)
  } catch (error) {
    res.send(err)
  }
}
