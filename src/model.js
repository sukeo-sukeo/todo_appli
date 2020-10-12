const mongoose = require('mongoose')

const TodoListShema = mongoose.model('todoLists', {
  username: String,
  title:  String,
  descript: String,
  addDate: String,
  limitDate: String,
  rating: Number,
  comment: String,
  tags: Array
 })

const ArchiveShema = mongoose.model('archives', {
  username: String,
  title:  String,
  descript: String,
  addDate: String,
  limitDate: String,
  rating: Number,
  comment: String,
  tags: Array
 })

const UserSchema = mongoose.model('users', {
  username: String,
  password: String
})

module.exports = {TodoListShema, ArchiveShema, UserSchema}
