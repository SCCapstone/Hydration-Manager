import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import ROLES from '../roles';

//JS functions:
import editProfile from './edit-profile';
import deleteAccount from './delete-account';

Meteor.methods({
  'users.addNewRole': function usersAddNewRole(targetId, roles) {
    Roles.setUserRoles(targetId,roles);
  },

  'users.changeRole': function usersChangeRole(updateInfo) {
    check(updateInfo, { _id: String, role: String });

    if (updateInfo._id !== this.userId && Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
      Roles.setUserRoles(updateInfo._id, updateInfo.role);
    } else {
      throw new Meteor.Error('500', 'Access denied');
    }
  },

  'users.updateRoles': function usersUpdateRoles (targetUserId, roles, group=null) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser,
                            [ROLES.ADMIN], group)) {
      throw new Meteor.Error(403, "Access denied")
    }

    Roles.setUserRoles(targetUserId, roles, group)
  },

  'users.sendVerificationEmail': function usersSendVerificationEmail() {
    return Accounts.sendVerificationEmail(this.userId);
  },

  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      profile: {
        name: {
          first: String,
          last: String,
        },
      },
    });
    return editProfile({ userId: this.userId, profile })

  },

  'users.deleteAccount': function usersDeleteAccount() {
    return deleteAccount({ userId: this.userId })

  },

});
