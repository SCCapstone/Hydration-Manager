import React from 'react';
import { shallow } from "enzyme";
import { Random } from 'meteor/random';
import { AthletesCollection } from './Athletes';
import { methods } from '../Athletes/methods.js';

if(Meteor.isClient) return false;
const userId = Random.id();
const randTeamId = Random.id();
let athleteId;

describe('Athlete Server Test', function(){
    describe('Running the basics', function(){
        it('Server Running', function(){});
        it('Can see collection', function(){});
    });
    describe('Testing Methods...', function(){
        it('Athlete Insert function', function(){});
        it('Athlete Edit function', function(){});

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

        it('Athlete Delete function', function(){
            // const deleteAthlete = Meteor.server.method_handlers['athletes.remove'];
            // const invocation = { userId };
            //
            // deleteAthlete.apply(invocation, [athleteId]);
            //
            // assert.equal(Athletes.find().count, 0);
        });
    });
});
