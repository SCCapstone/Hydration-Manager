// Package Imports
import {Meteor} from 'meteor/meteor';

// Custom Files and Collections Imports
import Athletes from './Athletes.js';
import handleMethodException from '../../modules/handle-method-exception.js';

Meteor.methods({
    /*Definition for athletes.insert (Server Side Method), will be called by client who will pass through attributes:
    * @Params aName, aWeight, aTeamId
    * This function will create and add a new Athlete to the database.*/
    'athletes.insert': function athletesInsert(aName, aWeight, aTeamId) {
        console.log(aName);
        try {
            return Athletes.insert({
                name: aName,
                baseWeight: aWeight,
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
    'athletes.addPreWeight': function addPreWeight(id, date, weight, sess) {
        Athletes.update(
            {_id: id},
            {$pull: {preWeightData: {date: date}}});
        Athletes.update(
            {_id: id}, {
                $push: {
                    preWeightData: {
                        $each: [{date: date, weight: weight, session: sess}],
                        $sort: {date: -1},
                        $slice: 3 /* To use sort in a push function, you MUST use a %slice (per the 4 errors that popped up)
                                   *
                                   * $slice: <num> ; Where the <num> can be:
                                   * Zero ;	To update the array <field> to an empty array.
                                   * Negative ; To update the array <field> to contain only the last <num> elements.
                                   * Positive ; To update the array <field> contain only the first <num> elements.
                                   *    -anthony
                                  */
                    }
                }
            }
        );
    },
    /* Definition for athletes.addPostWeight (Server Side Method), will be called by client who will pass through attributes:
    * @Params id, date, weight
    * This function will pull the current date of the data change and will update the PostWeight of a particular athlete. */
    'athletes.addPostWeight': function addPostWeight(id, date, weight, sess) {
        Athletes.update(
            {_id: id},
            {$pull: {postWeightData: {date: date}}});
        Athletes.update(
            {_id: id}, {
                $push: {
                    postWeightData: {
                        $each: [{date: date, weight: weight, session: sess}],
                        $sort: {date: -1},
                        $slice: 3 // Must use as $slice when using $each AND $sort
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
    * @Params id, nm (name), bs(baseWeight), t(teamID)
    * This function will update the name, baseWeight, and team of a particular athlete using the corresponding id. */
    'athletes.edit': function editAthlete(id, nm, bs, t) {
        Athletes.update(
            {_id: id}, {
                $set: {name: nm, baseWeight: bs, teamId: t}
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
    'athletes.editWeight': function editAthleteWeight(id, date, weight, prePost) {
        if (prePost === 'PreWeight') {
            Meteor.call('athletes.addPreWeight', id, date, weight);
        }
        else if (prePost === 'PostWeight') {
            Meteor.call('athletes.addPostWeight', id, date, weight);
        }
        else {
            console.log('Error in weight data editing');
        }
    },
    'athlete.generateSMS': function sendSMS() {
        // These are testing credentials only, not real credentials -anthony
        //twilio = Twilio(ACcaad0f31e3a34aac5f13636556bcc746, b56f47d16915b1947c64cdec964b914a);
        let twilio = require('twilio');
        let client = new twilio(ACcaad0f31e3a34aac5f13636556bcc746, b56f47d16915b1947c64cdec964b914a);
        console.log("This should generate an SMS alert");
        //twilio.sendSms({
        client.messages.create({
            body: 'Hello from Node',
            to: '+18039606328',  // Text this number
            from: '+15005550006' // From a valid Twilio number
        }, function (err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "from phone number"
                console.log(responseData.body); // outputs "body of message"
            }
        });
    },
});