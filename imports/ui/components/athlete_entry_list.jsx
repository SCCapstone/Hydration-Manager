import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Input from 'muicss/lib/react/input';

export default class AthleteEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ' ',
            PreWeight: ' ',
            PostWeight: ' ',
            weight: ' '
        };
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }
    handleWeightChange = (e) => {
        e.preventDefault();
        if(this.props.selOp === 'PreWeight') {
            this.setState({PreWeight: e.target.value});
            this.setState({weight: e.target.value});
        }
        else {
            this.setState({PostWeight: e.target.value});
            this.setState({weight: e.target.value});
        }

        Meteor.call('addWeight', this.props.athlete._id, this.props.dat, this.props.selOp, this.state.weight, ()=> {
            Bert.defaults = {hideDelay: 4500}
            Bert.alert('Weight Added','success', 'fixed-top', 'fa-check');
        });
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
