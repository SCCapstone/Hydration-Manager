import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'
export default class AlertDropdownOfTeams extends Component {

constructor(props) {
    super(props);
}
  render() {
    return (
        <div>
            <MenuItem><Link to ={{pathname: "/app/alerts/" + this.props.team._id}}>{this.props.team.name} {this.props.team.season}</Link></MenuItem>
        </div>
    )
  }
}
