// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Custom File & Collections Imports

export default class AthleteAlert extends Component {
    constructor(props) {
        super(props);
    }
    // athletes() {
    //     return AthletesOld.find().fetch();
    // }

    /*getTeam function returns teams name and season*/
    getTeam() {
        for(i=0;i<this.props.teamsList.length;i++)
        {
            if(this.props.teamsList[i]._id === this.props.athlete.teamId)
            {
                return this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
            }
        }
    }
    /*Renders alert data -- Provides checks and does math using if else statements*/
    render() {

        athlete = this.props.athlete;
        let hydrate = 0;
        if(athlete.preWeightData[0] === undefined || athlete.postWeightData[0] === undefined)
        {
            hydrate = null;
        }
        else {
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) *100;
            hydrate = Number.parseFloat(hydrate).toPrecision(4)
            if(hydrate > 0)
            {
                hydrate = "+" + hydrate;
            }
        }
        console.log(hydrate);
        if (hydrate == null || hydrate === undefined)
        {
            hydrate = null;
        }

        let preWeightDate = null;
        let postWeightDate = null;
        let currentWeight = null;
        /* If the athlete's preWeightData at index zero is not undefined,
        *  then the preWeightData would be set to the date of the athlete's
        *  preWeightData at index zero and the preWeightData will be formatted
        *  into decimal format and given four precision points.*/
        if(athlete.preWeightData[0] !== undefined)
        {
            preWeightDate = athlete.preWeightData[0].date;
            preWeightDate = Number.parseFloat(preWeightDate).toPrecision(4);
        }
        /* If the athlete's postWeightData at index zero is not undefined,
        *  then the postWeightData would be set to the date of the athlete's
        *  postWeightData at index zero and the postWeightData will be formatted
        *  into decimal format and given four precision points.*/
        if (athlete.postWeightData[0] !== undefined) {
            postWeightDate = athlete.postWeightData[0].date;
            postWeightDate = Number.parseFloat(postWeightDate).toPrecision(4);
        }
        /* If the athlete's postWeightDate at index zero is not equal to null -- AND --
         * If the athlete's preWeightDate at index zero is not equal to null
         * then the currentWeight would be set to the weight of the athlete's
         * postWeightData at index zero. The athlete's current weight will then be
         * formatted into decimal format and given four precision points.*/
        if(postWeightDate !== null && preWeightDate !== null)
        {
            currentWeight = athlete.postWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(4);

        }

        /* If the postWeightDate is not equal to null,
         * then the currentWeight would be set to the weight of the postWeightData
         * at index zero. The athlete's current weight will then be
         * formatted into decimal format and given four precision points.*/
        else if(postWeightDate !== null)
        {
            currentWeight =  athlete.postWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
        }

        /* If the preWeightDate is not equal to null,
         * then the currentWeight would be set to the weight of the preWeightData
         * at index zero. The athlete's current weight will then be
         * formatted into decimal format and given four precision points.*/
        else if(preWeightDate !== null)
        {
            currentWeight =  athlete.preWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
        }
        /* As a safety precaution, in any other situation, the currentWeight would
         * set as the athlete's baseWeight */
        else
        {
            currentWeight = athlete.baseWeight;
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
