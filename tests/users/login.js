//Logs in the user and verifies the user made it to the home page

describe( 'Login', function() {
    it( 'should login @watch', function () {
        browser.url( 'http://localhost:3000/login')
            .setValue('.email>input', '1234@gmail.com')
            .setValue('.password>input', '1234');
        browser.click('.Login');
        browser.pause(5000);
        expect(browser.getUrl()).to.equal('http://localhost:3000/app');
    })
});