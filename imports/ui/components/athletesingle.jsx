import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

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

    parseJSON (weightData) {
        Object.keys(weightData).map(function(key){
          return (<td>Key: {key}, Value: {weightData[key]}</td>)
        })
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

                <td>
                    {this.props.athlete.preWeightData.map((e,i)=>
                        <p>{e.date} PostWeight:{e.weight}</p>
                    )}
                </td>
                <td>
                    {this.props.athlete.postWeightData.map((e,i)=>
                        <p>{e.date} PostWeight:{e.weight}</p>
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
