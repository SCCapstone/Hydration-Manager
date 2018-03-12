// Package Imports
import React from 'react';
import PropTypes from 'prop-types';


const GenericFooter = ({ children }) => (
  <div className="GenericFooter">
    {children}
  </div>
);

GenericFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GenericFooter;
