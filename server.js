const express = require('express')
const app = express()
app.disable('x-powered-by')

const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || process.env.SERVER_PORT

const db = require('./src/database')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', express.static('public'))
app.use('/control', require('./src/router/control'))
app.use('/account', require('./src/router/account'))

app.listen(port, () => {
  console.log(`todo project listening!`)
})
