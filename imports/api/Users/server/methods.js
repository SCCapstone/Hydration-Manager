// Package Imports
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

// Custom File Imports
import ROLES from '../roles';
// import editProfile from './edit-profile';
// import deleteAccount from './delete-account';


//TODO: Add error handling (in virtually all methods)
//TODO: Remove this process.env variable and move this to a non public file or setting)
Meteor.startup(function() {
    process.env.MAIL_URL = "smtps://postmaster%40.sandbox2128a703612c4650830c88f0cb89b932.mailgun.org:127c6297173d29c775e482dc6a500b5c-833f99c3-fe2c07f1@smtp.mailgun.org:587";
    Accounts.emailTemplates.from = "hydrationmanager@gmail.com";
})

Meteor.methods({

    /*Definition for users.addNewRole (Server Side Method), will be called by client who will pass through attributes:
        * @Params targetId, roles
        * This function will add a new role to a user within the users collection.*/
      'users.addNewRole': function usersAddNewRole(targetId, roles) {
          Roles.setUserRoles(targetId,roles);
  },

    /*Definition for users.changeRole (Server Side Method), will be called by client who will pass through attributes:
    * @Params updateInfo
    * This function will change the role of a particular user within the users collection.*/
  'users.changeRole': function usersChangeRole(updateInfo) {
    check(updateInfo, { _id: String, role: String });

    // if (updateInfo._id !== this.userId && Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
    //   Roles.setUserRoles(updateInfo._id, updateInfo.role);
    // } else {
    //   throw new Meteor.Error('500', 'Access denied');
    // }
    Roles.setUserRoles(updateInfo._id, [updateInfo.role]);
  },
    /*Definition for users.updateRoles (Server Side Method), will be called by client who will pass through attributes:
    * @Params targetUserId, roles, group
    * This function will update the role of a particular user within the users collection.*/
  'users.updateRoles': function usersUpdateRoles (targetUserId, roles, group=null) {
    let loggedInUser = Meteor.user();
    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser,
                            [ROLES.ADMIN], group)) {
      throw new Meteor.Error(403, "Access denied");
    }
    Roles.setUserRoles(targetUserId, roles, group)
  },

    /*Definition for users.sendVerificationEmail (Server Side Method), will be called by client who will pass through attributes:
    * @Params updateInfo
    * This function will send a verification email to user with the corresponding userId within the users collection.*/
  'users.sendVerificationEmail': function usersSendVerificationEmail() {
    return Accounts.sendVerificationEmail(this.userId);
  },

  'users.sendResetPasswordEmail': function usersSendResetPasswordEmail() {
      return Accounts.sendResetPasswordEmail(this.userId);
  },


  // 'users.editProfile': function usersEditProfile(profile) {
  //   check(profile, {
  //     emailAddress: String,
  //     profile: {
  //       name: {
  //         first: String,
  //         last: String,
  //       },
  //     },
  //   });
  //   return editProfile({ userId: this.userId, profile })
  // },


  // Replaces - users.editProfile
  'users.update': function usersUpdate(user_obj) {
    check(user_obj, Match.Any);
    const currentProfile = Meteor.users.findOne({ _id: user_obj.id });
    const currentEmail = _.get(currentProfile, 'emails.0.address', '');
    //Update Accounts emails info
    if (currentEmail.toLowerCase() !== user_obj.email.toLowerCase()) {
      Accounts.addEmail(user_obj.id, user_obj.email);
      Accounts.removeEmail(user_obj.id, currentEmail);
    }
    Meteor.users.update(user_obj.id, {
      $set: {
        'emails.0.address': user_obj.email,
        'profile.name.first': user_obj.firstName,
        'profile.name.last': user_obj.lastName
      }
    });
    Roles.setUserRoles(user_obj.id, user_obj.roles);
  },
  /*    |--> Example Usage of 'users.update':

              const user_obj = {
                id: this.state.id,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                roles: this.state.roles,
              };
              Meteor.call('updateUser', user_obj, (error) =>{..........
  */

  // Password required
  'users.createNew_WithPswd': function usersCreateNewWithPswd(user_obj) {
    check(user_obj, {email: String, password: String, role: String, name: String, lastName: String});
    const user_info = {
      email: user_obj.email,
      password: user_obj.password
    };
    // on server: returns id if
    // on client(see Registration.jsx): logs in newly created user, has callback
    const id = Accounts.createUser(user_info);
    Meteor.users.update({_id: id}, {
      $set: {
        profile: {
          name: {first: user_obj.name, last: user_obj.lastName}
        }
      }
    });
    Roles.setUserRoles(id, [user_obj.role]);
  },


  // For Creating New User w/No Password (pswd selected later by user, possibly thru email)
  // -- User cannot log in until password set (eg, with Accounts.setPassword)
  'users.createNew_NoPswd': function usersCreateNewNoPswd(user_obj) {
    check(user_obj, {email: String, role: String, name: String, lastName: String});
    const user_info = {
      email: user_obj.email
    };
    const id = Accounts.createUser(user_info);
    Meteor.users.update({_id: id}, {
      $set: {
        profile: {
          name: {first: user_obj.name, last: user_obj.lastName}
        }
      }
    });
    Roles.setUserRoles(id, [user_obj.role]);
    // Send email with link for user to set their initial password.
    if (Meteor.isServer) {
      Accounts.sendEnrollmentEmail(id);
    }
  },


    /* Definition for users.deleteAccount (Server Side Method), will be called by client who will pass through attributes:
    * @Params userID
    * This function will remove the user's account with the corresponding id passed through. */
  'users.deleteAccount': function usersDeleteAccount(userID) {
    //TODO: Add error handling
    Meteor.users.remove(userId);
  },



});
