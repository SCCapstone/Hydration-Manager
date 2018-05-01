// Package Imports
import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Roles} from 'meteor/alanning:roles';
import {Table, Glyphicon, Checkbox} from 'react-bootstrap';
import ROLES from '../../api/Users/roles';
import autoBind from 'react-autobind';

// Custom File Imports
import TeamsCollection from '../../api/Teams/Teams.js';
import {Meteor} from "meteor/meteor";

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
        return (
            <tbody> {
                users.map((user) => {
                    const isCurrentUser = this.checkIfCurrentUser(user._id, this.props.userId),
                        userRole = Roles.getRolesForUser(user._id);
                    return (
                        <tr key={user._id}>
                            <td width="5%">{!!isCurrentUser ? <Glyphicon glyph="ok"/> : ''}</td>
                            <td>{user.emails[0].address}</td>
                            <td><select className="form-control" value={userRole[0]} onChange={(event) => {
                                this.handleRoleChange({_id: user._id, role: event.target.value});
                            }}>
                                {selectRoles.map((role) => (<option key={role} value={role}>{role}</option>))}</select>
                            </td>
                        </tr>
                    )
                })
            } </tbody>
        )
    }

    accessList(userAccess) {
        let message = '';
        for (let i = 0; i < userAccess.length; i++) {
            //console.log(userAccess[i]);
            let user = Meteor.users.findOne({"_id": userAccess[i]});
            //console.log(user);
            //console.log(user.emails[0].address);
            message += user.emails[0].address + "\r\n";
            //console.log(message);
        }
        //console.log(message);
        return message;
    };


    showTeamsList() {
        const teams = this.props.teamsList;
        const users = this.props.usersList;

        return (
            <tbody> {
                teams.map((team) => {
                    return (
                        <tr key={team._id}>
                            <td width="20%">{team.name} {team.season}</td>
                            <td>
                                <pre>{this.accessList(team.usersAccess)}</pre>
                            </td>
                            <td>
                                <select className="form-control" value={users[0]} onChange={(event) => {
                                    this.handleAddUserAccess({
                                        id: team._id,
                                        usrEmail: event.target.value,
                                        userID: Meteor.users.findOne({"emails.address": event.target.value})._id
                                    });
                                }}>
                                    <option>Select user</option>
                                    {users.map((user) => (<option key={user._id}
                                                                  value={user.emails[0].address}>{user.emails[0].address}</option>))}
                                </select>
                            </td>
                            <td>
                                <select className="form-control" value={users[0]} onChange={(event) => {
                                    this.handleRemoveUserAccess({
                                        id: team._id,
                                        usrEmail: event.target.value,
                                        userID: Meteor.users.findOne({"emails.address": event.target.value})._id
                                    });
                                }}>
                                    <option>Select user</option>
                                    {users.map((user) => (<option key={user._id}
                                                                  value={user.emails[0].address}>{user.emails[0].address}</option>))}
                                </select>
                            </td>

                        </tr>
                    )
                })
            } </tbody>
        )
    }

    handleAddUserAccess(update_obj) {
        let team = TeamsCollection.findOne({_id: update_obj.id, usersAccess: update_obj.userID});
        if (team === undefined) {
            Meteor.call('teams.addUserAccess', update_obj.id, update_obj.usrEmail, update_obj.userID, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-top-left', 'fa-remove');
                } else {
                    Bert.alert('Added User Access!', 'success', 'growl-top-left', 'fa-check');
                    //console.log(update_obj.userID);
                    //console.log(this.props.userRoles[0]);
                    Meteor.users.update({_id: update_obj.userID}, {
                        $push: {
                            "profile.teamAccess": update_obj.id,
                        }
                    });
                    /*if(!check){ // Need to error check to ensure these lists always stay aligned. If they didn't, then undo what we just did.
                        Meteor.users.update({_id: update_obj.userID}, {
                            $pull: {
                                "profile.teamAccess": currentTeam._id,
                            }
                        });
                    }*/
                }
            });
        }
    };

    handleRemoveUserAccess(update_obj) {
        let team = TeamsCollection.findOne({
            _id: update_obj.id,
            usersAccess: update_obj.userID
        });
        if (team !== undefined) {
            Meteor.call('teams.removeUserAccess', update_obj.id, update_obj.usrEmail, update_obj.userID, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-top-left', 'fa-remove');
                } else {
                    Bert.alert('Removed User Access!', 'success', 'growl-top-left', 'fa-check');
                    Meteor.users.update({_id: update_obj.userID}, {
                        $pull: {
                            "profile.teamAccess": update_obj.id,
                        }
                    });
                    /*if (!check){ // Need to error check to ensure these lists always stay aligned. If they didn't, then undo what we just did.
                        Meteor.users.update({_id: update_obj.userID}, {
                            $push: {
                                "profile.teamAccess": currentTeam._id,
                            }
                        });
                    }*/
                }
            });
        }
    };


    /* Method for changing the role of a user */
    handleRoleChange(update_obj) {
        Meteor.call('users.changeRole', update_obj, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-top-left', 'fa-remove');
            } else {
                Bert.alert('Role updated!', 'success', 'growl-top-left', 'fa-check');
            }
        });
    }
    ;

    /* Displays Table of Users, including Name, Email, Verification Status, and Role Status */
    render() {
        return (
            <div className="AdminTableDiv">
                <h3>Admin Dashboard</h3>
                <Table className="AdminTable" striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Current User:</th>
                        <th>Email:</th>
                        <th>Roles:</th>
                    </tr>
                    </thead>
                    {this.showUsersList()}
                </Table>

                <h3>Users Allowed Access Per Team</h3>
                <Table className="ViewableTeams" striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Team:</th>
                        <th>Users With Access:</th>
                        <th>Add User Access</th>
                        <th>Remove User Access</th>
                    </tr>
                    </thead>
                    {this.showTeamsList()}
                </Table>
            </div>
        )
    }
}

AdminDash
    .propTypes = {
    subscriptions: PropTypes.array,
    loading: PropTypes.bool,
    usersList: PropTypes.array,
    userId: PropTypes.string,
    teamsList: PropTypes.array,
};
// Fetch User & Role data from server
export default withTracker(
    () => {
        const subscription = Meteor.subscribe('users.all');
        const loading = !subscription.ready();
        const usersList = !loading ? Meteor.users.find().fetch() : [];
        // const roleSubcription = Meteor.subscribe('users.roles');
        // const allRoles = !roleSubcription.ready() ? [] : Roles.getAllRoles().fetch();
        const allRoles = Roles.getAllRoles().fetch();
        const teamSubscription = Meteor.subscribe('teams.all');
        const teamsLoading = !teamSubscription.ready();
        const teamsList = !teamsLoading ? TeamsCollection.find().fetch() : [];
        return {
            subscriptions: [subscription],
            loading,
            usersList,
            allRoles,
            teamsList,
        };
    })
(AdminDash);
