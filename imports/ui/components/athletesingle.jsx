// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';

// Custom File Imports

/*The athletesingle component can be found and is linked with the masterReport page at location
 * imports/ui/pages/masterReport.jsx */
export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    /*A link to the window: /app/weightEntry */
    routeToWE () {
        window.location ='/app/weightEntry';
    }

    /**/
    render() {
        athlete = this.props.athlete;
        let hydrate = "";
        /* If the athlete's pre-weight data (preWeightData) at index zero is undefined -- OR --
         * If the athelete's post-weight data (postWeightData) at index zero is undefined
         * Then the hydrate variable would be set to null. */
        if( athlete.preWeightData[0] === undefined || athlete.postWeightData[0] === undefined ) {
            hydrate = null;
        }
        /* If the date of the update of the athlete's pre-weight data (preWeightData) at index zero
         * is EQUAL TO the date of the update of the athlete's post-weight data (postWeightData) at
         * index zero is undefined the calculation will take place and will be simplified to
         * and resolved into decimal format and will provide four decimal points. */
        else if( athlete.preWeightData[0].date === athlete.postWeightData[0].date ){
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) *100;
            hydrate = Number.parseFloat(hydrate).toPrecision(4);
        }
        /*In any other scenario, as a safety protocol the hydrate variable will be set to null */
        else{
            hydrate = null;
        }
        console.log(hydrate);
        /*If the hydrate variable is null, the statement 'No Data' will be printed.*/
        if ( hydrate == null ) {
            hydrate = 'No Data';
        }

        let preWeightDate = null;
        let postWeightDate = null;
        let currentWeight = null;
        /* If the athlete's preWeightData at index zero is not undefined,
        *  then the preWeightData would be set to the date of the athlete's
        *  preWeightData at index zero and the preWeightData will be formatted
        *  into decimal format and given four precision points.*/
        if( athlete.preWeightData[0] !== undefined ) {
               preWeightDate = athlete.preWeightData[0].date;
               preWeightDate = Number.parseFloat(preWeightDate).toPrecision(4);
        }
        /* If the athlete's postWeightData at index zero is not undefined,
        *  then the postWeightData would be set to the date of the athlete's
        *  postWeightData at index zero and the postWeightData will be formatted
        *  into decimal format and given four precision points.*/
        if ( athlete.postWeightData[0] !== undefined ) {
            postWeightDate = athlete.postWeightData[0].date;
            postWeightDate = Number.parseFloat(postWeightDate).toPrecision(4);
        }
        /* If the athlete's postWeightDate at index zero is not equal to null -- AND --
         * If the athlete's preWeightDate at index zero is not equal to null
         * then the currentWeight would be set to the weight of the athlete's
         * postWeightData at index zero. The athlete's current weight will then be
         * formatted into decimal format and given four precision points.*/
        if( postWeightDate !== null && preWeightDate !== null ) {
            currentWeight = athlete.postWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
        }
        /* If the postWeightDate is not equal to null,
         * then the currentWeight would be set to the weight of the postWeightData
         * at index zero. The athlete's current weight will then be
         * formatted into decimal format and given four precision points.*/
        else if( postWeightDate !== null ) {
            currentWeight =  athlete.postWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
        }
        /* If the preWeightDate is not equal to null,
         * then the currentWeight would be set to the weight of the preWeightData
         * at index zero. The athlete's current weight will then be
         * formatted into decimal format and given four precision points.*/
        else if( preWeightDate !== null ) {
            currentWeight =  athlete.preWeightData[0].weight;
            currentWeight = Number.parseFloat(currentWeight).toPrecision(4);
        }
        /* As a safety precaution, in any other situation, the currentWeight would
         * set as the athlete's baseWeight */
        else
        {
            currentWeight = athlete.baseWeight;
        }

        /* What is returned is a tuple containing a link to the athlete's profile as
         * the athlete's name, the hydrate variable of the athlete, the current weight
         * of the athlete, the athlete's base weight, and the athlete's height.*/
        return (
            <tr>
                <td><Link to={"/app/athlete/" + this.props.athlete._id}>{this.props.athlete.name}</Link></td>
                <td>{hydrate}</td>
                <td>{currentWeight}</td>
                <td>{Number.parseFloat(this.props.athlete.baseWeight).toPrecision(4)}</td>
            </tr>
        )
    }
}
