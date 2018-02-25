
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Athletes from './Athletes.js';
import handleMethodException from '../../modules/handle-method-exception.js';

Meteor.methods({
    'athletes.insert': function athletesInsert(aName,aWeight,aHeight,aTeamId) {
        // check(doc, {
        //   name: String,
        //   season: String,
        //   id: String,
        // });
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
            { $pull: {ostWeightData: {date:date} }});

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

});
