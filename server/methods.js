import {SiteUser} from '../imports/api/users.jsx'
import {Teams} from '../imports/api/teams.jsx'

import {CurrentUser} from '../imports/api/users.jsx'

import {Athletes} from '../imports/api/athletes.jsx'

Meteor.methods({

  addNewSiteUser(email, password) {
    SiteUser.insert({
      email: email,
      password: password,
      currentUser: false,
      createdAt: new Date()
    });
  },

  verifyUser_MM(emailAddr,pswd) {
    var isUser = SiteUser.findOne({"email": emailAddr, "password": pswd});

    {/* delete all current users, then add new current logged-in user */}
    CurrentUser.remove({});
    CurrentUser.insert({
      userID: isUser._id,
      createdAt: new Date()
    });

    {/* set this users as the current user */}
    SiteUser.update(isUser._id, {
      $set: {currentUser: "true"}
    });

    return isUser;
  },

  addNewTeam(teamName, teamSeason, id) {
    Teams.insert({
      name: teamName,
      season: teamSeason,
      user: id,
      createdAt: new Date()
    });
  },

  deleteTm(id) {
    Teams.remove(id);
  },

  getCurrentUser() {
    var curUser = CurrentUser.findOne();
    var id = curUser.userID;
    return id;
  },

  addNewPlayer(name, weight, height) {
    Athletes.insert({
      name: name,
        height: height,
        baseWeight: weight,
        createdAt: new Date(),
        weightData: {date: '', preWeight: '', postWeight: ''}
    });
  },

  addWeight(id, date, option, weight) {
      if (option === 'PreWeight') {
      Athletes.update(id, {
      $push: { weightData: {date:date, preWeight:weight}}
      },{multi: true})

      }

      else{
      Athletes.update(id, {
      $set: { weightData: {date: date, postWeight: weight} }
      },{multi: true})
      }
      console.log('We added', option);
      console.log('Weight Entry:', weight);
  },

  deleteAthlete(id) {
    Athletes.remove(id);
  }

});
