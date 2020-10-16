const express = require('express')
const app = express()
app.disable('x-powered-by')

const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || process.env.SERVER_PORT

const db = require('./src/database')

app.use((req, res, next) => {
  if (req.session) {
    console.log(req.session);
    next();
  } else {
    console.log(req.session);
    next()
    // res.redirect('/login');
  }
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', express.static('public'))
app.use('/control', require('./src/router/control'))
app.use('/account', require('./src/router/account'))

app.listen(port, () => {
  console.log(`todo project listening!`)
})
