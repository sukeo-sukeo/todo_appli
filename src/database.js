const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/todo'

const options = {
  useUnifiedTopology : true,
  useNewUrlParser: true,
  auth: {
     authSource: 'admin'
    },
    user: 'user1',
    pass: 'abc123'
}

mongoose.connect(mongoDB, options)
mongoose.Promise = global.Promise //調べる

const db = mongoose.connection


db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('MongoDB connection successful!'))

module.exports = db
