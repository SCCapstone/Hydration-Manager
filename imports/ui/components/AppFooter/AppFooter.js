import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './AppFooter.scss';

const AppFooter = () => (
  <div className="AppFooter">
    <Grid>
      <p className="pull-left">&copy; 2017-2018 Hydration Manager</p>
      <ul className="pull-right">
        <li><Link to="/terms">Terms of Service </Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
      </ul>
    </Grid>
  </div>
);

AppFooter.propTypes = {};

export default AppFooter;
