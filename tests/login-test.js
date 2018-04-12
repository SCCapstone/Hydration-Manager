/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('Log In', function () {
  beforeEach(function () {
    server.execute(function () {
      const { Meteor } = require('meteor/meteor');
      const user = Meteor.users.findOne({ 'emails.address': 'john.doe@site.com' });
      if ( user ) {
        Meteor.users.remove(user._id);
      }
    });
  });

  it('should allow us to login @watch', function () {
    server.execute(function () {
      const { Accounts } = require('meteor/accounts-base');
      Accounts.createUser({
        email: 'john.doe@site.com',
        password: 'pswd',
        profile: {
          name: { first: 'John', last: 'Doe' },
        },
      });
    });

    browser.url('http://localhost:3000/login')
           .setValue('[name="emailAddress"]', 'john.doe@site.com')
           .setValue('[name="password"]', 'pswd')
           .submitForm('form');

    // Note: example wait code below (for jumbotron)
    //browser.waitForExist('.jumbotron');
    expect(browser.getUrl()).to.equal('http://localhost:3000/app');
  });
});
