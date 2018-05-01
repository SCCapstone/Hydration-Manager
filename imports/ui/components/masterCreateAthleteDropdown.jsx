// Package Imports
import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {Meteor} from "meteor/meteor";
import autoBind from "react-autobind";

class MasterCreateAthleteDropdown extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        autoBind(this);
    };

    athlete() {
        /* If this.props.athleteId, athleteId is set to this.props.athleteId.*/
        if (this.props.athleteId) {
            let athleteId = this.props.athleteId;
            let currentAthlete = '';
            /* Finally the athletesLists is iterated through. While iterating through,
               the athleteList id attributes are checked to see if they are equal to
               the athleteId attribute.*/
            for (let i = 0; i < this.props.athletesList.length; i++) {
                /* Finally, if this check passes as true, the currentAthlete
                is now set as the list of athletes that have passed the check.*/
                if (this.props.athletesList[i]._id === athleteId) {
                    currentAthlete = (this.props.athletesList[i]);
                }
            }
            //Finally the currentAthlete is returned
            return currentAthlete;
        }
        //In any other situation and empty string is returned.
        else {
            return "";
        }
    };

    handleView() {
        let currentUser = Meteor.user();
        let currentUserRole = Meteor.user().roles[0];
        //console.log(currentUser);
        if (currentUser !== null) {
            let check = false;
            for (let i = 0; i < currentUser.profile.teamAccess.length; i++) {
                if (this.props.team._id === currentUser.profile.teamAccess[i]) {
                    //console.log(this.props.team._id === currentUser.profile.teamAccess[i]);
                    check = true;
                }
            }
            if (currentUserRole === "ADMIN") {
                check = true;
            }
            return check;
        }
        else return false;
    };

    /*Renders link to masterReport for each individual team*/
    render() {
        return (
            <MenuItem>
                {this.handleView() ? this.props.team.name + this.props.team.season : null}
            </MenuItem>
        )
    }
}

export default MasterCreateAthleteDropdown;
