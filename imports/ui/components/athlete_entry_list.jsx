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
        this.handleDebounce = debounce(1000, this.handleDebounce);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    // The purpose of this function is to generate an alert if an athlete is in the 'red' alert status
    // The only time this function should be called is if the athlete has just had a weight entered via weight entry,
    // hopefully avoiding spamming of alerts.
    handleAlerts() {
        let preData = this.props.athlete.preWeightData;
        let postData = this.props.athlete.postWeightData;
        let pre = 0;
        let post = 0;
        console.log("We're in the handleAlerts function");
        const delayInMilliseconds = 8000; // Eight second delay ; Trying to delay to give the arrays enough time to populate.
        setTimeout(function () {
            console.log("The preDatalength is "+preData.length);
            for (let i = 0; i < preData.length; i++) {
                console.log("The preData["+i+"] is "+preData[i].date +" "+preData[i].weight+" "+preData[i].session);
                console.log("The state:date data is "+this.state.date);
                if (preData[i] !== undefined) {
                    if (preData[i].date === this.state.date) {
                        pre = preData[i].weight;
                        console.log("Pre value is : " + pre);
                    }
                }
            }
            console.log("The postDatalength is "+postData.length);
            for (let i = 0; i < postData.length; i++) {
                console.log("The postData["+i+"] is "+postData[i]);
                if (postData[i] !== undefined) {
                    if (postData[i].date === this.state.date) {
                        post = postData[i].weight;
                        console.log("Post value is : " + post);
                    }
                }
            }
            let hydration = (((pre - post)) / pre) * 100;
            if (hydration <= -4 || hydration >= 4) {
                Meteor.call('athletes.generateSMS', () => {
                    console.log("We're calling the SMS alert");
                });
            }
        }, delayInMilliseconds);
    };

// Handler Functions
    /*handleDebounce function provides checks and alerts*/
    handleDebounce = (e) => {
        e.persist();
        console.log('You have selected:', this.props.selOp);
        console.log('The weight stored is:', e.target.value);
        console.log('The athlete you selected is', this.props.athlete.name);
        if (this.props.session === '1') {
            let sessionDate = this.props.dat + "T01:00:00";
            this.setState({date: sessionDate})
            console.log(this.state.date);
        }
        else if (this.props.session === '2') {
            let sessionDate = this.props.dat + "T02:00:00";
            this.setState({date: sessionDate})
            console.log(this.state.date);
        }
        else if (this.props.session === '3') {
            let sessionDate = this.props.dat + "T03:00:00";
            this.setState({date: sessionDate})
            console.log(this.state.date);
        }

        if (this.props.dat === '') {
            alert('Please ensure you have selected a Date');
        }
        else if (this.props.selOp === 'Default') {
            Bert.alert('Please ensure you have selected Pre or Post Weight', 'danger', 'fixed-top', 'fa-check');
        }
        else if (this.props.selOp === 'PreWeight') {
            Meteor.call('athletes.addPreWeight', this.props.athlete._id, this.state.date, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            });
            this.handleAlerts();
        }
        else if (this.props.selOp === 'PostWeight') {
            Meteor.call('athletes.addPostWeight', this.props.athlete._id, this.state.date, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            });
            this.handleAlerts();
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
        if (event.which === 13 /* Enter */) {
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
                        <input className='weightEnterInput' type="number" onChange={this.handleWeightChange}
                               onKeyPress={this.onKeyPress}/>
                    </form>
                </td>
            </tr>
        )
    }
}
