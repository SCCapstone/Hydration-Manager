// Package Imports
import { Meteor } from 'meteor/meteor';

// Custom File Imports
import Athletes from './Athletes.js';
import handleMethodException from '../../modules/handle-method-exception.js';

Meteor.methods({
    'athletes.insert': function athletesInsert(aName,aWeight,aHeight,aTeamId) {
        console.log(aName);
        try {
            return Athletes.insert({
                name: aName,
                baseWeight: aWeight,
                height: aHeight,
                teamId: aTeamId,
                createdAt: new Date(),
                preWeightData: [],
                postWeightData: []
            });
        } catch (exception) {
            handleMethodException(exception);
        }
    },

    'athletes.addPreWeight': function addPreWeight(id, date, weight) {
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

    'athletes.addPostWeight': function addPostWeight(id, date, weight) {
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

    'athletes.remove': function removeAthlete(id) {
        Athletes.remove(id);
    },

    'athletes.edit': function editAthlete(id, nm, h, bs, t) {
        Athletes.update(
            { _id: id },
            {
                $set: { name: nm, height: h, baseWeight: bs, teamId: t }
            }
        );
    },

    'athletes.editWeight': function editAthleteWeight(id, date, weight, prePost)
    {
        if(prePost == 'PreWeight')
        {
            Meteor.call('athletes.addPreWeight', id, date, weight);
        }
        else if(prePost == 'PostWeight')
        {
            Meteor.call('athletes.addPostWeight', id, date, weight);
        }
        else
        {
            console.log('Error in weight data editing');
        }
    },
});
