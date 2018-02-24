import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Public = ({
  loggingIn, isAuthorized, component, path, exact, ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      !isAuthorized ?
        (React.createElement(component, {
          ...props, ...rest, loggingIn, isAuthorized,
        })) :
        (<Redirect to={'/app'} />)
    )}
  />
);

Public.defaultProps = {
  path: '',
  exact: false,
};

Public.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

export default Public;
