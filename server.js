const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.SERVER_PORT || 3000

const db = require('./src/database')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', express.static('public'))
app.use('/control', require('./src/router/control'))
app.use('/account', require('./src/router/account'))

app.listen(port, () => {
  console.log(`todo project listening!`)
})
