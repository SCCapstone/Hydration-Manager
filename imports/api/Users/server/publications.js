import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import ROLES from '../roles';

Meteor.publish('users.roles', () => Roles.getAllRoles());

Meteor.publish('users', function users() {
  if (Roles.userIsInRole(this.userId, [ROLES.ADMIN]) ) {
    return [
      Meteor.users.find({}, { fields: { emails: 1, roles: 1 } }),
      Roles.getAllRoles(),
    ];
  }

  return this.ready();
});
