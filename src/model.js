const mongoose = require('mongoose')

const TodoListShema = mongoose.model('todoLists', {
  title:  String,
  descript: String,
  addDate: String,
  limitDate: String,
  rating: Number,
  comment: String,
  tags: Array
 })

const ArchiveShema = mongoose.model('archives', {
  title:  String,
  descript: String,
  addDate: String,
  limitDate: String,
  rating: Number,
  comment: String,
  tags: Array
 })

module.exports = {TodoListShema, ArchiveShema}
