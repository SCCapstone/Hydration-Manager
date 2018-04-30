//Logs in the user and verifies the user made it to the home page

describe('Login', function () {
    it('should login @watch', function () {
        browser.url('http://localhost:3000/login')
        browser.pause(5000);
        browser.setValue('.email>input', 'hydration@usc.com');
        browser.setValue('.password>input', 'password');
        browser.click('.login');
        browser.pause(5000);
        expect(browser.getUrl()).to.equal('http://localhost:3000/app');
    })
});

describe('Create and Delete an Athlete', function () {
    it('should create an athlete and confirm they show up in the master report @watch', function () {
        browser.url('http://localhost:3000/app/masterReport');
        browser.pause(5000);
        browser.click('#createAthleteButton');
        browser.setValue('#createAthleteName', 'TESTING');
        browser.setValue('#createAthleteWeight', '100');
        browser.click('#createAthleteModalButton');
        browser.url('http://localhost:3000/app/masterReport');
        browser.pause(5000);
        expect(browser.getText('.athleteTESTING')).to.equal('TESTING');
        browser.url('http://localhost:3000/app/masterReport');
        browser.pause(5000);
        browser.click('.athleteTESTING');
        browser.pause(5000);
        browser.click('.editAthleteButton');
        browser.click('#openDelete');
        browser.click('#confirmDelete');
        browser.pause(5000);
        expect(browser.getUrl()).to.equal('http://localhost:3000/app/masterReport/');
    })
});

describe('Enter Weights', function () {
    it('should enter a weight and confirm that it shows up in the master report @watch', function () {
        browser.url('http://localhost:3000/app/weightEntry');
        browser.pause(5000);
        browser.click('#PreButton');
        browser.setValue('.dataEntryP7RkS97BFgLi3CHmR>input', 200);
        browser.url('http://localhost:3000/app/masterReport');
        browser.pause(5000);
        expect(browser.getText('#P7RkS97BFgLi3CHmRPreWeight')).to.equal('200.0');
    })
});

describe('Edit Athlete Information', function () {
    it('should enter a weight and confirm that it shows up in the master report @watch', function () {
        browser.url('http://localhost:3000/app/athlete/P7RkS97BFgLi3CHmR');
        browser.pause(5000);
        browser.click('.editAthleteButton');
        browser.setValue('.athleteNameInput', 'Sample Guy');
        browser.setValue('.athleteBaseInput', '205.0');
        browser.click('.athleteTeamSelect');
        browser.pause(5000);
        browser.click('#ogE6RPnzSomNQjoEP');
        browser.pause(5000);
        browser.click('.modalEditButton');
        browser.pause(2000);
        expect(browser.getText('.athleteInfo')).to.equal('Sample Guy - Football 2018 - 205.0');
    })
});

describe('Navigate to Team Page', function () {
    it("should navigate to the team's master report page after clicking on team @watch", function () {
        browser.url('http://localhost:3000/app/yourTeams');
        browser.pause(5000);
        browser.click('.ogE6RPnzSomNQjoEPcard');
        expect(browser.getUrl()).to.equal('http://localhost:3000/app/masterReport/ogE6RPnzSomNQjoEP');
    })
});