// Package Imports
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Table } from 'react-bootstrap';
import ROLES from '../../../api/Users/roles';

class AdminDash extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Roles.userIsInRole(user, ["ADMIN"]);
  }

  componentWillUnmount() {
    this.props.subscriptions.forEach((s) =>{
      s.stop();
    });
  }

  showUsersList() {
    const users = this.props.usersList;
    return (
      <tbody>
      {
        users.map((user, idx) =>
          <tr key={idx}>
            <td>{idx + 1} </td>
            <td>
              <Link to={{ pathname: `/admin/users/${user._id}` }}>{user.profile.name.first}</Link>
            </td>
            <td>{user.emails[0].address}</td>
            <td>{Roles.getRolesForUser(user._id)}</td>
          </tr>
        )
      }
      </tbody>
    );
  }

  showLoading() {
    if (!this.props.loading || 0 < _.size(this.props.usersList)) {
      return false;
    }
    return (
      <div><p>Loading</p></div>
    );
  }

  render() {
    return this.showLoading() || (
      <div>
        <Table className="AdminTable" striped bordered condensed hover responsive >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>Roles</th>
            </tr>
          </thead>
          {this.showUsersList()}
        </Table>
      </div>
    );
  }
}

AdminDash.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool,
  usersList: PropTypes.array
};

// Fetch User & Role data from server
export default withTracker(() =>{
  const subscription = Meteor.subscribe('users');
  const loading = !subscription.ready();
  const usersList = !loading ? Meteor.users.find().fetch() : undefined;


  return {
    subscriptions: [subscription],
    loading,
    usersList,
  };

})(AdminDash);
