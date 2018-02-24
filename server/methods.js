import {User} from '../imports/api/users.jsx'
import {Teams} from '../imports/api/teams.jsx'
import {Athletes} from '../imports/api/athletes.jsx'

Meteor.methods({

  addNewUser(email, password) {
    User.insert({
      email: email,
      password: password,
      currentUser: false,
      admin: false,
      createdAt: new Date()
    });
  },

  verifyUser_MM(emailAddr,pswd) {
    var isUser = User.findOne({"email": emailAddr, "password": pswd});

    {/* delete all current users, then add new current logged-in user */}
 //   CurrentUser.remove({});
 //   CurrentUser.insert({
 //     userID: isUser._id,
 //     createdAt: new Date()
 //   });

    {/* set this users as the current user */}
    User.update(isUser._id, {
      $set: {currentUser: true}
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

  addNewPlayer(name, weight, height, teamId) {
    Athletes.insert({
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
        Athletes.update(
        { _id: id },
        { $pull: {preWeightData: {date:date} }});

      Athletes.update(
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
      Athletes.update(
          { _id: id },
          { $pull: {postWeightData: {date:date} }});

      Athletes.update(
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
    Athletes.remove(id);
  },

  logoutUser(id){
      User.update({_id: id},{
          $set: {currentUser: "false"}
      });
  }

});
