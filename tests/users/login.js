//Logs in the user and verifies the user made it to the home page

describe( 'Login', function() {
    it( 'should login @watch', function () {
        browser.url( 'http://localhost:3000/login')
            .setValue('.email', 'admin@admin.com')
            .setValue('.password', 'password');
        browser.click('.login');
        browser.pause(5000);
        expect(browser.getUrl()).to.equal('http://localhost:3000/app');
    })
});