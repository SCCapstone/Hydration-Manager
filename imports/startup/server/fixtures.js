// Populate User collection (in accounts-base)
//   - For 'development' & 'staging' environments
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import ROLES from '../../api/Users/roles.js';

// import seeder from '@cleverbeagle/seeder';
// seeder(Meteor.users, {
//   environments: ['development', 'staging'],
//   data: [{
//     //username: 'admin1',
//     email: 'admin@admin.com',
//     password: 'password',
//     profile: {
//       name: {
//         first: 'John',
//         last: 'Doe',
//       },
//     },
//     roles: ['admin'],
//   }],
// });


// Alternate:

if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'admin1',
        email: 'admin@admin.com',
        password: 'password',
        profile: {
          name: {
            first: 'John',
            last: 'Doe',
          },
        },
        roles: [ROLES.ADMIN],
    });
}
