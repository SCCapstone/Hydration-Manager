// Package Imports
import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';
import {Meteor} from "meteor/meteor";
import autoBind from "react-autobind";

class AthleteReportDropdownOfTeams extends Component {
    constructor(props) {
        super(props);
        console.log("props" + props);
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
        console.log("We're running handleView");
        let currentUser = Meteor.user();
        let currentUserRole = Meteor.user().roles[0];
        let teamId = this.props.team._id;
        console.log("currentUser " + currentUser);
        console.log("currentUserRole " + currentUserRole);
        console.log("teamID " + teamId);
        let check = false;
        if (currentUser !== null) {
            for (let i = 0; i < currentUser.profile.teamAccess.length; i++) {
                if (teamId === currentUser.profile.teamAccess[i]) {
                    check = true;
                    console.log(currentUser.profile.teamAccess[i]);
                }
            }
            if (currentUserRole === "ADMIN") {
                check = true;
            }
        }
        else {
            check = false;
        }
        console.log(check);
        return check;
    };

    /*Renders link to masterReport for each individual team*/
    render() {
        return (
            <div>
                {this.handleView() ?
                    <option><p>{this.props.team.name} {this.props.team.season}</p></option>
                    : []}
            </div>
        )
    }
}

export default AthleteReportDropdownOfTeams;
