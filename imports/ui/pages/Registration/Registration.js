import React from 'react';
import autoBind from 'react-autobind';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
//import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import TextComp from '../../components/TextComp/TextComp';
import GenericFooter from '../../components/GenericFooter/GenericFooter';

import ROLES from '../../../api/Users/roles';

import $ from 'jquery';
import 'jquery-validation';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    $(component.form).validate( {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
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
        firstName: {
          required: 'Please enter your first name.',
        },
        lastName: {
          required: 'Please enter your last name.',
        },
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

  handleSubmit(form) {
    const { history } = this.props;

    Accounts.createUser({
      email: form.emailAddress.value,
      password: form.password.value,
      profile: {
        name: {
          first: form.firstName.value,
          last: form.lastName.value,
        },
        roles: [ROLES.VIEW],             //****** DEFAULT ROLE:  ADMIN *******
      },
    }, (error) => {
      if (error) {
          Bert.alert(error.reason, 'danger');
      } else {
        Meteor.call('users.sendVerificationEmail');
        Bert.alert('Welcome!', 'success');
        history.push('/login');  //push(path, [state]) - (function) Pushes a new entry onto the history stack
      }
    });
  }

  render() {
    return (
      <div className="Registration">
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
              <Button type="submit" bsStyle="success">Sign Up</Button>

              <GenericFooter>
                <p>Already have an account? <Link to="/login">Log In</Link>.</p>
              </GenericFooter>

            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

Registration.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Registration);
