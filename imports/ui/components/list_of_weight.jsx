import React, {Component} from 'react';

export default class ListWeight extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <tr>
                <td>{this.props.athlete.weightData.date}</td>
                <td>{this.props.athlete.weightData.preWeight}</td>
                <td>{this.props.athlete.weightData.postWeight}</td>
            </tr>
        )
    }
}
