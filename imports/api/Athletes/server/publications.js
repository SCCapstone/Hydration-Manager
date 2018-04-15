// Package Imports
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

// Custom File and Collection Imports
import Athletes from '../Athletes.js';

//Simply publishes all Athletes that are found.
Meteor.publish('athletes.all', function athletes() {
    return Athletes.find({}, {sort: {name: 1}});
});
