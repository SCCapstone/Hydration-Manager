import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import ListWeight from './list_of_weight.jsx';
import {Athletes} from '../../api/athletes.jsx';

export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            str: ' '
        };
        this.routeToWE = this.routeToWE.bind(this);
        this.deleteAthlete = this.deleteAthlete.bind(this)
    }

    routeToWE () {
        window.location ='/app/weightEntry';
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

                <td>
                    {this.props.athlete.preWeightData.map((e,i)=>
                        <p>{e.date} PreWeight:{e.weight}</p>
                    )}
                </td>
                <td>
                    {this.props.athlete.postWeightData.map((e,i)=>
                        <p>{e.date} PostWeight:{e.weight}</p>
                    )}
                </td>
                <td>
                    <Button bsStyle="danger" onClick={this.deleteAthlete} bsSize="small" className = "mui--pull-right">
                        &times;
                    </Button>
                </td>
            </tr>
        )
    }
}
