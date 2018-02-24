import React from 'react';
import PropTypes from 'prop-types';

import './GenericFooter.scss';

const GenericFooter = ({ children }) => (
  <div className="GenericFooter">
    {children}
  </div>
);

GenericFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GenericFooter;
