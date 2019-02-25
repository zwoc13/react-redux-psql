const pool = require('../queries')

const getCompanies = (request, response) => {
  const query = 'SELECT * FROM companies ORDER BY id ASC'
  pool.query(query)
    .then(res => response.status(200).json(res.rows))
    .catch(err => console.error(err))
}

const createCompany = (request, response) => {
  const { name } = request.body
  const query = 'INSERT INTO companies (name) VALUES ($1)'
  const values = [ name ]
  pool.query(query, values)
    .then(() => response.status(200).json(`Comapny with name ${name} is created`))
    .catch(err => console.error(err))
}

const updateCompany = (request, response) => {
  const { id, name, oldName } = request.body
  const query = 'UPDATE companies SET name = $1 WHERE id = $2'
  const values = [ name, id ]
  pool.query(query, values)
    .then(() => {
      const usersQuery = 'UPDATE users SET company = $1 WHERE company = $2'
      const usersValues = [ name, oldName ]
      pool.query(usersQuery, usersValues)
        .then(() => response.status(200).send('Company and users are updated'))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

const deleteCompany = (request, response) => {
  const id = parseInt(request.params.id)
  const query = 'DELETE FROM companies WHERE id = $1'
  const values = [ id, oldName ]
  pool.query(query, values)
    .then(() => {
      const usersQuery = 'UPDATE users set company = "" WHERE company = $1'
      const usersValues = [ oldName ]
      pool.query(usersQuery, usersValues)
        .then(() => response.status(200).send('Company and users companies are updated'))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

module.exports = {
  getCompanies,
  updateCompany,
  createCompany,
  deleteCompany,
}
