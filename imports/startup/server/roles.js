import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';

const defaultRoles = ['ADMIN', 'PUB', 'VIEW']; // This could be tied to its own admin :)

defaultRoles.forEach((role) => {
  const existingRoles = _.pluck(Roles.getAllRoles().fetch(), 'name');
  const roleExists = existingRoles.indexOf(role) > -1;
  if (!roleExists) Roles.createRole(role);
});



/*
ADMIN: 'ADMIN',    // Administrator - complete access
PUB: 'PUB',        // Publisher - CRUD data, but No Admin Tasks, e.g. cannot create/authorize new users
VIEW: 'VIEW',      // Viewer - can only view information
*/
