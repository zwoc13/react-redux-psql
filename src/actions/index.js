import axios from 'axios'
const api = `http://localhost:3010`

// sync actions
const deliverCompanies = data => {
  return {
    type: 'DELIVER_COMPANIES',
    payload: data
  }
}

const deliverUsers = data => {
  return {
    type: 'DELIVER_USERS',
    payload: data
  }
}

// async actions
export const getAllData = () => dispatch => {
  dispatch(getCompanies())
  dispatch(getUsers())
}

export const getCompanies = () => dispatch => {
  axios.get(`${api}/companies`)
    .then(companies => dispatch(deliverCompanies(companies.data)))
    .catch(err => {
      throw err
    })
}

export const getUsers = () => dispatch => {
  axios.get(`${api}/users`)
    .then(users => dispatch(deliverUsers(users.data)))
    .catch(err => {
      throw err
    })
}

// Companies block

export const createCompany = ({ name }) => dispatch => {
  axios.post(`${api}/companies`, { name })
    .then(() => dispatch(getCompanies()))
    .catch(err => {
      throw err
    })
}
export const updateCompany = ({ id, name, oldName }) => dispatch => {
  axios.put(`${api}/companies`, { id, name, oldName })
    .then(() => dispatch(getAllData()))
    .catch(err => {
      throw err
    })
}
export const deleteCompany = ({ id, oldName }) => dispatch => {
  axios.delete(`${api}/companies/${id}`)
    .then(() => dispatch(getCompanies()))
    .catch(err => {
      throw err
    })
}

// Users Block

export const createUser = ({ name, company }) => dispatch => {
  axios.post(`${api}/users`, { name, company })
    .then(() => dispatch(getUsers()))
    .catch(err => {
      throw err
    })
}
export const updateUser = ({ id, name, company }) => dispatch => {
  axios.put(`${api}/users`, { id, name, company })
    .then(() => dispatch(getAllData()))
    .catch(err => {
      throw err
    })
}
export const deleteUser = ({ id }) => dispatch => {
  axios.delete(`${api}/users/${id}`)
    .then(() => dispatch(getUsers()))
    .catch(err => {
      throw err
    })
}
