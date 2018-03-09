// Package Imports
import { Mongo } from 'meteor/mongo';
/*import SimpleSchema from 'simpl-schema';*/
// Custom File Imports
const Teams = new Mongo.Collection('teams');


export default Teams;
// Teams.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false,
// });
//
// Teams.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true,
// });
//
// Teams.schema = new SimpleSchema({
//   name: {
//     type: String,
//     label: 'The name of the team.',
//   },
//
//   season: {
//     type: String,
//     label: 'The team\'s season .',
//   },
//   user: {
//     type: String,
//     label: 'The id of the user that created the team.',
//   },
//   createdAt: {
//     type: String,
//     label: 'The date this team was created.',
//     autoValue() {
//       if (this.isInsert) return (new Date()).toISOString();
//     },
//   },
// });
//
// Teams.attachSchema(Teams.schema);




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
