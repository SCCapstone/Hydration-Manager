// Package Imports
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';
import {_} from 'meteor/underscore';


/*
ADMIN: 'ADMIN',    // Administrator - complete access
PUB: 'PUB',        // Publisher - CRUD data, but No Admin Tasks, e.g. cannot create/authorize new users
VIEW: 'VIEW',      // Viewer - can only view information

 const defaultRoles = ['ADMIN', 'PUB', 'VIEW'];  This could be tied to its own admin :)

 defaultRoles.forEach((role) => {
   const existingRoles = _.pluck(Roles.getAllRoles().fetch(), 'name');
   const roleExists = existingRoles.indexOf(role) > -1;
   if (!roleExists) Roles.createRole(role);
 });

 //Serve Hook - called w/ options from Accounts.createUser()

 Accounts.onCreateUser(function(options, user) {
      Use provided profile in options, or create an empty object
     user.profile = options.profile || {};
      Assigns first and last names to the newly created user object
     user.profile.firstName = options.firstName;
     user.profile.lastName = options.lastName;
      Returns the user object
     return user;

   user.roles = ['ADMIN']

   !!options.roles ? Roles.addUsersToRoles( options._id, ['ADMIN'] ) : '' ;
   return user;
 });
*/