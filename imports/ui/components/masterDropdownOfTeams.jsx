// Package Imports
import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class MasterDropdownOfTeams extends Component {

constructor(props) {
    super(props);
    //autoBind(this);
}

// handleTeamChange(teamSelected) {
//   console.log(teamSelected);
//   this.props.setCurTeamToDisplay(teamSelected);
//   // --> onSelect={ () => this.handleTeamChange(this.props.team.name) }
// }
    /*Renders link to masterReport for each individual team*/
    render() {
        return (
            <MenuItem>
                <Link
                    to={{pathname: "/app/masterReport/" + this.props.team._id}}>{this.props.team.name} {this.props.team.season}</Link>
            </MenuItem>
        )
    }
}

// MasterDropdownOfTeams.propTypes = {
//     setCurTeamToDisplay: PropTypes.func,
// };

export default MasterDropdownOfTeams;
