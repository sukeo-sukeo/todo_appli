const mongoose = require('mongoose')
const mongoDB = process.env.DB_PATH || 'mongodb://localhost:27017/todo'

const options = {
  useUnifiedTopology : true,
  useNewUrlParser: true,
  auth: {
     authSource: 'admin'
    },
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}

mongoose.connect(mongoDB, options)
mongoose.Promise = global.Promise //調べる

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('MongoDB connection successful!'))

module.exports = db
