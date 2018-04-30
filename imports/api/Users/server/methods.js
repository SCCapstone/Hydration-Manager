// Package Imports
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import _ from 'lodash';

// Custom File Imports
import ROLES from '../roles';
// import editProfile from './edit-profile';
// import deleteAccount from './delete-account';

//TODO: Add error handling (in virtually all methods)
//TODO: Remove this process.env variable and move this to a non public file or setting)

/*After 15 Minutes of Inactivity User Will Be Automatically Logged Out!*/
Accounts.config({
    /* ( 15 minutes / 1440 minutes in a day ) = 0.0104 */
    //loginExpirationInDays: 0.0104
});

if(!Meteor.isProduction) {
    Meteor.startup(function () {
        process.env.MAIL_URL = "smtps://hydrationmanager%40gmail.com:capstone@smtp.gmail.com:465/";
        //Accounts.emailTemplates.from = "hydrationmanager@gmail.com";
    });
}

Meteor.methods({
    /*Definition for users.addNewRole (Server Side Method), will be called by client who will pass through attributes:
        * @Params targetId, roles
        * This function will add a new role to a user within the users collection.*/
    'users.addNewRole': function usersAddNewRole(targetId, roles) {
        Roles.setUserRoles(targetId, roles);
    },
    /*Definition for users.changeRole (Server Side Method), will be called by client who will pass through attributes:
    * @Params updateInfo
    * This function will change the role of a particular user within the users collection.*/
    'users.changeRole': function usersChangeRole(updateInfo) {
        check(updateInfo, {_id: String, role: String});
        /* if (updateInfo._id !== this.userId && Roles.userIsInRole(this.userId, [ROLES.ADMIN])) {
           Roles.setUserRoles(updateInfo._id, updateInfo.role);
         } else {
           throw new Meteor.Error('500', 'Access denied');
         } */
        Roles.setUserRoles(updateInfo._id, [updateInfo.role]);
    },
    /*Definition for users.updateRoles (Server Side Method), will be called by client who will pass through attributes:
    * @Params targetUserId, roles, group
    * This function will update the role of a particular user within the users collection.*/
    'users.updateRoles': function usersUpdateRoles(targetUserId, roles, group = null) {
        let loggedInUser = Meteor.user();
        if (!loggedInUser || !Roles.userIsInRole(loggedInUser, [ROLES.ADMIN], group)) {
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

    // Password required
    'users.createNew_WithPswd': function usersCreateNewWithPswd(eM, pass, phone) {
        const user_info = {
            //email: user_obj.email,
            //password: user_obj.password,
            email: eM,
            password: pass,
        };
        // on server: returns id if
        // on client(see Registration.jsx): logs in newly created user, has callback
        const id = Accounts.createUser(user_info);
        Meteor.users.update({_id: id}, {
            $set: {
                profile: {
                    phone: phone,
                    head: false,
                    teamAccess: [],
                }
            }
        });
        Roles.setUserRoles(id, ['PUB']);
    },
    /* Definition for users.deleteAccount (Server Side Method), will be called by client who will pass through attributes:
    * @Params userID
    * This function will remove the user's account with the corresponding id passed through. */
    'users.deleteAccount': function usersDeleteAccount(userId) {
        //TODO: Add error handling
        Meteor.users.remove(userId);
    },

    'users.editProfile': function usersEditProfile(userId, emailAddress, phoneNumber) {

        const currentUser = Meteor.users.findOne({_id: userId});
        const currentEmail = _.get(currentUser, 'emails.0.address', '');

        if (currentEmail !== emailAddress) {
            Accounts.addEmail(userId, emailAddress);
            Accounts.removeEmail(userId, currentEmail);
        }

        Meteor.users.update(userId, {
            $set: {
                profile: {phone: phoneNumber, head: currentUser.profile.head.valueOf(), teamAccess: currentUser.profile.teamAccess.valueOf()},
            },
        });

    },
});
