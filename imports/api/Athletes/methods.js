// Package Imports
import { Meteor } from 'meteor/meteor';

// Custom Files and Collections Imports
import Athletes from './Athletes.js';
import handleMethodException from '../../modules/handle-method-exception.js';

Meteor.methods({
    /*Definition for athletes.insert (Server Side Method), will be called by client who will pass through attributes:
    * @Params aName, aWeight, aHeight, aTeamId
    * This function will create and add a new Athlete to the database.*/
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

    /* Definition for athletes.addPreWeight (Server Side Method), will be called by client who will pass through attributes:
    * @Params id, date, weight
    * This function will pull the current date of the data change and will update the PreWeight of a particular athlete. */
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
    /* Definition for athletes.addPostWeight (Server Side Method), will be called by client who will pass through attributes:
    * @Params id, date, weight
    * This function will pull the current date of the data change and will update the PostWeight of a particular athlete. */
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
    /* Definition for athletes.remove (Server Side Method), will be called by client who will pass through attributes:
    * @Params id
    * This function will remove the athlete with the corresponding id passed through*/
    'athletes.remove': function removeAthlete(id) {
        Athletes.remove(id);
    },
    /* Definition for athletes.edit (Server Side Method), will be called by client who will pass through attributes:
    * @Params id, nm (name), h(height), bs(baseWeight)
    * This function will update the name, height, and baseWeight of a particular athlete using the corresponding id. */
    'athletes.edit': function editAthlete(id, nm, h, bs) {
        Athletes.update(
            { _id: id },
            {
                $set: { name: nm, height: h, baseWeight: bs }
            }
        );
    },
    /* Definition for athletes.editWeight (Server Side Method), will be called by client who will pass through attributes:
    * @Params id, date, weight, prePost
    * This function will edit a particular athlete's weight according to his/her corresponding weight.
    * Checks if prePost is equal to PreWeight or PostWeight:
    *   - If prePost is equal to PreWeight, 'athletes.addPreWeight' function is called.
    *   - If prePost is equal to PostWeight, 'athletes.addPostWeight' function is called.
    *   - Anything else happens an error message is sent to the console. */
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
