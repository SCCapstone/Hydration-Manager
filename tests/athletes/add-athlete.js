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