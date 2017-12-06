import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

export default class AthleteEntryList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td><Form inline><FormGroup><FormControl placeholder={'999'}>{/*Null Comment*/}</FormControl></FormGroup></Form></td>
            </tr>
        )
    }
}
