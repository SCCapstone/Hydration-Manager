// Package Imports
import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {Meteor} from "meteor/meteor";
import autoBind from 'react-autobind';


/*The WeightDropdownOfTeams component can be found and is linked with the weightEntry page at location
 * imports/ui/pages/weightEntry.jsx*/
export default class WeightDropdownOfTeams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: '',
            teamName: '',
            teamSeason: '',
        };
        autoBind(this);
    };

    handleStates() {
        if (this.state.teamId !== this.props.team._id) {
            this.setState({teamId: this.props.team._id});
        }
        if (this.state.teamName !== this.props.team.name) {
            this.setState({teamName: this.props.team.name});
        }
        if (this.state.teamSeason !== this.props.team.season) {
            this.setState({teamSeason: this.props.team.season});
        }
    };

    handleView() {
        let currentUser = Meteor.user();
        let currentUserRole = Meteor.user().roles[0];
        if (currentUser !== null) {
            let check = false;
            for (let i = 0; i < currentUser.profile.teamAccess.length; i++) {
                if (this.props.team._id === currentUser.profile.teamAccess[i]) {
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

    /*Renders link to weight entry page for each individual team*/
    render() {
        return (
            <MenuItem>
                {this.handleView() ?
                    <Link
                        to={{pathname: "/app/weightEntry/" + this.props.team._id}}>{this.props.team.name} {this.props.team.season}</Link> : ''}
            </MenuItem>
        )
    }
}
