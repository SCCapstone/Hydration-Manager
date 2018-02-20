import React, {Component} from 'react';
import {Athletes} from '../../api/athletes.jsx';
import { Link } from 'react-router-dom';

export default class AthleteAlert extends Component {
    constructor(props) {
        super(props);
    }
    athletes() {
        return Athletes.find().fetch();
    }
    render() {
        athletes = this.athletes;
        return (
            <tr>
                <Link to={"/app/athlete/" + this.props.athlete._id}>
                <td>{this.props.athlete.name}</td>
                </Link>
                <td>{this.props.athlete.baseWeight}</td>
            </tr>
        )
    }
}
