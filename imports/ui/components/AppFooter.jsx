// Package Imports
import React from 'react';
import {Grid} from 'react-bootstrap';

const AppFooter = () => (
    <div className="AppFooter">
        <Grid>
            <p className="pull-left">&copy; Hydration Manager</p>
        </Grid>
    </div>
);
AppFooter.propTypes = {};
export default AppFooter;
/*  <ul className="pull-right">
    <li><Link to="/terms">Terms of Service </Link></li>
    <li><Link to="/privacy">Privacy Policy</Link></li>
    </ul>
    Neither of these pages currently implemented, removing access to click them so no 404 errors. -anthony
*/
