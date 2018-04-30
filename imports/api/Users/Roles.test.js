import React from 'react';
import { shallow } from "enzyme";
import { Roles } from './roles';
/*import { UserMethods } from '../server/methods.js';*/
import { Random } from 'meteor/random';

/* By default the test will run as both a server and client,
    I set the test report as a server */
if(Meteor.isClient) return false;

/*Roles Collection Testing*/
describe('Roles Server Test', function(){
    //Initial Checks
    describe('Running the basics', function(){
        //Check to see if Server is running
        it('Server Running', function(){});
        //Check to see if Roles collection exists
        it('Can See Roles collection', function(){});
    });

    //For Testing Database Methods
    describe('Testing Methods...', function(){
        //Testing the addition of a role
        it(' Add New Role function', function(){});
        //Testing the changes to roles
        it(' Roles Change function', function(){});

    });
});
