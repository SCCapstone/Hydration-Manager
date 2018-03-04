// Package Imports
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// Custom File Imports
import ROLES from '../roles';

Meteor.publish('users.roles', () => Roles.getAllRoles() );

Meteor.publish('users.ifAdmin', function usersIfAdmin() {
  userRole = Roles.getRolesForUser(this.userId);
  //if (Roles.userIsInRole(this.userId, [ROLES.ADMIN]) ) {
  if (userRole.includes('ADMIN')) {
    return [
      Meteor.users.find({}, { fields: { emails: 1, roles: 1 } }),
      Roles.getAllRoles(),
    ];
  }
  return this.ready();
});

Meteor.publish('users.all', () => Meteor.users.find({}) );
