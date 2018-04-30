import {Meteor} from 'meteor/meteor';


if (Meteor.isServer)
{
    SyncedCron.stop();

    SyncedCron.add({
        name: 'Send daily report text',
        schedule: function(parser) {
            return parser.text('at 7:01 pm');
        },
        job: function() {
            //TODO: Send Text
            console.log('Testing SyncedCron');
        }
    });

    SyncedCron.start();
}