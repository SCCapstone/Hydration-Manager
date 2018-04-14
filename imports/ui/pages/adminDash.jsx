// Package Imports
import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Roles} from 'meteor/alanning:roles';
import {Table, Glyphicon, Checkbox} from 'react-bootstrap';
import ROLES from '../../api/Users/roles';
import autoBind from 'react-autobind';

/* Administration Dashboard Component will be used solely by the administrator, but
 * definitely by a super administrator, but potentially by regular administrator*/
class AdminDash extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    };

    componentWillMount() {
        //   Roles.userIsInRole(user, ["ADMIN"]);
    }

    /* Subscriptions */
    componentWillUnmount() {
        this.props.subscriptions.forEach((s) => {
            s.stop();
        });
    };

    /* Loading Progress Panel */
    // This function is never used? -anthony
    showLoading() {
        if (!this.props.loading || 0 < _.size(this.props.usersList)) {
            return false;
        }
        return (
            <div><p>Loading</p></div>
        );
    };

    /* Method that checks the status of the current user for authentication */
    checkIfCurrentUser(mappedUserId, currentUserId) {
        return mappedUserId === currentUserId;
    };

    /* Gathers and displays the user data */
    showUsersList() {
        const users = this.props.usersList;
        const selectRoles = ROLES;
        //console.log(selectRoles);
        return (
            <tbody> {
                users.map((user) => {
                    const isCurrentUser = this.checkIfCurrentUser(user._id, this.props.userId),
                        userRole = Roles.getRolesForUser(user._id);
                    return (
                        <tr key={user._id}>
                            <td width="5%">{!!isCurrentUser ? <Glyphicon glyph="ok"/> : ''}</td>
                            <td>{user.emails[0].address}</td>
                            <td width="5%"><Checkbox onChange={() => console.log("Hello")}/></td>
                            <td><select className="form-control" value={userRole[0]} onChange={(event) => {this.handleRoleChange({_id: user._id, role: event.target.value});}}>
                                {selectRoles.map((role) => (<option key={role} value={role}>{role}</option>))}</select>
                            </td>
                        </tr>
                    )
                })
            } </tbody>
        )
    }

    /* Method for changing the role of a user */
    handleRoleChange(update_obj) {
        Meteor.call('users.changeRole', update_obj, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Role updated!', 'success');
            }
        });
    };

    /* Displays Table of Users, including Name, Email, Verification Status, and Role Status */
    render() {
        return (
            <div>
                <h3>Admin Dashboard</h3>
                <Table className="AdminTable" striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Current User:</th>
                        <th>Email:</th>
                        <th>Verified:</th>
                        <th>Roles:</th>
                    </tr>
                    </thead>
                    {this.showUsersList()}
                </Table>
            </div>
        )
    }
}

AdminDash.propTypes = {
    subscriptions: PropTypes.array,
    loading: PropTypes.bool,
    usersList: PropTypes.array,
    userId: PropTypes.string,
};
// Fetch User & Role data from server
export default withTracker(() => {
    const subscription = Meteor.subscribe('users.all');
    const loading = !subscription.ready();
    const usersList = !loading ? Meteor.users.find().fetch() : [];
    // const roleSubcription = Meteor.subscribe('users.roles');
    // const allRoles = !roleSubcription.ready() ? [] : Roles.getAllRoles().fetch();
    const allRoles = Roles.getAllRoles().fetch();
    return {
        subscriptions: [subscription],
        loading,
        usersList,
        allRoles,
    };
})(AdminDash);
