// Package Imports
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// Custom Files and Collections Imports
import Teams from '../Teams.js';

/*Publishes teams collection*/
Meteor.publish('teams.thisUserId', function teams() {
    return Teams.find({user: this.userId });
});

Meteor.publish('teams.all', () => Teams.find() );
