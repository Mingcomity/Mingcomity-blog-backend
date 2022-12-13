const db = require('../db/index.js')

exports.fetchArticle = async function (req, res) {
  try {
    const { article, page } = req.query
    const artSql = `SELECT title,text,brief,img,nav,typeName FROM article WHERE id = ${article} `
    const art = await new Promise((resolve) => {
      db.query(artSql, (err, results) => {
        if (err) throw err
        resolve(results)
      })
    })
    const pagingSql = `SELECT page,text FROM article_text WHERE article = ${article} AND page = ${page} `
    const paging = await new Promise((resolve) => {
      db.query(pagingSql, (err, results) => {
        if (err) throw err
        resolve(results)
      })
    })
    const data = {
      state: 0,
      data: {
        art,
        paging
      }
    }
    res.send(data)
  } catch (err) {
    res.send(err)
  }
}
