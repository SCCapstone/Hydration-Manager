// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';

// Custom File Imports
import { AthletesOld } from '../../api/athletes.jsx';


export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
      //  this.routeToWE = this.routeToWE.bind(this);
      //  this.deleteAthlete = this.deleteAthlete.bind(this)
    }
/*   <td>
        {this.props.athlete.preWeightData.map((e,i)=>
            <p>{e.date}: {e.weight}</p>
        )}
    </td>
    <td>
        {this.props.athlete.postWeightData.map((e,i)=>
            <p>{e.date}: {e.weight}</p>
        )}
    </td>
    <td>
        <Button bsStyle="danger" onClick={this.deleteAthlete} bsSize="small">
            &times;
        </Button>
    </td>
*/
    routeToWE () {
        window.location ='/app/weightEntry';
    }

    deleteAthlete() {
      Meteor.call('athletes.remove',this.props.athlete._id);
    }



    render() {
        athlete = this.props.athlete;
        var hydrate = "";
        if(athlete.preWeightData[0] == undefined || athlete.postWeightData[0] == undefined)
        {
            hydrate == null;
        }
        else if(athlete.preWeightData[0].date == athlete.postWeightData[0].date){
            hydrate = ((athlete.preWeightData[0].weight - athlete.postWeightData[0].weight) / athlete.preWeightData[0].weight) *100;
        }
        else{
            hydrate = "Most Recent Pre/Post Weight Missing";
        }
        console.log(hydrate);
        if (hydrate == null)
        {
            hydrate = 'null';
        }

        var preWeightDate = null;
        var postWeightDate = null;
        var currentWeight = null;
        if(athlete.preWeightData[0] !== undefined)
        {
               preWeightDate = athlete.preWeightData[0].date;
        }
        if (athlete.postWeightData[0] !== undefined) {
            postWeightDate = athlete.postWeightData[0].date;
        }
        if(postWeightDate !== null && preWeightDate !== null)
        {
            currentWeight = athlete.postWeightData[0].weight;

        }
        else if(postWeightDate !== null)
        {
            currentWeight =  athlete.postWeightData[0].weight;
        }
        else if(preWeightDate !== null)
        {
            currentWeight =  athlete.preWeightData[0].weight;
        }
        else
        {
            currentWeight = 'Wheres the weight';
        }
        return (
            <tr>
                <Link to={"/app/athlete/" + this.props.athlete._id}>
                <td>{this.props.athlete.name}</td>
                </Link>
                <td>{hydrate}</td>
                <td>{currentWeight}</td>
                <td>{this.props.athlete.baseWeight}</td>
                <td>{this.props.athlete.height}</td>
            </tr>
        )
    }
}
