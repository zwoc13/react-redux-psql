import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as methods from '../actions'

const StyledForm = styled.form`
  margin: 1em auto;
  padding: 1em;
  max-width: 50%;
`

const FormGroup = styled.div`
  margin: 1em 0;
`

const Divider = styled.div`
  margin: 1em auto;
  max-width: 90%;
  height: 1px;
  background: #dee2e6;
  display: block;
`

class FormControls extends Component {
  constructor() {
    super()
    this.selectField = React.createRef()
    this.form = React.createRef()
  }

  state = {
    actionType: 'createCompany',
    createUser: {
      name: '',
      email: '',
      company: ''
    },
    updateUser: {
      name: '',
      email: '',
      company: ''
    },
    deleteUser: {
      id: ''
    },
    createCompany: {
      name: ''
    },
    updateCompany: {
      id: '',
      name: '',
      oldName: '',
    },
    deleteCompany: {
      id: '',
      oldName: ''
    }
  }

  handleUserUpdate(e) {
    const userId = Number(e.target.value)
    const { users } = this.props
    const user = users.find(u => u.id === userId)
    this.setState({
      updateUser: { ...user }
    })
  }

  formSubmit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    const { actionType } = this.state
    const data = this.state[actionType]
    dispatch(methods[actionType](data))
  }

  render() {
    const { actionType, updateUser, updateCompany } = this.state
    const { users, companies } = this.props
    const formType = {
      'createCompany': (
        <FormGroup className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input className="form-control" onChange={(e) => this.setState({ createCompany: { name: e.target.value } })} />
        </FormGroup>
      ),
      'updateCompany': (
        <div>
          <FormGroup className="form-group">
            <label htmlFor="companyName">Choose company</label>
            <select
              className="form-control"
              onChange={(e) => this.setState({ updateCompany: { ...updateCompany, id: e.target.value, oldName: companies.find(c => c.id === Number(e.target.value)).name } }) }>
              <option>Choose...</option>
              { companies.map(company => {
                  return ( <option value={company.id} key={company.id}>{company.name}</option> )
                })
              }
            </select>
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="companyName">Update the name</label>
            <input className="form-control" onChange={(e) => this.setState({ updateCompany: { ...this.state.updateCompany, name: e.target.value } })} />
          </FormGroup>
        </div>
      ),
      'deleteCompany': (
        <FormGroup className="form-group">
          <label>Select Company</label>
          <select className="form-control" onChange={(e) => this.setState({ deleteCompany: { id: e.target.value, oldName: companies.find(c => c.id === Number(e.target.value)).name } })}>
            <option>Choose...</option>
            { companies.map(company => {
                return ( <option value={company.id} key={company.id}>{company.name}</option> )
              })
            }
          </select>
        </FormGroup>
      ),
      'createUser': (
        <div>
          <FormGroup className="form-group">
            <label htmlFor="companyName">User Name</label>
            <input className="form-control" onChange={(e) => this.setState({ createUser: { ...this.state.createUser, name: e.target.value } })} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="companyName">User Email</label>
            <input className="form-control" onChange={(e) => this.setState({ createUser: { ...this.state.createUser, email: e.target.value } })} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="companyName">Choose company</label>
            <select className="form-control" onChange={(e) => this.setState({ createUser: { ...this.state.createUser, company: e.target.value } })}>
              <option>Choose...</option>
              { companies.map(company => {
                  return ( <option value={company.name} key={company.id}>{company.name}</option> )
                })
              }
            </select>
          </FormGroup>
        </div>
      ),
      'updateUser': (
        <div>
          <FormGroup className="form-group">
            <label>Choose User</label>
            <select className="form-control" onChange={(e) => this.handleUserUpdate(e) }>
              { users.map(user => {
                  return ( <option key={user.id} value={user.id}>{user.name}</option>)
                })
              }
            </select>
          </FormGroup>
          <Divider />
          <FormGroup className="form-group">
            <label htmlFor="companyName">User Name</label>
            <input className="form-control"
              value={!!updateUser ? updateUser.name : ''}
              onChange={(e) => this.setState({ updateUser: { ...updateUser, name: e.target.value } })} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="companyName">User Email</label>
            <input className="form-control"
              value={!!updateUser ? updateUser.email : ''}
              onChange={(e) => this.setState({ updateUser: { ...updateUser, email: e.target.value } })} />
          </FormGroup>
          <FormGroup className="form-group">
            <label htmlFor="companyName">Choose company</label>
            <select className="form-control"
              value={!!updateUser ? updateUser.company : ''}
              onChange={(e) => this.setState({ updateUser: { ...updateUser, company: e.target.value } })}>
              { companies.map(company => {
                  return ( <option value={company.name} key={company.id}>{company.name}</option> )
                })
              }
            </select>
          </FormGroup>
        </div>
      ),
      'deleteUser': (
        <FormGroup className="form-group">
          <label>Select user</label>
          <select className="form-control" onChange={(e) => this.setState({ deleteUser: { id: e.target.value } })}>
            { users.map(user => {
                return ( <option value={user.id} key={user.id}>{user.name} — {user.email}</option> )
              })
            }
          </select>
        </FormGroup>
      )
    }
    return (
      <StyledForm
        className="form-group border rounded"
        ref={this.form}
        onSubmit={(e) => this.formSubmit(e)}
      >
        <label htmlFor="actionType">Action type</label>
        <select
          className="form-control"
          id="action-type"
          onChange={(e) => this.setState({ actionType: e.target.value })}
        >
          <option value="createCompany">Create Company</option>
          <option value="updateCompany">Update Company</option>
          <option value="deleteCompany">Remove Company</option>
          <option value="createUser">Create User</option>
          <option value="updateUser">Update User</option>
          <option value="deleteUser">Remove User</option>
        </select>
        <Divider />
        { formType[actionType] }
        <input type="submit" className="btn btn-primary" />
      </StyledForm>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    companies: state.companies
  }
}

export default connect(
  mapStateToProps
)(FormControls)
