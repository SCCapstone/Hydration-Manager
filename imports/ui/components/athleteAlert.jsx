// Package Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Custom File Imports
import { AthletesOld } from '../../api/athletes.jsx';

export default class AthleteAlert extends Component {
    constructor(props) {
        super(props);
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
            </tr>
        )
    }
}
