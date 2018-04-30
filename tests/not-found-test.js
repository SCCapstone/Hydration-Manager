/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

describe('404 Error', function () {
    it('should render a 404 for a non-existent route @watch', function () {
        browser.url('http://localhost:3000/nowhere')
            .waitForExist('.alert-danger');

        // Following: based on routing to NotFound page
        expect(browser.getText('.alert-danger p')).to.equal('Error [404]: /nowhere does not exist.');
    });
});


/*********** NOTE: fix {window.location.pathname} *************/
