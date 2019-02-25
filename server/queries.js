const { Pool } = require('pg')
const pool = new Pool({
  user: 'yaroslav',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

module.exports = pool
