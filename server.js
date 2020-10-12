const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
// const account = require('./src/router/account')

const port = 3000

const db = require('./src/database')

app.use(session({
  secret: 'secret word',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', express.static('public'))
app.use('/control', require('./src/router/control'))
app.use('/account', require('./src/router/account'))

app.listen(port, () => {
  console.log(`todo project listening on port ${port}!`)
})
