const db = require('./database')

//追加
const add = (name, data) => {
  name.insertMany(data)
  .then((item) => console.log(`「${item[0].title}」を追加しました！`))
}

//削除
const eras = (name, id) => {
  name.deleteOne({_id: id})
  .then((item) => console.log(`「${id}」を削除しました！`))
}

//更新
const update = (name, body, id) => {
  name.updateMany(
    {_id: id},
    {
      title: body.title,
      descript: body.descript,
      addDate: new Date(),
      limitDate: body.limit,
      rating: body.rating,
      comment: body.comment,
      tags: body.tags
    }
  )
  .then((item) => console.log(`「${body.title}」に更新しました！`))
}

module.exports = {add, eras, update}
