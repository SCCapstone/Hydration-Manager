// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {Button, Col, ControlLabel, FormGroup, Row} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Bert} from 'meteor/themeteorchef:bert';
import {withTracker} from 'meteor/react-meteor-data';
import $ from 'jquery';
import 'jquery-validation';

// Custom File Imports
import GenericFooter from '../components/GenericFooter';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    };

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

    handleDeleteAccount() {
        const id = this.props.userId;
        if (confirm('Are you sure? This will permanently delete your account and all of its data.')) {
            Meteor.call('users.deleteAccount', id, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert('Account deleted!', 'success');
                }
            });
        }
    };

    handleSubmit(form) {
        const id = this.props.userId;
        const email = form.emailAddress.value;
        const phone = form.phone.value;

        Meteor.call('users.editProfile', id, email, phone, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('Profile updated!', 'success');
            }
        });

        if (form.newPassword.value) {
            Accounts.changePassword(form.currentPassword.value, form.newPassword.value, (error) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    form.currentPassword.value = '';
                    form.newPassword.value = '';
                }
            });
        }
    };

    renderPasswordUser(loading, user) {
        return !loading ? (
            <div>
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
                <Button type="submit" bsStyle="success">Save Profile</Button>
            </div>
        ) : <div/>;
    };

    renderProfileForm(loading, user) {
        return !loading ? ({
            password: this.renderPasswordUser,
            //Insert OAuth Here
        }[this.getUserType(user)])(loading, user) : <div/>;
    };

    render() {
        const {loading, user} = this.props;
        return (
            <div className="Profile">
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <h4 className="page-header">Edit Profile</h4>
                        <form ref={form => (this.form = form)}
                              onSubmit={event => event.preventDefault()}>{this.renderProfileForm(loading, user)}</form>
                        <GenericFooter>
                            <Button bsStyle="danger" onClick={this.handleDeleteAccount}>Delete My Account</Button>
                        </GenericFooter>
                    </Col>
                </Row>
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

    return {
        loading: !subscription.ready(),
        user: Meteor.user(),
    };
})(Profile);
