// Package Imports
import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';

class ReportDropdownOfTeams extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <MenuItem>{this.props.team.name} {this.props.team.season}</MenuItem>
        )
    }
}


export default ReportDropdownOfTeams;
