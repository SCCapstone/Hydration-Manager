import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {Athletes} from '../../api/athletes.jsx';
import {Teams} from '../../api/teams.jsx';
import { Link } from 'react-router-dom';
import AthleteReportTable from './athleteReportTable';

export default class AthleteReport extends Component {
    constructor(props) {
        super(props);
        this.deleteAthlete = this.deleteAthlete.bind(this);
        this.athlete = this.athlete.bind(this);
    }

    deleteAthlete() {
        Meteor.call('deleteAthlete',this.props.athlete._id);
    }

    athlete() {
        if(this.props.match.params.athleteId) {
            athleteId = this.props.match.params.athleteId;
            athlete = Athletes.findOne({"_id": athleteId});
            return athlete;
        }
        else{
            return "";
        }
    }

    team() {
        playerTeamId = this.athlete().teamId;
        team = Teams.findOne({"_id": playerTeamId});
        return team;
    }

    render() {
        athlete = this.athlete;
        team = this.team;
        return (
            <div>
                <Link to = {"/app/masterReport/" + this.team()._id}><Button bsStyle="primary">&lt; Back to {this.team().name} {this.team().season}</Button></Link>
                <h3>Athlete Report</h3>
                {/*TODO: Create component for the basic info*/}
                <h4>{this.athlete().name}</h4>
                <h4>{this.team().name} {this.team().season}</h4>
                <h4>{this.athlete().height}</h4>
                <h4>{this.athlete().baseWeight}</h4>
                {/*TODO: Create component for the visualization of data*/}
                <AthleteReportTable athlete={this.athlete()}/>
            </div>
        )
    }
}
