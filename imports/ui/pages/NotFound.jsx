// Package Imports
import React from 'react';
import {Alert} from 'react-bootstrap';

/* Page Not Found component*/
const NotFound = () => (
  <div className="NotFound">
    <Alert bsStyle="danger">
      <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
    </Alert>
  </div>
);

export default NotFound;
