import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { UsersCollection } from '/imports/api/UsersCollection'

class Users extends Component {
  constructor(props){
    super(props)
    this.state={

    }

  }

  renderUsersTable(){
    let users = this.props.users

    return users.map((member, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{member.username}</td>
        <td>{member.email}</td>
        <td>{member.profile.first_name}</td>
        <td>{member.profile.last_name}</td>
        <td>{member.profile.sport_name}</td>
      </tr>
    ))
  }

  render() {
    return (
      <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <h1>Users</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/app">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Sport</th>
              </tr>
              </thead>
              <tbody>
              {this.renderUsersTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(props => {
  const usersSubscription = Meteor.subscribe("UsersCollection")
  const loading = usersSubscription ? !usersSubscription.ready() : true

  return {
    loading,
    users: UsersCollection.find().fetch()
  }
})(Users)