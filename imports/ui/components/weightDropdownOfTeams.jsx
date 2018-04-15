// Package Imports
import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'


/*The WeightDropdownOfTeams component can be found and is linked with the weightEntry page at location
 * imports/ui/pages/weightEntry.jsx*/
export default class WeightDropdownOfTeams extends Component {
    constructor(props) {
        super(props);
    };

    /*Renders link to weight entry page for each individual team*/
    render() {
        return (
            <MenuItem>
                <Link
                    to={{pathname: "/app/weightEntry/" + this.props.team._id}}>{this.props.team.name} {this.props.team.season}</Link>
            </MenuItem>
        )
    }
}
