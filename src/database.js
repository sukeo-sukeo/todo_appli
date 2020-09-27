const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1/todo'

const options = {
  useUnifiedTopology : true,
  useNewUrlParser: true
}

mongoose.connect(mongoDB, options)
mongoose.Promise = global.Promise //調べる

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('MongoDB connection successful!'))

module.exports = db
