import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    log() {
        Meteor.call('logoutUser', this.props.user._id);
        window.location ='/login';
    }

    render() {
        return (
            <div>
                <Button onClick={this.log}>Not Working Yet</Button>
            </div>
        )
    }
}