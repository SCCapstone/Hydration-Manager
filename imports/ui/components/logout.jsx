import React, { Component } from 'react';
import {debounce} from "throttle-debounce";
import {Button} from 'react-bootstrap';
import { User } from '../../api/users.jsx';

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
                <Button onClick={this.log}>Logout</Button>
            </div>
        )
    }
}