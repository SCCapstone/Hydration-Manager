// Package Imports
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Custom File & Collections Imports

export default class LongTermAthleteAlert extends Component {
    constructor(props) {
        super(props);
    };

    /*getTeam function returns teams name and season*/
    getTeam() {
        for (let i = 0; i < this.props.teamsList.length; i++) {
            if (this.props.teamsList[i]._id === this.props.athlete.teamId) {
                return this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
            }
        }
    };

    /*Renders alert data -- Provides checks and does math using if else statements*/
    render() {
        let athlete = this.props.athlete;
        let hydrate = '';
        let currentWeight = '';
        if (athlete.preWeightData[0] === undefined && athlete.postWeightData[0] === undefined) {
            hydrate = null;
        }
        else {
            if (athlete.postWeightData[0].weight !== undefined) {
                currentWeight = athlete.postWeightData[0].weight;
                currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
            }
            else if (athlete.preWeightData[0].weight !== undefined) {
                currentWeight = athlete.preWeightData[0].weight;
                currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
            }
            hydrate = ((athlete.baseWeight - currentWeight) / athlete.baseWeight) * 100;
            hydrate = Number.parseFloat(hydrate).toPrecision(4);
            if (hydrate > 0) { // A positive hydration level actually represents a negative weight change.
                hydrate = "-" + hydrate;
            }
            if (hydrate < 0) { // Negative hydration represents a weight gain.
                hydrate = -hydrate;
            }
        }

        return (
            <tr>
                <td><Link to={"/app/athlete/" + this.props.athlete._id}>{this.props.athlete.name}</Link></td>
                <td>{this.getTeam()}</td>
                <td>{hydrate}</td>
                <td>{currentWeight}</td>
            </tr>
        )
    }
}
