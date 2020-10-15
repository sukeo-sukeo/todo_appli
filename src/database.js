const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI || process.env.DB_PATH

const options = {
  useUnifiedTopology : true,
  useNewUrlParser: true,
}

if (!process.env.MONGODB_URI) {
  options.auth = {authSource: 'admin'}
  options.user = process.env.DB_USER
  options.pass = process.env.DB_PASS
}

mongoose.connect(mongoDB, options)
mongoose.Promise = global.Promise //調べる

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('MongoDB connection successful!'))

module.exports = db
