// Package Imports
import React, {Component} from 'react';
import {debounce} from 'throttle-debounce';
import autoBind from 'react-autobind';
import {Tracker} from 'meteor/tracker';

import AthletesCollection from '../../api/Athletes/Athletes.js';
import {Meteor} from "meteor/meteor";
import _ from "lodash";

export default class AthleteEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            weight: '',
            preDataState: '',
            postDataState: '',
            pre: '',
            post: '',
        };
        this.handleDebounce = debounce(1000, this.handleDebounce);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        autoBind(this);
    };

    // The purpose of this function is to generate an alert if an athlete is in the 'red' alert status
    // The only time this function should be called is if the athlete has just had a weight entered via weight entry,
    // hopefully avoiding spamming of alerts.
    /* So, I was having a problem with alerts here. To make a long story short, the client would not update the lengths of the prop arrays until another update had
    *    been pushed to the prop. In other words, the length of the preWeightArray wouldn't update until you had also updated the postWeightArray in the athlete.prop.
    *    To get around this, I'm now checking for cases where a prop I need does exist, and then using states for the other end. Alternatively,
    *    if someone is typing data (both pre and post) in the same session (not correct workflow), it will still catch the alert. -anthony*/
    handleAlerts(e) {
        //e.persist();
        //this.forceUpdate();
        let preData = this.props.athlete.preWeightData;
        let postData = this.props.athlete.postWeightData;
        let d = this.state.date;
        let name = this.props.athlete.name;
        let pre = -1;
        let post = -1;
        //Meteor.call('athletes.editName', this.props.athlete._id, this.props.athlete.name, () => {});
        //console.log("We're in the handleAlerts function");
        //const delayInMilliseconds = 5000; // Five second delay ; Trying to delay to give the arrays enough time to populate. **Update: Delay doesn't seem to help the array to populate. Unsure.
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
        if (pre === -1) {
            pre = this.state.pre;
        }
        //console.log("This is the props value " + this.props.athlete._id);
        //console.log(AthletesCollection.find({_id: this.props.athlete._id}).fetch());
        //console.log("The postDatalength is " + postData.length);
        for (let i = 0; i < postData.length; i++) {
            //console.log("The postData[" + i + "] is " + postData[i]);
            if (postData[i] !== undefined) {
                if (postData[i].date === d) {
                    post = postData[i].weight;
                    console.log("Post value is : " + post);
                }
            }
        }
        if (post === -1) {
            post = this.state.post;
        }
        let hydration = 0;
        if (pre > 0 && post > 0) {
            hydration = (((pre - post)) / pre) * 100;
            console.log("The hydration % is " + hydration);
            if (hydration > 0) { // Positive hydration represents a weight loss.
                hydration = "-" + hydration;
            }
            if (hydration < 0) { // Negative hydration represents a weight gain.
                hydration = -hydration;
            }
        }
        // This generates an alert for an athlete entering 'red' status based on the most recent pre/post.
        if (hydration <= -4 || hydration >= 4) {
            //let list = this.listofAlerts;
            /*for (let i = 0; i < list.length; i++)
            {
                Meteor.call('athletes.generateSMS', name, hydration, "red", *phoneNumberVarFromUserObject*, () => {
                console.log("We're calling the SMS alert");
            });
            }*/
            const users = Meteor.users.find({}).fetch();
            let headAdmin = null;
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].profile);
                if (users[i].profile.head === true) {
                    headAdmin = users[i];
                }
            }
            console.log(headAdmin);
            const currentPhone = "+" + headAdmin.profile.phone;
            console.log(currentPhone);
            Meteor.call('athletes.generateSMS', name, hydration, "red", currentPhone, () => {
                console.log("We're calling the SMS alert");
            });
        }
        if ((hydration > -4 && hydration < -3) || (hydration > 3 && hydration < 4)) {
            //let list = this.listofAlerts;
            /*for (let i = 0; i < list.length; i++)
            {
                Meteor.call('athletes.generateSMS', name, hydration, "red", *phoneNumberVarFromUserObject*, () => {
                console.log("We're calling the SMS alert");
            });
            }*/
            const users = Meteor.users.find({}).fetch();
            let headAdmin = null;
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].profile);
                if (users[i].profile.head === true) {
                    headAdmin = users[i];
                }
            }
            console.log(headAdmin);
            const currentPhone = "+" + headAdmin.profile.phone;
            console.log(currentPhone);
            Meteor.call('athletes.generateSMS', name, hydration, "yellow", currentPhone, () => {
                console.log("We're calling the SMS alert");
            });
        }
        //}, delayInMilliseconds);
    };


// Handler Functions
    /*handleDebounce function provides checks and alerts*/
    handleDebounce = (e) => {
        e.persist();
        //console.log('You have selected:', this.props.selOp);
        //console.log('The weight stored is:', e.target.value);
        //console.log('The athlete you selected is', this.props.athlete.name);
        let tempWeight = 0;
        if (this.props.session === '1') {
            let sessionDate = this.props.dat + "T01:00:00";
            this.setState({date: sessionDate});
            //console.log("The state.date has been set to " + this.state.date);
        }
        else if (this.props.session === '2') {
            let sessionDate = this.props.dat + "T02:00:00";
            this.setState({date: sessionDate});
            //console.log("The state.date has been set to " + this.state.date);
        }
        else if (this.props.session === '3') {
            let sessionDate = this.props.dat + "T03:00:00";
            this.setState({date: sessionDate});
            //console.log("The state.date has been set to " + this.state.date);
        }

        if (this.props.dat === '') {
            alert('Please ensure you have selected a Date');
        }
        else if (this.state.weight === '' || this.state.weight === null || this.state.weight.includes("e")) {
            Bert.alert('Please ensure you have entered the Weight correctly', 'warning', 'growl-top-left', 'fa-warning');
        }
        else if (this.props.selOp === 'Default') {
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('Please ensure you have selected Pre/Post Weight.', 'warning', 'growl-top-left', 'fa-warning');
        }
        else if (this.props.selOp === 'PreWeight' /*&& this.validateWeight === true*/) {
            /*tempWeight = this.state.weight + 1;
            Meteor.call('athletes.addPreWeight', this.props.athlete._id, this.state.date, tempWeight, () => {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Weight Added!', 'success', 'growl-top-left', 'fa-check');
            });*/
            Meteor.call('athletes.addPreWeight', this.props.athlete._id, this.state.date, this.state.weight, () => {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Weight Added!', 'success', 'growl-top-left', 'fa-check');
            });
            this.setState({pre: this.state.weight});
            //this.handlePreChange();
            //this.forceUpdate();
            //let preData = this.props.athlete.preWeightData; // Maybe if I just access the data here it will update; Update. NOPE.
            //this.handleAlerts(e);
        }
        else if (this.props.selOp === 'PostWeight') {
            /*tempWeight = this.state.weight + 1;
            Meteor.call('athletes.addPostWeight', this.props.athlete._id, this.state.date, tempWeight, () => {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Weight Added', 'success', 'growl-top-left', 'fa-check');
            });*/
            Meteor.call('athletes.addPostWeight', this.props.athlete._id, this.state.date, this.state.weight, () => {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Weight Added!', 'success', 'growl-top-left', 'fa-check');
            });
            this.setState({post: this.state.weight});
            //this.handlePostChange();
            //this.forceUpdate();
            //let postData = this.props.athlete.postWeightData;
            //this.handleAlerts(e);
        }
        this.handleAlerts(e);
        //Tracker.flush();
        //console.log("This is the object for preWeight" + this.props.athlete.preWeightData);
        //console.log("This is the object for postWeight" + this.props.athlete.postWeightData);
        //console.log("This is before we flush.");
        //Tracker.afterFlush(this.handleAlerts(e));
        //console.log("This is after we flush.");
    };

    /*handleWeightChange Function will set weight to e.target.value*/
    handlePreChange() {
        this.setState({preDataState: this.props.athlete.preWeightData});
    };

    /*handleWeightChange Function will set weight to e.target.value*/
    handlePostChange() {
        this.setState({postDataState: this.props.athlete.postWeightData});
    };

    //validateWeight function for entry list
    validateWeight = (e) => {
        e.persist();
        //Regex for athlete entry list
        let rx = /(\d*[.])?\d+/;
        console.log(rx.test(e));
        console.log("The object e is " + e);
        console.log("The object e.value is " + e.value);
        console.log("The object e.target.value is " + e.target.value);
        /*  This code looks as if it should catch the errors, being that
          if the result of the regex test is false or if the val
         I don't know the reason behind why it isn't throwing the error.
         */
        if (rx.test(e.target.value) === false) {
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('Invalid Input: Please re-evaluate input', 'warning', 'growl-top-left', 'fa-warning');
            return false;
        }
        else {
            return true;
        }
    };

    /*handleWeightChange Function will set weight to e.target.value*/
    handleWeightChange = (e) => {
        e.persist();
        console.log("Entered value " + e.target.value)
        // pattern = new RegExp("\d{1,3}\.{0,1}\d*");
        //let bool = this.validateWeight(e);
        //let bool2 = true;
        /* If input is negative, the check does NOT pass and a resulting error is thrown. */
        if (e.target.value < 0) {
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('Weight should be non-negative', 'warning', 'growl-top-left', 'fa-warning');
            //bool2 = false;
        }
        // else if (pattern.test(e.target.value) == false)
        // {
        //     Bert.alert('Weight input incorrectly formatted.', 'warning', 'growl-top-left', 'fa-warning');
        // }
        /* if (bool === false || bool2 === false) {
             console.log("There was an error in weight input.");
         }*/
        /* If else, pass the value */
        else {
            this.setState({weight: e.target.value});
            this.handleDebounce(e);
        }
    };

    /*When Enter/Return or e button are pressed, it will run event.preventDefault function*/
    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    };

    handleView() {
        let currentUser = Meteor.user();
        if (currentUser !== null) {
            let check = false;
            for (let i = 0; i < currentUser.profile.teamAccess.length; i++) {
                if (this.props.athlete.teamId === currentUser.profile.teamAccess[i]) {
                    check = true;
                }
            }
            return check;
        }
        else return false;
    }

    /*Render weights and allows changes*/
    render() {
        if (this.handleView() === false && Meteor.user().roles[0] !== "ADMIN") {
            return null;
        }
        return (
            <tr>
                <td>{this.props.athlete.name}</td>
                <td>
                    <form className={"dataEntry" + this.props.athlete._id}>
                        <input className='weightEnterInput' type="number" onChange={this.handleWeightChange}
                               onKeyPress={this.onKeyPress}
                               pattern="^(\d{1,3}\.{0,1}\d*)$" /*weightValidated={this.validateWeight}*//>
                    </form>
                </td>
            </tr>
        )
    }
}
