const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3010

const users = require('./routes/users')
const companies = require('./routes/companies')

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, express and postgres' })
})

// Users block
app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUser)
app.put('/users', users.updateUser)
app.delete('/users/:id', users.deleteUser)

// Companies block
app.get('/companies', companies.getCompanies)
app.put('/companies', companies.updateCompany)
app.post('/companies', companies.createCompany)
app.delete('/companies/:id', companies.deleteCompany)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
