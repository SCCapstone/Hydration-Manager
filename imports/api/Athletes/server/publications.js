// Package Imports
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// Custom File Imports
import Athletes from '../Athletes.js';

Meteor.publish('athletes.thisTeamId', function athletes() {
    return Athletes.find();
});