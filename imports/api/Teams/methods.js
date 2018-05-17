// Package Imports
import {Meteor} from 'meteor/meteor';

// Custom File & Collections Imports
import Teams from './Teams.js';
import handleMethodException from '../../modules/handle-method-exception.js';

Meteor.methods({
    /*Definition for athletes.insert (Server Side Method), will be called by client who will pass through attributes:
    * @Params aName, aWeight, aHeight, aTeamId
    * This function will create and add a new Athlete to the database.*/
    'teams.insert': function teamsInsert(tName, tSeason, Id) {
        //console.log(tName);
        try {
            return Teams.insert({
                name: tName,
                season: tSeason,
                whoCreated: Id,
                usersAccess: [Id],
                //smsAlertList: [Id],
                //dailyReportList: [Id],
                createdAt: new Date(),
            })
        } catch (exception) {
            handleMethodException(exception);
        }
    },
    /* Definition for teams.edit (Server Side Method), will be called by client who will pass through attributes:
    * @Params id, nm (name), s(season)
    * This function will update the name and season of a particular team using the corresponding id. */
    'teams.edit': function editTeams(id, nm, s) {
        Teams.update(
            {_id: id}, {
                $set: {name: nm, season: s}
            }
        );
    },
    /* Definition for teams.remove (Server Side Method), will be called by client who will pass through attributes:
    * @Params id
    * This function will remove the team with the corresponding id passed through. */
    'teams.remove': function removeTeam(id) {
        Teams.remove(id);
    },

    'teams.addUserAccess': function addUserAccess(id, usrEmail, userID) {
        Teams.update(
            {_id: id}, {
                $push: {
                    usersAccess: userID
                }
            }
        );
    },

    'teams.removeUserAccess': function removeUserAccess(id, usrEmail, userID) {
        Teams.update(
            {_id: id}, {
                $pull: {
                    usersAccess: userID
                }
            }
        );
    },

    'teams.addSMS': function addSMS(id, usrEmail, userID) {
        Teams.update(
            {_id: id}, {
                $push: {
                    smsAlertList: userID
                }
            }
        );
    },

    'teams.removeSMS': function removeSMS(id, usrEmail, userID) {
        Teams.update(
            {_id: id}, {
                $pull: {
                    smsAlertList: userID
                }
            }
        );
    },

    'teams.addDaily': function addDaily(id, usrEmail, userID) {
        Teams.update(
            {_id: id}, {
                $push: {
                    dailyReportList: userID
                }
            }
        );
    },

    'teams.removeDaily': function removeDaily(id, usrEmail, userID) {
        Teams.update(
            {_id: id}, {
                $pull: {
                    dailyReportList: userID
                }
            }
        );
    },

});