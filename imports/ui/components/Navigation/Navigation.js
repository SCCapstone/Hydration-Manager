import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ROLES from '../../../api/Users/roles.js'

//import './Navigation.scss';


// show AdminDash??
// Note: Roles.userIsInRole(Meteor.user(), ROLES.ADMIN) - for assignment of users to roles
// ES2016- Array.prototype.includes() - props.userRoles.includes(ROLES.ADMIN
// {props.userRoles[0] === null ? <....> : ''

// Logout User - redirect user to Login ???
// () => history.push('/login')

// {/*LinkContainer: makes next comp. behave as React-Router <Link>*/}

// <Link to="">Hydration Manager</Link>  //Link to nowhere for Navbar typical styling

// ({ name, history })
const Navigation = props => (
  <div>
  <Navbar className="NavClass">
    <Navbar.Header>
      <Navbar.Brand>
        Hydration Manager
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>

      <Nav>

        <LinkContainer to={"/app"}>
          <NavItem eventKey={1} href="/app">Home</NavItem>
        </LinkContainer>
        <LinkContainer to={"/app/weightEntry"}>
          <NavItem eventKey={2} href="/app/weightEntry">Weight Entry</NavItem>
        </LinkContainer>
        <LinkContainer to={"/app/masterReport"}>
          <NavItem eventKey={3} href="/app/masterReport">Master Report</NavItem>
        </LinkContainer>
        <LinkContainer to={"/app/yourTeams"}>
          <NavItem eventKey={4} href="/app/yourTeams">Your Teams</NavItem>
        </LinkContainer>
        <LinkContainer to={"/app/alerts"}>
          <NavItem eventKey={5} href="/app/alerts">Alerts</NavItem>
        </LinkContainer>
      </Nav>

      <Nav pullRight>
        <NavDropdown eventKey={6} title={props.name} id="user-dropdown">
          <LinkContainer to="/profile">
            <NavItem eventKey={6.1} href="/profile">Profile</NavItem>
          </LinkContainer>

          {props.userRoles[0] === "ADMIN" ?
            <LinkContainer to="/app/adminDash">
              <NavItem eventKey={6.2} href="/app/AdminDash">Admin</NavItem>
            </LinkContainer> : ''}

          <MenuItem divider />
          <MenuItem eventKey={6.3} onClick={() => Meteor.logout() }>Logout</MenuItem>
        </NavDropdown>
        <NavItem>
          role: {props.userRoles[0]}
        </NavItem>
      </Nav>

    </Navbar.Collapse>
  </Navbar>
  </div>
);

Navigation.defaultProps = {
  name: '',
};

Navigation.propTypes = {
  userRoles: PropTypes.array.isRequired,
  //isAuthorized: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,  // from withRouter()
};

export default withRouter(Navigation);
