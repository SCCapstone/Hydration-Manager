// Populate User collection (in accounts-base)
//   - For 'development' & 'staging' environments
// Package Imports
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

// Custom File Imports
//import ROLES  from '../../api/Users/roles.js';

// import seeder from '@cleverbeagle/seeder';
//
// seeder(Meteor.users, {
//   environments: ['development', 'staging'],
//   data: [{
//     username: 'admin1',
//     //email: 'admin@admin.com',
//     emails: [
//       {
//         address: 'admin@admin.com',
//         verified: true,
//       }
//     ],
//     password: 'password',
//     profile: {
//       name: {
//         first: 'John',
//         last: 'Doe',
//       },
//     },
//     roles: [ROLES.ADMIN],
//   }],
// });

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'John',
        last: 'Doe'
      },
    },
    roles: ['ADMIN'],
  },
  {
    email: 'admin1@admin1.com',
    password: 'password1',
    profile: {
      name: {
        first: 'Jane',
        last: 'Doe'
      },
    },
    roles: ['PUB'],
  },
  ];

  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      //Roles.addUsersToRoles(userId, roles);
      console.log(roles);
      Roles.setUserRoles(userId, roles);
    }
  });
};


// //if (!Meteor.isProduction) {
// if ( Meteor.users.find().count() === 0 ) {
//   const users = [{
//     email: 'admin@admin.com',
//     password: 'password',
//     profile: {
//       name: {
//         first: 'John',
//         last: 'Doe'
//       },
//     },
//     roles: ['ADMIN'],
//   }];
//
//   users.forEach(({ email, password, profile, roles }) => {
//     const userExists = Meteor.users.findOne({ 'emails.address': email });
//
//     if (!userExists) {
//       const userId = Accounts.createUser({ email, password, profile });
//       Roles.addUsersToRoles(userId, roles);
//     }
//   });
// }



// // Alternate:
//
// if ( Meteor.users.find().count() === 0 ) {
//     Accounts.createUser({
//         username: 'admin1',
//         emails: [
//           {
//             address: 'admin@admin.com',
//             verified: true,
//           }
//         ],
//         password: 'password',
//         profile: {
//           name: {
//             first: 'John',
//             last: 'Doe',
//           },
//         },
//         roles: [ROLES.ADMIN],
//     });
// }
