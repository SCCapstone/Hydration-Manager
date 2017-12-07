import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {Athletes} from '../../api/athletes.jsx';

export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        this.routeToWE = this.routeToWE.bind(this);
        this.deleteAthlete = this.deleteAthlete.bind(this)
    }

    routeToWE () {
        window.location ='/app/weightEntry';
    }

    parseJSON (weightData) {
        Object.keys(weightData).map(function(key){
          return (<td>Key: {key}, Value: {weightData[key]}</td>)
        })
    }

    deleteAthlete() {
      Meteor.call('deleteAthlete',this.props.athlete._id);
    }

    athletes() {
        return Athletes.find().fetch();
    }
    render() {
        athletes = this.athletes;
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td>{this.props.athlete.baseWeight}</td>
                <td>{this.props.athlete.height}</td>
                {/*TODO: The way this is stuctured, data MUST be entered sequentially*/}
                <td>
                    {this.props.athlete.preWeightData.map((e,i)=>
                        <p>{e.date}</p>
                    )}
                </td>
                <td>
                    {this.props.athlete.preWeightData.map((e,i)=>
                        <p>{e.weight}</p>
                    )}
                </td>
                <td>
                    {this.props.athlete.postWeightData.map((e,i)=>
                        <p>{e.weight}</p>
                    )}
                </td>
                {/*{this.parseJSON(this.props.athlete.weightData)}*/}
                <td>
                    <Button bsStyle="danger" onClick={this.deleteAthlete} bsSize="small" className = "mui--pull-right">
                        &times;
                    </Button>
                </td>
            </tr>
        )
    }
}
