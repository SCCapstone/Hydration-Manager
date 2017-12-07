import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        this.routeToWE = this.routeToWE.bind(this);
        this.deleteAthlete = this.deleteAthlete.bind(this)
    }

    routeToWE () {
        window.location ='/app/weightEntry';
    }

    deleteAthlete() {
      Meteor.call('deleteAthlete',this.props.athlete._id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td>{this.props.athlete.baseWeight}</td>
                <td>{this.props.athlete.height}</td>
                <td>{JSON.stringify(this.props.athlete.weightData)}</td>
                <td>
                    <Button bsStyle="danger" onClick={this.deleteAthlete} bsSize="small" className = "mui--pull-right">
                        &times;
                    </Button>
                </td>
            </tr>
        )
    }
}
