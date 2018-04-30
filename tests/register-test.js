/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Register', function () {
    beforeEach(function () {
        server.execute(function () {
            const {Meteor} = require('meteor/meteor');
            const user = Meteor.users.findOne({'emails.address': 'john.doe@site.com'});
            if (user) {
                Meteor.users.remove(user._id);
            }
        });
    });


    it('should create a new user & login, then redirect to /app @watch', function () {
        browser.url('http://localhost:3000/registration')
        // .setValue('[name="firstName"]', 'John')
        // .setValue('[name="lastName"]', 'Doe')
            .setValue('[name="emailAddress"]', 'john.doe@site.com')
            .setValue('[name="password"]', 'password')
            .setValue('[name="password_confirm"]', 'password')
            .submitForm('form');

        // Note: example wait code below (for jumbotron)
        //browser.waitForExist('.jumbotron');
        expect(browser.getUrl()).to.equal('http://localhost:3000/app');
    });
});
