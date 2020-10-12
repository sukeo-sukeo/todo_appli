const router = require('express').Router()
const { UserSchema: User, TodoListShema: Todo, ArchiveShema: Archive } = require('../model')

const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const userData = new User({
    username: req.body.username,
    password: hashedPassword
  })
  User.find({ username: userData.username }, (err, docs) => {
    if (docs.length) {
      res.send({
        msg: 'そのユーザー名は使えません',
        isInit: false
      })
      return
    } else {
      User.insertMany(userData)
      .then(item => console.log(`${userData.username}を追加しました！`))
      .then(() => res.send({
        msg: '登録が完了しました！ログインしてください',
        isInit: true
      }))
    }
  })
})

router.post('/login', (req, res) => {
  User.find({
    username: req.body.username,
  }, async (err, docs) => {
    console.log(docs);
    if (!docs.length) {
      res.send({
        msg: 'ユーザー名 か パスワード が間違っています',
        isLogin: false
      })
      return
    }
    const compared = await bcrypt.compare(req.body.password, docs[0].password)
    if (!compared) {
      res.send({
        msg: 'ユーザー名 か パスワード が間違っています',
        isLogin: false
      })
      return
    } else {
      res.send({
        msg: 'ログインできました',
        isLogin: true,
        username: req.body.username
      })
    }
  })
})

module.exports = router
