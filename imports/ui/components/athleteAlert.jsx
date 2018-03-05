// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Custom File Imports

export default class AthleteAlert extends Component {
    constructor(props) {
        super(props);
    }
    // athletes() {
    //     return AthletesOld.find().fetch();
    // }

    getTeam() {
        for(i=0;i<this.props.teamsList.length;i++)
        {
            if(this.props.teamsList[i]._id === this.props.athlete.teamId)
            {
                return this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
            }
        }
    }

    render() {

        athlete = this.props.athlete;
        var hydrate = 0;
        if(athlete.preWeightData[0] === undefined || athlete.postWeightData[0] === undefined)
        {
            hydrate == null;
        }
        else {
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) *100;
            hydrate = Number.parseFloat(hydrate).toPrecision(6)
        }
        console.log(hydrate);
        if (hydrate == null || hydrate === undefined)
        {
            hydrate = null;
        }
        return (
            <tr>
                <td><Link to={"/app/athlete/" + this.props.athlete._id}>{this.props.athlete.name}</Link></td>
                <td>{this.getTeam()}</td>
                <td>{hydrate}</td>
            </tr>
        )
    }
}
