import React, { Component } from 'react'
import FormControls from './FormControls'
import { connect } from 'react-redux'
import s from 'styled-components'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Header = s.h1`
  font-size: 24px;
  text-align: left;
  margin: 1em 0;
`

class App extends Component {
  render() {
    const { companies, users } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 justify-content-center">
            <FormControls />
          </div>
          <div className="col-md-12">
            <Header>Companies Table</Header>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Company name</th>
                </tr>
              </thead>
              <tbody>
                { companies.map(company => {
                  return (
                    <tr key={company.id}>
                      <td>{ company.id }</td>
                      <td>{ company.name }</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Header>Users Table</Header>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User name</th>
                  <th scope="col">User email</th>
                  <th scope="col">Company name</th>
                </tr>
              </thead>
              <tbody>
                { users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{ user.id }</td>
                      <td>{ user.name }</td>
                      <td>{ user.email }</td>
                      <td>{ user.company }</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    companies: state.companies,
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(App)
