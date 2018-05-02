// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {Button, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import {withTracker} from 'meteor/react-meteor-data';
import $ from 'jquery';
import 'jquery-validation';

// Custom File Imports
import GenericFooter from '../components/GenericFooter';
import TeamsCollection from "../../api/Teams/Teams";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        autoBind(this);
    };

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        const component = this;
        $(component.form).validate({
            rules: {
                firstName: {required: false},
                lastName: {required: false},
                emailAddress: {required: true, email: true},
                currentPassword: {
                    required() {
                        // Only required if newPassword field has a value.
                        return component.form.newPassword.value.length > 0;
                    },
                },
                newPassword: {
                    required() {
                        // Only required if currentPassword field has a value.
                        return component.form.currentPassword.value.length > 0;
                    },
                },
            },
            messages: {
                firstName: {required: 'What\'s your first name?'},
                lastName: {required: 'What\'s your last name?'},
                emailAddress: {required: 'Need an email address here.', email: 'Is this email address correct?'},
                currentPassword: {required: 'Need your current password if changing.'},
                newPassword: {required: 'Need your new password if changing.'},
            },
            submitHandler() {
                component.handleSubmit(component.form);
            },
        });
    };

    getUserType(user) {
        const userToCheck = user;
        delete userToCheck.services.resume;
        const service = Object.keys(userToCheck.services)[0];
        return service === 'password' ? 'password' : 'oauth';
    };

    handleDeleteAccount(){
        const id = this.props.userId;
        let teams = this.teamsList;
        {/*TODO: Remove this user from all teams access list for cleanup of arrays*/}
        Meteor.call('users.deleteAccount', id, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-top-left', 'fa-remove');
            } else {
                Bert.alert('Account deleted!', 'success', 'growl-top-left', 'fa-check');
                window.location ='/login';
            }
        });
    }

    handleSubmit(form) {
        const id = this.props.userId;
        const email = form.emailAddress.value;
        const phone = form.phone.value;

        Meteor.call('users.editProfile', id, email, phone, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-top-left', 'fa-remove');
            } else {
                Bert.alert('Profile updated!', 'success', 'growl-top-left', 'fa-check');
            }
        });

        if (form.newPassword.value) {
            Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-top-left', 'fa-remove');
                } else {
                    form.currentPassword.value = '';
                    form.newPassword.value = '';
                }
            });
        }
    };

    renderPasswordUser(loading, user) {
        console.log(user.profile);
        return !loading ? (
            <div className="ProfileForm">
                <FormGroup>
                    <ControlLabel>Email Address</ControlLabel>
                    <input type="email" name="emailAddress" defaultValue={user.emails[0].address}
                           className="form-control"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Phone</ControlLabel>
                    <input type="phone" name="phone" defaultValue={user.profile.phone}
                           className="form-control"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Current Password</ControlLabel>
                    <input type="password" name="currentPassword" className="form-control"/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>New Password</ControlLabel>
                    <input type="password" name="newPassword" className="form-control"/>
                </FormGroup>
                <Button type="submit" bsStyle="primary">Save Profile</Button>
            </div>
        ) : <div/>;
    };

    renderProfileForm(loading, user) {
        return !loading ? ({
            password: this.renderPasswordUser,
            //Insert OAuth Here
        }[this.getUserType(user)])(loading, user) : <div/>;
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

    render() {
        const {loading, user} = this.props;

        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete your Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This will <strong>permanently</strong> delete your account. Are you sure you want to do this?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button onClick={this.handleDeleteAccount} bsStyle="danger">Delete Account</Button>
                    </Modal.Footer>
                </Modal>
                <div className="ProfileHeader">
                    <h3>Edit Profile</h3>
                    <GenericFooter>
                        <Button bsStyle="danger" onClick={this.handleShow} id="ProfileButton">Delete My Account</Button>
                    </GenericFooter>
                </div>
                <hr/>
                <form ref={form => (this.form = form)}
                      onSubmit={event => event.preventDefault()}>{this.renderProfileForm(loading, user)}</form>
            </div>
        );
    }
}

Profile.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('users.all');
    const teamsList = TeamsCollection.find().fetch();

    return {
        loading: !subscription.ready(),
        user: Meteor.user(),
    };
})(Profile);
