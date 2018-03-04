// Package Imports
import { Meteor } from 'meteor/meteor';

// Custom File Imports
import Teams from './Teams.js';
import handleMethodException from '../../modules/handle-method-exception.js';


Meteor.methods({


  'teams.insert': function teamsInsert(tname, tseason, tid) {
    console.log(tname);
    try {
      return Teams.insert({
        name: tname,
        season: tseason,
        user: tid,
        createdAt: new Date(),
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  },


  'teams.remove': function removeTeam(id) {
    Teams.remove(id);
  },


});



// rateLimit({
//   methods: [
//     'documents.insert',
//     'documents.update',
//     'documents.remove',
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
