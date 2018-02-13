import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';

export default class DropdownOfTeams extends Component {

constructor(props) {
    super(props);
}
  render() {
    return (
        <div>
            <MenuItem>{this.props.team.name} {this.props.team.season}</MenuItem>
        </div>
    )
  }
}
