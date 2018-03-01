// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Custom File Imports
import { AthletesOld } from '../../api/athletes.jsx';

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
            if(this.props.teamsList[i]._id == this.props.athlete.teamId)
            {
                return this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
            }
        }
    }

    render() {
        athlete = this.props.athlete;
        var hydrate = "";
        if(athlete.preWeightData[0] === undefined || athlete.postWeightData[0] === undefined)
        {
            hydrate == null;
        }
        else {
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) *100;
        }
        console.log(hydrate);
        if (hydrate == null || hydrate === undefined)
        {
            hydrate = 'null';
        }
        return (
            <tr>
                <Link to={"/app/athlete/" + this.props.athlete._id}>
                <td>{this.props.athlete.name}</td>
                </Link>
                <td>{this.getTeam()}</td>
                <td>{hydrate}</td>
            </tr>
        )
    }
}
