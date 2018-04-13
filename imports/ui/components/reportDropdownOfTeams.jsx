// Package Imports
import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';

/*The ReportDropdownOfTeams component can be found and is linked with the athleteReport page at location
 * imports/ui/pages/athleteReport.jsx */
class ReportDropdownOfTeams extends Component {
    constructor(props) {
        super(props);
    };
    /*Renders the team name and team season*/
    render() {
        return (
            <MenuItem>{this.props.team.name} {this.props.team.season}</MenuItem>
        )
    }
}
export default ReportDropdownOfTeams;
