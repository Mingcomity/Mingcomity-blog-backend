const db = require('../db/index.js')

exports.fetchDate = async function (req, res) {
  try {
    const { period, page } = req.query
    const pagingSql = `SELECT id,title,brief,href,img,typeName FROM lists WHERE period = ${period} ORDER BY id DESC LIMIT ${
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
        period,
        paging
      }
    }
    res.send(data)
  } catch (err) {
    res.send(err)
  }
}
