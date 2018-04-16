// Package Imports
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
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

    /*   routeToWE () {
            window.location ='/app/weightEntry';
        };
    */
    //Formatting for date
    getDateFormat(Date1) {
        let now = new Date(Date1);
        let month = (now.getMonth() + 1);
        let day = now.getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        let today = now.getFullYear() + '-' + month + '-' + day;
        if(now.getHours()===1) {
            return today+'-session one';
        }
        else if(now.getHours()===2){
            return today+'-session two';
        }
        else if(now.getHours()===3){
            return today+'-session three';
        }
        else{
            return today+'-noSessionData';
        }
    };


    render() {
        let athlete = this.props.athlete;
        let hydrate = "No Data";
        let PreWeight = "No Data";
        let PostWeight = "No Data";
        let Date1 = new Date();
        let preWeightDate = "No Data";
        let postWeightDate = "No Data";
        //Get athletes hydration
        if ((athlete.preWeightData[0] !== undefined && athlete.postWeightData[0] !== undefined) && (athlete.preWeightData[0].date === athlete.postWeightData[0].date)) {
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) * 100;
            hydrate = Number.parseFloat(hydrate).toPrecision(4);
        }
        //Get the athlete's pre and post weight data
        if (athlete.preWeightData[0] !== undefined && athlete.preWeightData[0].weight !== undefined && athlete.preWeightData[0].date !== undefined) {
            preWeightDate = athlete.preWeightData[0].date;
            PreWeight = Number.parseFloat(athlete.preWeightData[0].weight).toPrecision(4);
        }
        if (athlete.postWeightData[0] !== undefined && athlete.postWeightData[0].weight !== undefined && athlete.postWeightData[0].date !== undefined) {
            postWeightDate = athlete.postWeightData[0].date;
            PostWeight = Number.parseFloat(athlete.postWeightData[0].weight).toPrecision(4);
        }
        //If the athlete has a pre and a post weight all is good
        if (preWeightDate === postWeightDate) {
            Date1 = postWeightDate;
        }
        //if the athlete was recently created and has only a singular pre or a post
        else if (preWeightDate !== null && postWeightDate === "No Data") {
            Date1 = preWeightDate;
            PostWeight = "No Data"
        }
        else if (postWeightDate !== null && preWeightDate === "No Data") {
            Date1 = postWeightDate;
            PreWeight = "No Data"
        }
        //if the athlete has records but has missed a pre or post weight
        else if (preWeightDate !== "No Data" && postWeightDate !== "No Data" && preWeightDate > postWeightDate) {
            Date1 = preWeightDate;
            PostWeight = "No Data"
        }
        else if (preWeightDate !== "No Data" && postWeightDate !== "No Data" && preWeightDate < postWeightDate) {
            Date1 = postWeightDate;
            PreWeight = "No Data"
        }
        return (
            <tr>
                <td><Link to={"/app/athlete/" + this.props.athlete._id}>{this.props.athlete.name}</Link></td>
                <td>{hydrate}</td>
                <td>{PostWeight}</td>
                <td>{PreWeight}</td>
                <td>{this.getDateFormat(Date1)}</td>
                <td>{Number.parseFloat(this.props.athlete.baseWeight).toPrecision(4)}</td>
            </tr>
        )
    }
}
