const pool = require('../queries')
const getUsers = (request, response) => {
  const query = 'SELECT * FROM users ORDEr BY id ASC'
  pool.query(query)
    .then(res => response.status(200).json(res.rows))
    .catch(err => console.error(err))
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  const query = 'SELECT * FROM users WHERE id = $1'
  const values = [ id ]
  pool.query(query, values)
    .then(res => response.status(200).json(res.rows))
    .catch(err => console.error(err))
}

const createUser = (request, response) => {
  const { name, email, company } = request.body
  const query = 'INSERT INTO users (name, email, company) VALUES ($1, $2, $3)'
  const values = [ name, email, company ]
  pool.query(query, values)
    .then(() => response.status(200).json('The user is created'))
    .catch(err => console.error(err))
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, company } = request.body
  const query = 'UPDATE users SET name = $1, email = $2, company = $3 WHERE id = $4'
  const values = [ name, email, company, id ]
  pool.query(query, values)
    .then(() => response.status(200).send('User is modified'))
    .catch(err => console.error(err))
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)
  const query = 'DELETE FROM users WHERE id = $1'
  const values = [ id ]
  pool.query(query, values)
    .then(() => response.status(200).send('User is deleted'))
    .catch(err => console.error(err))
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
