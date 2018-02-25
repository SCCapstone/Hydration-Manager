import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {AthletesOld} from '../../api/athletes.jsx';
import { Link } from 'react-router-dom';

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

    athletes() {
        return AthletesOld.find().fetch();
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
                {/*TODO: The way this is stuctured, data MUST be entered sequentially*/}
                <td>
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
            </tr>
        )
    }
}
