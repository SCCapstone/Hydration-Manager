// Package Imports
import React from 'react';
import autoBind from 'react-autobind';
import { Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import $ from 'jquery';
import 'jquery-validation';

// Custom File Imports
import TextComp from '../../components/TextComp/TextComp';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    $(component.form).validate( {
      rules: {
 /*       firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
*/
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        password_confirm: {
          equalTo: '[name="password"]'
        }
      },
      messages: {
        emailAddress: {
          required: 'Please enter your email address.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Please enter a password.',
          minlength: 'Minimum of least six characters.',
        },
        password_confirm: {
          required: 'Repeat previous password.',
          minlength: 'Minimum of at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  componentWillUnmount() {
    loggingIn = Meteor.loggingIn();
    newUserId = Meteor.userId();
    if (!!newUserId) {
      //Roles.setUserRoles(newUserId,['View']);
      Meteor.call('users.addNewRole', newUserId, ['View'], (error) => {
        if (error) {
          console.log("FAILED: Role not added!!");
        } else {
          console.log(newUserId);
          console.log("SUCCESS: Role added!!");
        }
      } );
    }
  }

  handleSubmit(form) {
    const { history } = this.props;

    Accounts.createUser({
      email: form.emailAddress.value,
      password: form.password.value,
    }, (error) => {
      if (error) {
          Bert.alert(error.reason, 'danger');
      } else {
        //Roles.addUsersToRoles(newId, ['ADMIN']);
        Meteor.call('users.sendVerificationEmail');
        Bert.alert('Welcome!', 'success');
        history.push('/login');  //push(path, [state]) - (function) Pushes a new entry onto the history stack
      }
    });
    // loggingIn = Meteor.loggingIn();
    // newUserId = Meteor.userId();
    // !loggingIn ? Roles.addUsersToRoles(newUserId, ['ADMIN']) : console.log("Role not added!!");
  }

    routeToLogin () {
        window.location = '/login';
    }

    render() {
        return (
            <div className = "RegistrationBackGround">
              <div className = "Registration">
                <h1>Registration</h1>
                <br/>
                <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                  <FormGroup>
                    <input
                        type="email"
                        name="emailAddress"
                        className="form-control"
                        placeholder="Email Address"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                    />
                    <p>Minimum of six characters.</p>
                  </FormGroup>
                  <FormGroup>
                    <input
                        type="password"
                        name="password_conform"
                        className="form-control"
                        placeholder="Confirm Password"
                    />
                    <p>Minimum of six characters.</p>
                  </FormGroup>
                  <FormGroup>
                    <br/>
                    <Button id="SubmitButton"type="submit" bsStyle="primary">Sign Up</Button>
                    <Button id="BackButton" onClick={this.routeToLogin}>Back</Button>
                  </FormGroup>
                </form>
              </div>
            </div>
    );
  }
}

Registration.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Registration);

