const express = require('express')
const app = express()
app.disable('x-powered-by')

const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoStore = require('connect-mongo')(session)

const port = process.env.PORT || process.env.SERVER_PORT

const db = require('./src/database')

app.set('trust proxy', 1)
const session_opt = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  name: 'sessionId',
  store: new mongoStore({
    mongooseConnection: db
  }),
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24 * 7
  }
}

app.use(session(session_opt));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', express.static('public'))
app.use('/control', require('./src/router/control'))
app.use('/account', require('./src/router/account'))

app.listen(port, () => {
  console.log(`todo project listening!`)
})
