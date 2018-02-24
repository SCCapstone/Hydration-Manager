import React from 'react';
import PropTypes from 'prop-types';

import './TextComp.scss';

const TextComp = ({ children }) => (
  <div className="TextComp">
    {children}
  </div>
);

TextComp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TextComp;
