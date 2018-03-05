import { Meteor } from 'meteor/meteor';

import '../imports/api/users.jsx'
import '/imports/api/TeamsCollection'

Meteor.startup(() => {
  Meteor.publish("allUsers", function(){
    return Meteor.users.find({})
  })

  if( Meteor.users.find().count() === 0 ){
    let cResult = Accounts.createUser({
      username: 'admin',
      email: 'hydrationmanager@gmail.com',
      password: 'Wethebest',
      profile:  {
        first_name: 'Hydration',
        last_name: 'Manager',
        department: 'Athletics'
      }
    });

    Roles.addUsersToRoles(cResult, 'admin');
  }

  Meteor.methods({
    'users.add': function(newUser) {
      let cResult = Accounts.createUser({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profile: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          department: newUser.department
        }
      })
      Roles.addUsersToRoles(cResult, 'client')
      return true;
    },
    'users.addRole':function(userId, newRole) {
      Roles.addUsersToRoles(userId, newRole)
      return true;
    }
  })
});
