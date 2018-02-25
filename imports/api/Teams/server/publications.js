import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import ROLES from '../roles';

import Teams from '../Teams.js';


Meteor.publish('teams', function teams() {
    return Teams.find({user: this.userId });
  }




// Meteor.publish('teams', function teams() {
//   if (Roles.userIsInRole(this.userId, [ROLES.ADMIN]) ) {
//     return [
//       Meteor.users.find({}, { fields: { emails: 1, roles: 1 } }),
//       Roles.getAllRoles(),
//     ];
//   }
//
//   return this.ready();
