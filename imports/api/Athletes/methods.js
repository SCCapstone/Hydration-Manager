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
        //console.log("Athlete created: "+aName);
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
    'athletes.addPreWeight': function addPreWeight(id, date, weight) {
        Athletes.update(
            {_id: id},
            {$pull: {preWeightData: {date: date}}});
        Athletes.update(
            {_id: id}, {
                $push: {
                    preWeightData: {
                        $each: [{date: date, weight: weight}],
                        $sort: {date: -1},
                        /*$slice: 3 /* To use sort in a push function, you MUST use a %slice (per the 4 errors that popped up)
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
    'athletes.addPostWeight': function addPostWeight(id, date, weight) {
        Athletes.update(
            {_id: id},
            {$pull: {postWeightData: {date: date}}});
        Athletes.update(
            {_id: id}, {
                $push: {
                    postWeightData: {
                        $each: [{date: date, weight: weight}],
                        $sort: {date: -1},
                        //$slice: 3 // Must use as $slice when using $each AND $sort
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
    /* Definition for athletes.generateSMS (Server Side Method), will be called by client who will pass through attributes:
    * @Params athleteName, hydrationStatus
    * This function will generate an SMS alert if:
     * an athlete triggers a 'red' alert status based on the latest pre/post weight entered,
     * ....
     * */
    'athletes.generateSMS': function sendSMS(athName, hydrate, color) {
        // These are TESTING CREDENTIALS only, not real credentials;
        // We would need to change these values to the real credentials once we set up billing.  -anthony
        let twilio = require('twilio');
        const ACCOUNT_SID = 'ACcaad0f31e3a34aac5f13636556bcc746';
        const AUTH_TOKEN = 'b56f47d16915b1947c64cdec964b914a';

        //const ACCOUNT_SID = 'AC531f960278ec72ecacc6851e928857c3';
        //const AUTH_TOKEN = '8264c6876d21e70d9d27b93316ac1313';
        let client = new twilio(ACCOUNT_SID, AUTH_TOKEN);
        //console.log("This should generate an SMS alert");
        //twilio.sendSms({
        client.messages.create({
            body: athName+' has generated a `'+color+'` alert status with a hydration value of '+hydrate,
            to: '+18038602200',  // Text this number ; We will need to transition this to a variable that contains the 'head-admin's phone #'
            //from: '+18036368598' // this is OUR twilio number. $1.00 a month. This will need to stay this hardcoded value.
            from: '+15005550006' // This is a twilio test number
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