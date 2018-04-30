import React from 'react';
import { shallow } from "enzyme";
import { Roles } from './roles';
/*import { UserMethods } from '../server/methods.js';*/
import { Random } from 'meteor/random';

if(Meteor.isClient) return false;

describe('Team Server Test', function(){
    describe('Running the basics', function(){
        it('Server Running', function(){});
        it('Can See Roles collection', function(){});
    });
    describe('Testing Methods...', function(){
        it(' Add New Role function', function(){});
        it(' Roles Change function', function(){});

    });
});
