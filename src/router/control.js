const router = require('express').Router()
const { TodoListShema: Todo, ArchiveShema: Archive } = require('../model')

router.post('/add', (req, res) => {
  const todoData = new Todo({
    username: req.body.username,
    title: req.body.title,
    descript: req.body.descript,
    addDate: new Date(),
    limitDate: req.body.limit,
    rating: req.body.rating,
    comment: req.body.comment,
    tags: req.body.tags
  })

  Todo.insertMany(todoData)
  .then(item => console.log(`${item}を追加しました！`))
  .then(() => res.redirect('/'))
})

router.post('/delete/:id', (req, res) => {
  Archive.deleteOne({_id: req.params.id})
  .then(item => console.log(`${item}を削除しました！`))
  .then(() => res.redirect('/'))
})

router.post('/update/:id', (req, res) => {
  Todo.updateMany(
    {_id: req.params.id},
    {
      title: req.body.title,
      descript: req.body.descript,
      addDate: new Date(),
      limitDate: req.body.limit,
      rating: req.body.rating,
      comment: req.body.comment,
      tags: req.body.tags
    }
  )
  .then(item => console.log(`「${req.body.title}」に更新しました！`))
  .then(() => res.redirect('/'))
})

router.post('/archive/:id', (req, res) => {
  Todo.find({_id: req.params.id}, (err, docs) => {
    console.log(`${docs[0].title}をアーカイブへ移動しました！`)
    Archive.insertMany(docs)
    .then(item => Todo.deleteOne({_id: req.params.id}))
    .then(() => res.redirect('/'))
  })
})

router.post('/list/:id', (req, res) => {
  Archive.find({_id: req.params.id}, (err, docs) => {
    console.log(`${docs[0].title}をリストへ戻しました！`)
    Todo.insertMany(docs)
    .then(item => Archive.deleteOne({_id: req.params.id}))
    .then(() => res.redirect('/'))
  })
})

router.post('/getdata', (req, res) => {
  Todo.find({ username: req.body.username }, (err, docs) => {
    console.log(`${docs.length}個のToDoを発見！`);
    res.send(docs)
  })
})

router.post('/getarchivedata', (req, res) => {
  Archive.find({ username: req.body.username }, (err, docs) => {
    console.log(`${docs.length}個のArchiveを発見！`);
    res.send(docs)
  })
})

module.exports = router
