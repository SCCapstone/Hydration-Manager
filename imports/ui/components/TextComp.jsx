// Package Imports
import React from 'react';
import PropTypes from 'prop-types';

const TextComp = ({children}) => (
    <div className="TextComp">
        {children}
    </div>
);
TextComp.propTypes = {
    children: PropTypes.node.isRequired,
};
export default TextComp;
