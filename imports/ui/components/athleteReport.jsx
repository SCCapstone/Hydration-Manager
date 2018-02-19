import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {Athletes} from '../../api/athletes.jsx';
import { Link } from 'react-router-dom';

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
    render() {
        athlete = this.athlete;
        return (
            <div>
                <h3>Athlete Report</h3>
                {/*TODO: Create component for the basic info*/}
                <h4>{this.athlete().name}</h4>
                <h4>{this.athlete().teamId}</h4>
                <h4>{this.athlete().height}</h4>
                <h4>{this.athlete().baseWeight}</h4>
                {/*TODO: Create component for the visualization of data*/}
            </div>
        )
    }
}
