// Package Imports
import React, { Component } from 'react';
import {MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class AlertDropdownOfTeams extends Component {

constructor(props) {
    super(props);
}
/*Renders hyperlink for team name and season*/
  render() {
    return (
        <div>
            <MenuItem>
                <Link to ={{pathname: "/app/alerts/" + this.props.team._id}}>
                    {this.props.team.name} {this.props.team.season}
                </Link>
            </MenuItem>
        </div>
    )
  }
}
