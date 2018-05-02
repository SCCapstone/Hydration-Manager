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
    it('should create and delete an athlete @watch', function () {
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
        browser.setValue('.dataEntrydZFEDH2GY6aM3i3Lm>input', 200);
        browser.pause(5000);
        browser.url('http://localhost:3000/app/masterReport');
        browser.pause(5000);
        expect(browser.getText('#dZFEDH2GY6aM3i3LmPreWeight')).to.equal('200.0');
    })
});

describe('Edit Athlete Information', function () {
    it('should edit an athlete @watch', function () {
        browser.url('http://localhost:3000/app/athlete/dZFEDH2GY6aM3i3Lm');
        browser.pause(5000);
        browser.click('.editAthleteButton');
        browser.setValue('.athleteNameInput', 'Sample Guy');
        browser.setValue('.athleteBaseInput', '205.0');
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
        browser.click('.rC2NhZDfchaCRoxMEcard');
        expect(browser.getUrl()).to.equal('http://localhost:3000/app/masterReport/rC2NhZDfchaCRoxME');
    })
});