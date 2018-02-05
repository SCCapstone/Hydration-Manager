import React from 'react';
import { chai } from 'meteor/practicalmeteor:chai';
import { shallow } from 'enzyme';
import unitTest from './unitTest';
//import sum from './unitTest';

describe("unitTest", function() {
    it("sum", function() {
        // chai.expect(2 + 2).to.equal(4);
        // var result = sum(2+2);
        // chai.assert.equal(result,'4','FeelsGoodMan');
    });
});

//George's Attempt
// describe( 'Add an athlete', function() {
//     it( 'should create a new athlete @watch', function () {
//         browser.url( 'http://localhost:3000/app/masterReport')
//             .setValue('[name="name")', 'Test Guy')
//             .setValue('[name="baseWeight"]', '155')
//             .setValue('[name="height"]', '72')
//             .submitForm('form');
//     })
//
//     var getAthlete = server.execute(function(){
//         const {Athletes} = require('../../imports/api/athletes.jsx');
//         return Athletes.findOne({name:'Test Guy'});
//     })
//
//     expect(getAthlete.name).to.equal('Test Guy');
//
//     afterEach( function() {
//         server.execute( function() {
//             const {Athletes} = require('../../imports/api/athletes.jsx');
//             var athlete = Athletes.findOne( {name: 'Test Guy', baseWeight: '155', height:'72' });
//             if (athlete) {
//                 Athletes.remove( athlete._id );
//             }
//         })
//     })
// });