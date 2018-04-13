// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import {LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {withRouter } from 'react-router-dom';

/* Presents the navigation sidebar with links to the Weight Entry, the Master Report,
 * the Your Teams, and link to the Alerts Page. There is also a dropdown link to
 * the Admin and a logout button. */
const Navigation = props => (
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Hydration Manager
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={"/app/weightEntry"}>
              <NavItem eventKey={1} href="/app/weightEntry">Weight Entry</NavItem>
            </LinkContainer>
            <LinkContainer to={"/app/masterReport"}>
              <NavItem eventKey={2} href="/app/masterReport">Master Report</NavItem>
            </LinkContainer>
            <LinkContainer to={"/app/yourTeams"}>
              <NavItem eventKey={3} href="/app/yourTeams">Your Teams</NavItem>
            </LinkContainer>
            <LinkContainer to={"/app/alerts"}>
              <NavItem eventKey={4} href="/app/alerts">Alerts</NavItem>
            </LinkContainer>
          </Nav>

          <Nav pullRight>
            <NavDropdown eventKey={5} title={props.name} id="user-dropdown">
                {props.userRoles[0] === "ADMIN" ?
                    <LinkContainer to={"/app/adminDash"}>
                      <NavItem eventKey={5.1} href="/app/adminDash">Admin</NavItem>
                    </LinkContainer> : ''}
              <MenuItem eventKey={5.2} onClick={() => Meteor.logout()}>Logout</MenuItem>
            </NavDropdown>
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
