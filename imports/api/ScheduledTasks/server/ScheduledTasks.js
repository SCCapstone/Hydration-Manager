import {Meteor} from 'meteor/meteor';
import Athletes from '../../Athletes/Athletes.js';

if (Meteor.isServer) {
    SyncedCron.add({
        name: 'Send daily report text',
        schedule: function (parser) {
            return parser.text('at 9:00 pm');
        },
        job: function () {

            let userList = Meteor.users.find({"profile.daily": true}).fetch();
            //console.log(userList);
            console.log(userList.length);
            let athletes = [];

            for (let n = 0; n < userList.length; n++) {
                let k = 0;
                for (let i = 0; i < userList[n].profile.teamAccess.length; i++) {
                    if (userList[n].profile.teamAccess[i] !== undefined) {
                        let athletes2 = Athletes.find({"teamId": userList[n].profile.teamAccess[i]}).fetch();
                        for (let j = 0; j < athletes2.length; j++) {
                            athletes[k] = athletes2[j];
                            k++;
                        }
                    }
                }
                let message = "Daily Report from Hydration Manager\n";
                let redAthletes = "Red Athletes:\n";
                let yellowAthletes = "Yellow Athletes:\n";

                for (let i = 0; i < athletes.length; i++) {
                    if ((athletes[i] !== undefined) && (athletes[i].preWeightData[0] !== undefined && athletes[i].postWeightData[0] !== undefined) && (athletes[i].preWeightData[0].date === athletes[i].postWeightData[0].date)) {
                        let hydration = ((athletes[i].preWeightData[0].weight - athletes[i].postWeightData[0].weight) / athletes[i].preWeightData[0].weight) * 100;
                        if (hydration <= -4 || hydration >= 4) {
                            redAthletes += athletes[i].name + " " + Number.parseFloat(hydration).toPrecision(4) + "\n";
                        }
                        if ((hydration > -4 && hydration < -3) || (hydration > 3 && hydration < 4)) {
                            yellowAthletes += athletes[i].name + " " + Number.parseFloat(hydration).toPrecision(4) + "\n";
                        }
                    }
                }
                message += redAthletes + "\n" + yellowAthletes;

                // const ACCOUNT_SID = 'ACcaad0f31e3a34aac5f13636556bcc746'; // Test Credentials
                // const AUTH_TOKEN = 'b56f47d16915b1947c64cdec964b914a';    // Test Credentials

                const ACCOUNT_SID = 'AC531f960278ec72ecacc6851e928857c3';
                const AUTH_TOKEN = '8264c6876d21e70d9d27b93316ac1313';

                let twilio = require('twilio');
                let client = new twilio(ACCOUNT_SID, AUTH_TOKEN);
                client.messages.create({
                    to: '+' + userList[n].profile.phone,
                    from: '+18036368598', // this is OUR twilio number. $1.00 a month. This will need to stay this hardcoded value.
                    // from: '+15005550006', // This is a twilio TEST number
                    body: message,
                }, function (err, responseData) { //this function is executed when a response is received from Twilio
                    if (!err) {
                        console.log("Texting a message from " + responseData.from); // outputs "from phone number"
                        console.log("To " + responseData.to);
                        console.log("The message " + responseData.body); // outputs "body of message"
                    }
                });

            }
        }
    });
    SyncedCron.start();
}