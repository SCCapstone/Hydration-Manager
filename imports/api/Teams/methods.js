import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Teams from './Teams.js';
import handleMethodException from '../../modules/handle-method-exception';


Meteor.methods({
  'teams.insert': function teamsInsert(tname, tseason, tid) {
    // check(doc, {
    //   name: String,
    //   season: String,
    //   id: String,
    // });

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


// addNewTeam(teamName, teamSeason, id) {
//   Teams.insert({
//     name: teamName,
//     season: teamSeason,
//     user: id,
//     createdAt: new Date()
//   });
// },
//
// deleteTm(id) {
//   Teams.remove(id);
// },
