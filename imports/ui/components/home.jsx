import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export default class Home extends TrackerReact(React.Component) {

    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}
