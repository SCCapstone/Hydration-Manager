import React from 'react';
import { shallow } from "enzyme";
import { Teams } from './Teams';
/*import { TeamsMethods } from '../Teams/methods.js';*/
import { Random } from 'meteor/random';

let aName, aWeight, aTeamId;


if(Meteor.isServer) return true;

describe('Team Server Test', function(){
    describe('Running the basics', function(){
        it('Server Running', function(){});
        it('Can See Teams Collection', function(){});
    });
    describe('Testing Methods...', function(){
        it(' Team Insert function', function(){});
        it(' Team Edit function', function(){});
        it(' Team Remove function', function(){});
    });
});
