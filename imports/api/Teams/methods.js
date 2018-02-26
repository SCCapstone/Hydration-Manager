import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Teams from './Teams.js';
import handleMethodException from '../../modules/handle-method-exception.js';


Meteor.methods({
  'teams.insert': function teamsInsert(tname, tseason, tid) {
    // check(doc, {
    //   name: String,
    //   season: String,
    //   id: String,
    // });
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
  }

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
