import React, {Component} from 'react'

export default class AthleteSingle extends Component {
    constructor(props) {
        super(props);
        this.routeToWE = this.routeToWE.bind(this);
    }
    routeToWE () {
        window.location ='/app/weightEntry';
    }
    deleteAthlete() {
      Meteor.call('deleteAthlete',this.props.athlete._id);
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td onClick={this.routeToWE.bind(this)}>{this.props.athlete.name}</td>
                    <td onClick={this.routeToWE.bind(this)}>{this.props.athlete.baseWeight}</td>
                    <td onClick={this.routeToWE.bind(this)}>{this.props.athlete.height}</td>
                    <td onClick={this.deleteAthlete.bind(this)}> <button>X</button> </td>
                </tr>
            </tbody>
        )
    }
}
