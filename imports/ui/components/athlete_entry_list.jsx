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

    handleDebounce = (e) => {
        e.persist();
        console.log('You have selected:', this.props.selOp);
        console.log('The weight stored is:', e.target.value);
        console.log('The athlete you selected is', this.props.athlete.name);
        if (this.props.dat === '')
        {
            alert('Please ensure you have selected a Date');
        }
        else if (this.props.selOp === 'Default') {
            alert('Please ensure you have selected Pre or Post Weight');
        }
        else if (this.props.selOp === 'PreWeight') {
            Meteor.call('addPreWeight', this.props.athlete._id, this.props.dat, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            })
        }
        else if (this.props.selOp === 'PostWeight') {
            Meteor.call('addPostWeight', this.props.athlete._id, this.props.dat, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            })
        }
    };
    handleWeightChange = (e) => {
        e.persist();
        this.setState({weight: e.target.value});
        this.handleDebounce(e);
    };

    onKeyPress(event) {
        if(event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td>
                    <form>
                        <input id='weight' type="number" value={this.state.weight} onChange={this.handleWeightChange} onKeyPress={this.onKeyPress}/>
                    </form>
                </td>
            </tr>
        )
    }
}
