// Package Imports
import React, {Component} from 'react';
import {debounce} from 'throttle-debounce';

export default class AthleteEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            weight: ''
        };
        {/*TODO: add onKeyPress enter key(13 */}
        this.handleDebounce = debounce(1000, this.handleDebounce);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

// Handler Functions
    /*handleDebounce function provides checks and alerts*/
    handleDebounce = (e) => {
        e.persist();
        //console.log('You have selected:', this.props.selOp);
        //console.log('The weight stored is:', e.target.value);
        //console.log('The athlete you selected is', this.props.athlete.name);
        if (this.props.dat === '') {
            Bert.alert('Please ensure you have selected a Date', 'danger', 'fixed-top', 'fa-check');
        }
        else if (this.props.selOp === 'Default') {
            Bert.alert('Please ensure you have selected Pre or Post Weight', 'danger', 'fixed-top', 'fa-check');
        }
        else if (this.props.selOp === 'PreWeight') {
            Meteor.call('athletes.addPreWeight', this.props.athlete._id, this.props.dat, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            })
        }
        else if (this.props.selOp === 'PostWeight') {
            Meteor.call('athletes.addPostWeight', this.props.athlete._id, this.props.dat, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            })
        }
    };
    /*handleWeightChange Function will set weight to e.target.value*/
    handleWeightChange = (e) => {
        e.persist();
        this.setState({weight: e.target.value});
        this.handleDebounce(e);
    };
    /*When Enter/Return button is press, it will run event.preventDefault function*/
    onKeyPress(event) {
        if(event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    };
/*Render weights and allows changes*/
    render() {
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td>
                    <form>
                        <input className='weightEnterInput' type="number" onChange={this.handleWeightChange} onKeyPress={this.onKeyPress}/>
                    </form>
                </td>
            </tr>
        )
    }
}
