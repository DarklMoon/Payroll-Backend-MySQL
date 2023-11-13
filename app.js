const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const all = require("./salay_all/salary")
const base = require("./salarybase/salarybase")
const deduc = require("./deduction/deduction")
const add = require("./addition/addition") 

app.use(cors())
app.use(all.router)
app.use(base.router)
app.use(deduc.router)
app.use(add.router)

app.listen(3001, () => {})