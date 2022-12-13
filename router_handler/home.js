const db = require('../db/index.js')

exports.fetchHome = async function (req, res) {
  try {
    const page = req.params.page
    const featuredSql = `SELECT id,title,brief,href,img,typeName FROM lists WHERE featured = 1`
    const featured = await new Promise((resolve) => {
      db.query(featuredSql, (err, results) => {
        if (err) throw err
        resolve(results)
      })
    })

    const pagingSql = `SELECT id,title,brief,href,img,typeName FROM lists ORDER BY id DESC LIMIT ${
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
        featured,
        paging
      }
    }
    res.send(data)
  } catch (err) {
    res.send(err)
  }
}
