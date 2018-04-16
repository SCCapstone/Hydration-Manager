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
    handleAlerts(e) {
        e.persist();
        let preData = this.props.athlete.preWeightData;
        let postData = this.props.athlete.postWeightData;
        let d = this.state.date;
        let name = this.props.athlete.name;
        let pre = 0;
        let post = 0;
        console.log("We're in the handleAlerts function");
        const delayInMilliseconds = 5000; // Five second delay ; Trying to delay to give the arrays enough time to populate. **Update: Delay doesn't seem to help the array to populate. Unsure.
        //setTimeout(function () {
        console.log("The preDatalength is " + preData.length);
        for (let i = 0; i < preData.length; i++) {
            //console.log("The preData[" + i + "] is " + preData[i].date + " " + preData[i].weight + " " + preData[i].session);
            //console.log("The state:date data is " + d);
            if (preData[i] !== undefined) {
                if (preData[i].date === d) {
                    pre = preData[i].weight;
                    console.log("Pre value is : " + pre);
                }
            }
        }
        console.log("The postDatalength is " + postData.length);
        for (let i = 0; i < postData.length; i++) {
            //console.log("The postData[" + i + "] is " + postData[i]);
            if (postData[i] !== undefined) {
                if (postData[i].date === d) {
                    post = postData[i].weight;
                    console.log("Post value is : " + post);
                }
            }
        }
        let hydration = 0;
        if (pre > 0 && post > 0) {
            hydration = (((pre - post)) / pre) * 100;
        }
        //console.log("The hydration % is "+hydration);
        // This generates an alert for an athlete entering 'red' status based on the most recent pre/post.
        if (hydration <= -4 || hydration >= 4) {
            Meteor.call('athletes.generateSMS', name, hydration, "red", () => {
                //console.log("We're calling the SMS alert");
            });
        }
        //}, delayInMilliseconds);
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
            this.setState({date: sessionDate});
            console.log("The state.date has been set to " + this.state.date);
        }
        else if (this.props.session === '2') {
            let sessionDate = this.props.dat + "T02:00:00";
            this.setState({date: sessionDate});
            console.log("The state.date has been set to " + this.state.date);
        }
        else if (this.props.session === '3') {
            let sessionDate = this.props.dat + "T03:00:00";
            this.setState({date: sessionDate});
            console.log("The state.date has been set to " + this.state.date);
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
            this.handleAlerts(e);
        }
        else if (this.props.selOp === 'PostWeight') {
            Meteor.call('athletes.addPostWeight', this.props.athlete._id, this.state.date, this.state.weight, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight Added', 'success', 'fixed-top', 'fa-check');
            });
            this.handleAlerts(e);
        }
        this.handleAlerts(e);
    };
    /*handleWeightChange Function will set weight to e.target.value*/
    handleWeightChange = (e) => {
        e.persist();
        this.setState({weight: e.target.value});
        this.handleDebounce(e);
    };

    /*When Enter/Return button is press, it will run event.preventDefault function*/
    onKeyPress(event){
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
