import React, {Component} from 'react';
import Input from 'muicss/lib/react/input';
import {debounce} from 'throttle-debounce';

export default class AthleteEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ' ',
            weight: ' '
        };
        this.handleDebounce = debounce(500, this.handleDebounce);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    handleDebounce = (e) => {
        e.persist();
        console.log('You have selected:', this.props.selOp);
        console.log('The weight stored is:', e.target.value);
        console.log('The athlete you selected is', this.props.athlete.name);
        if (this.props.selOp === 'PreWeight') {
            Meteor.call('addPreWeight', this.props.athlete._id, this.props.dat, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            })
        }
        if (this.props.selOp === 'PostWeight') {
            Meteor.call('addPostWeight', this.props.athlete._id, this.props.dat, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            })
        }
        else {
            console.log('Nope');
        }
    };

    handleWeightChange = (e) => {
        e.persist();
        this.setState({weight: e.target.value});
        this.handleDebounce(e);
    };
    render() {
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td><form>
                    <Input id='weight' value={this.state.weight} onChange={this.handleWeightChange}/>
                </form></td>
            </tr>
        )
    }
}
