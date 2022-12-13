const db = require('../db/index.js')

exports.fetchSeries = async function (req, res) {
  try {
    const id = req.query.id
    const headerSql = `SELECT id,name,text FROM series WHERE id = ${id}`
    const header = await new Promise((resolve) => {
      db.query(headerSql, (err, results) => {
        if (err) throw err
        resolve(results)
      })
    })

    const page = req.query.page
    const pagingSql = `SELECT id,title,brief,href,img,typeName FROM lists WHERE type = ${id} ORDER BY id DESC LIMIT ${
      (page - 1) * 6
    },6`
    const paging = await new Promise((resolve) => {
      db.query(pagingSql, (err, results) => {
        if (err) throw err
        resolve(results)
      })
    })
    const data = {
      state: 0,
      data: {
        header,
        paging
      }
    }
    res.send(data)
  } catch (err) {
    res.send(err)
  }
}
