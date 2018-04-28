//Logs in the user and verifies the user made it to the home page

describe( 'Login', function() {
    it( 'should login @watch', function () {
        browser.url( 'http://localhost:3000/login')
        browser.pause(5000);
        browser.setValue('.email>input', 'hydration@usc.com');
        browser.setValue('.password>input', 'password');
        browser.click('.login');
        browser.pause(5000);
        expect(browser.getUrl()).to.equal('http://localhost:3000/app');
    })
});

describe( 'Enter Weights', function() {
    it( 'should enter weights into the database @watch', function () {
        browser.url( 'http://localhost:3000/app/weightEntry')
        browser.pause(5000);
        browser.click('#PreButton');
        browser.setValue('.dataEntryP7RkS97BFgLi3CHmR>input', 200);
        browser.url('http://localhost:3000/app/masterReport');
        browser.pause(5000);
        expect(browser.getText('#P7RkS97BFgLi3CHmRPreWeight')).to.equal('200.0');
    })
});