import React from 'react';
import {shallow} from "enzyme";
import {Random} from 'meteor/random';
import {AthletesCollection} from './Athletes';
import {methods} from '../Athletes/methods.js';

/* By default the test will run as both a server and client,
    I set the test report as a server */
if (Meteor.isClient) return false;

const userId = Random.id();
const randTeamId = Random.id();
let athleteId;

/*Athlete Collection Testing*/
describe('Athlete Server Test', function () {
    //Initial Checks
    describe('Running the basics', function () {
        //Check to see if Server is running
        it('Server Running', function () {
        });
        //Check to see if Roles collection exists
        it('Can see collection', function () {
        });
    });

    //For Testing Database Methods
    describe('Testing Methods...', function () {
        //Testing the addition of an athlete
        it('Athlete Insert function', function () {
        });
        //Testing the edit of an athlete
        it('Athlete Edit function', function () {
        });

        // beforeEach(() => {
        //     AthletesCollection.remove({});
        //     athleteId = AthletesCollection.insert({
        //         name: 'Lexie Brown',
        //         baseWeight: '160',
        //         height: '69',
        //         createdAt: new Date(),
        //         teamId: randTeamId,
        //     });
        // });

        //Testing the deletion of an athlete
        it('Athlete Delete function', function () {
            // const deleteAthlete = Meteor.server.method_handlers['athletes.remove'];
            // const invocation = { userId };
            //
            // deleteAthlete.apply(invocation, [athleteId]);
            //
            // assert.equal(Athletes.find().count, 0);
        });
    });
});
