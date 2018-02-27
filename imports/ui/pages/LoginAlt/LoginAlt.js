// Package Imports
import { Meteor } from 'meteor/meteor';
import React from 'react';
import autoBind from 'react-autobind';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import $ from 'jquery';
import 'jquery-validation';

// Custom File Import
import GenericFooter from '../../components/GenericFooter/GenericFooter';

class LoginAlt extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    $(component.form).validate( {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Enter email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Enter password here.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
  }

    routeToRegistration () {
        window.location = '/registration';
    }

  render() {
    return (
      <div class="LoginBackGround">
          <div class = "Login">
              <h1>Hydration Manager</h1>
              <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                  <FormGroup>
                      <ControlLabel>Email Address</ControlLabel>
                      <input type="email" name="emailAddress" className="form-control"/>
                  </FormGroup>
                  <FormGroup>
                      <ControlLabel className="clearfix">
                          <span className="pull-left">Password</span>
                      </ControlLabel>
                      <input type="password" name="password" className="form-control"/>
                  </FormGroup>
                  <FormGroup>
                      <div class = "LoginButtons">
                          <Button type="submit">Login</Button>
                          <Button onClick = {this.routeToRegistration}>Register</Button>
                          <br/>
                          {/*TODO: Make forgot password do something */}
                          <Button>Forgot Password</Button>
                      </div>
                  </FormGroup>
              </form>
                  <p>A University of South Carolina Capstone Project</p>
          </div>
      </div>

    );
  }
}

export default LoginAlt;

/*
<div>
<Row>
  <Col xs={12} sm={6} md={5} lg={4}>
    <h4 className="page-header">Log In</h4>
    <Row>
      <Col xs={12}>
        {<OAuthLoginButtons
          services={['facebook', 'github', 'google']}
          emailMessage={{
            offset: 100,
            text: 'Log In with an Email Address',
          }}
        />
        }
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
        <ControlLabel className="clearfix">
          <span className="pull-left">Password</span>
          <Link className="pull-right" to="/recover-password">Forgot password?</Link>
        </ControlLabel>
        <input
          type="password"
          name="password"
          className="form-control"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">Log In</Button>
      <GenericFooter>
        <p>{'Don\'t have an account?'} <Link to="/registration">Sign Up</Link>.</p>
      </GenericFooter>
    </form>
  </Col>
</Row>
</div>
*/
