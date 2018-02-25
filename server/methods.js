
import {SiteUser} from '../imports/api/users.jsx'
import {TeamsOld} from '../imports/api/teams.jsx'

import {CurrentUser} from '../imports/api/users.jsx'

import {AthletesOld} from '../imports/api/athletes.jsx'

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

    //delete all current users, then add new current logged-in user
    CurrentUser.remove({});
    CurrentUser.insert({
      userID: isUser._id,
      createdAt: new Date()
    });

    //set this users as the current user
    SiteUser.update(isUser._id, {
      $set: {currentUser: "true"}
    });

    return isUser;
  },

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

  getCurrentUser() {
    var curUser = CurrentUser.findOne();
    var id = curUser.userID;
    return id;
  },

  addNewPlayer(name, weight, height, teamId) {
    AthletesOld.insert({
      name: name,
      baseWeight: weight,
      height: height,
      teamId: teamId,
      createdAt: new Date(),
      preWeightData: [],
      postWeightData: []
    });
  },

  addPreWeight(id, date, weight) {
        AthletesOld.update(
        { _id: id },
        { $pull: {preWeightData: {date:date} }});

      AthletesOld.update(
          { _id: id },
          {
              $push: {
                  preWeightData: {
                      $each: [{date: date, weight: weight}],
                      $sort: {date: -1}
                  }
              }
          }
      );
  },
  addPostWeight(id, date, weight) {
      AthletesOld.update(
          { _id: id },
          { $pull: {postWeightData: {date:date} }});

      AthletesOld.update(
          { _id: id },
          {
            $push: {
                postWeightData: {
                    $each: [{date: date, weight: weight}],
                    $sort: {date: -1}
                }
            }
          }
          );

  },
  deleteAthlete(id) {
    AthletesOld.remove(id);
  }

});
