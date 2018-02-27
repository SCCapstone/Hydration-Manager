// Package Imports
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// Custom File Imports
import Teams from '../Teams.js';

Meteor.publish('teams.thisUserId', function teams() {
    return Teams.find({user: this.userId });
  });
