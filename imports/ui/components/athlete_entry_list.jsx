import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Input from 'muicss/lib/react/input';
import {debounce} from 'throttle-debounce';

export default class AthleteEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ' ',
            PreWeight: ' ',
            PostWeight: ' ',
            weight: ' '
        };
        this.handleDebounce = debounce(500, this.handleDebounce);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    handleDebounce = (e) => {
        e.persist();
        if (this.props.selOp === 'PreWeight') {
            this.setState({PreWeight: e.target.value});
        }
        else {
            this.setState({PostWeight: e.target.value});
            this.setState({weight: e.target.value});
        }
        console.log('You have selected:', this.props.selOp);
        console.log('The weight stored is:', e.target.value);
        console.log('The athlete you selected is', this.props.athlete.name);
        Meteor.call('addWeight', this.props.athlete._id, this.props.dat, this.props.selOp, this.state.weight, (err, data) => {
            Bert.defaults = {hideDelay: 4500}
            Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
        })
    }

    handleWeightChange = (e) => {
        e.persist();
        this.setState({weight: e.target.value});
        this.handleDebounce(e);
    }
    render() {
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td><form>
                    <Input id='weight' value={this.state.weight} onChange={this.handleWeightChange.bind(this)}/>
                </form></td>
            </tr>
        )
    }
}
