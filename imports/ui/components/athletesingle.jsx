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

    calculateHydration() {
        if (this.athletes.preWeightData[0] && this.athletes.postWeightData[0])
        {
            const hydrate = ((this.athletes.preWeightData[0].date - this.athletes.postWeightData[0].date) / this.athletes.preWeightData[0].date) *100;
            console.log(hydrate.toString);
            return (hydrate.toString);
        }
        else
        {
            const hydrate1 = ((this.athletes.preWeightData[1].date - this.athletes.postWeightData[1].date) / this.athletes.preWeightData[1].date) *100;
            console.log(hydrate1.toString);
            return (hydrate1.toString);
        }
    }
    render() {
        athletes = this.athletes;
        return (
            <tr>
                <Link to={"/app/athlete/" + this.props.athlete._id}>
                <td>{this.props.athlete.name}</td>
                </Link>
                <td>{this.props.athlete.baseWeight}</td>
                <td>{this.props.athlete.height}</td>
                <td>{/*this.calculateHydration*/}</td>
                {/*TODO: The way this is stuctured, data MUST be entered sequentially*/}
            </tr>
        )
    }
}
