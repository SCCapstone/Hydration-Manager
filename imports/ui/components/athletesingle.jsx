// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';

// Custom File Imports


export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    routeToWE () {
        window.location ='/app/weightEntry';
    }

    render() {
        athlete = this.props.athlete;
        var hydrate = "";
        if(athlete.preWeightData[0] === undefined || athlete.postWeightData[0] === undefined)
        {
            hydrate = null;
        }
        else if(athlete.preWeightData[0].date === athlete.postWeightData[0].date){
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) *100;
            hydrate = Number.parseFloat(hydrate).toPrecision(6);
        }
        else{
            hydrate = null;
        }
        console.log(hydrate);
        if (hydrate == null)
        {
            hydrate = 'No Data';
        }

        var preWeightDate = null;
        var postWeightDate = null;
        var currentWeight = null;
        if(athlete.preWeightData[0] !== undefined)
        {
               preWeightDate = athlete.preWeightData[0].date;
               preWeightDate = Number.parseFloat(preWeightDate).toPrecision(6);
        }
        if (athlete.postWeightData[0] !== undefined) {
            postWeightDate = athlete.postWeightData[0].date;
            postWeightDate = Number.parseFloat(postWeightDate).toPrecision(6);
        }
        if(postWeightDate !== null && preWeightDate !== null)
        {
            currentWeight = athlete.postWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(6);

        }
        else if(postWeightDate !== null)
        {
            currentWeight =  athlete.postWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(6);
        }
        else if(preWeightDate !== null)
        {
            currentWeight =  athlete.preWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(6);
        }
        else
        {
            currentWeight = athlete.baseWeight;
        }
        return (
            <tr>
                <td><Link to={"/app/athlete/" + this.props.athlete._id}>{this.props.athlete.name}</Link></td>
                <td>{hydrate}</td>
                <td>{currentWeight}</td>
                <td>{this.props.athlete.baseWeight}</td>
                <td>{this.props.athlete.height}</td>
            </tr>
        )
    }
}
