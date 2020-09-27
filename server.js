const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const db = require('./src/database')
const {TodoListShema: Todo, ArchiveShema: Archive} = require('./src/model')
const {add, eras, update} = require('./src/control')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', express.static('public'))

app.post('/', (req, res) => {
  const todoData = new Todo({
    title: req.body.title,
    descript: req.body.descript,
    addDate: new Date(),
    limitDate: req.body.limit,
    rating: req.body.rating,
    comment: req.body.comment,
    tags: req.body.tags
  })
  add(Todo, todoData)
  res.redirect('/')
})

app.post('/delete/:id', (req, res) => {
  eras(Archive, req.params.id)
  res.redirect('/')
})

app.post('/update/:id', (req, res) => {
  update(Todo, req.body, req.params.id)
  res.redirect('/')
})

app.post('/archive/:id', (req, res) => {
  Todo.find({_id: req.params.id}, (err, docs) => {
    console.log(docs)
    //archive.collectionへ追加
    add(Archive, docs)
    //todolists.collectionのデータを削除
    eras(Todo, req.params.id)
    res.redirect('/')
  })
})

app.post('/list/:id', (req, res) => {
   Archive.find({_id: req.params.id}, (err, docs) => {
    console.log(docs)
    //archive.collectionへ追加
    add(Todo, docs)
    //todolists.collectionのデータを削除
    eras(Archive, req.params.id)
    res.redirect('/')
  })
})

app.get('/getdata', (req, res) => {
  console.log('getきた');
  Todo.find({}, (err, docs) => {
    console.log(docs)
    res.send(docs)
  })
})

app.get('/getarchivedata', (req, res) => {
  console.log('archiveきた');
  Archive.find({}, (err, docs) => {
    console.log(docs)
    res.send(docs)
  })
})




app.listen(port, () => {
  console.log(`todo project listening on port ${port}!`)
})
