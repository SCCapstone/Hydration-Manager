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
        <Row>
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header">Registration</h4>
            <Row>
              <Col xs={12}>
                {/*<OAuthLoginButtons
                  services={['facebook', 'github', 'google']}
                  emailMessage={{
                    offset: 97,
                    text: 'Sign Up with an Email Address',
                  }}
                />
                */}
              </Col>
            </Row>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                />
                <TextComp>Minimum of six characters.</TextComp>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <input
                  type="password"
                  name="password_conform"
                  className="form-control"
                />
                <TextComp>Minimum of six characters.</TextComp>
              </FormGroup>
              <FormGroup>
                <Button type="submit">Sign Up</Button>
                <Button onClick={this.routeToLogin}>Back</Button>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
    </div>
    );
  }
}

Registration.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Registration);

/*
<Row>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              </Row>

 */
