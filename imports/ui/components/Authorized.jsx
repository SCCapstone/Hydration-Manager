// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

class Authorized extends React.Component {

    render() {
        const {loggingIn, isAuthorized, component, path, exact, ...rest} = this.props;
        return (
            <Route
                path={path}
                exact={exact}
                render={props => (
                    isAuthorized ?
                        (React.createElement(component, {
                            ...props, ...rest, loggingIn, isAuthorized,
                        })) :
                        // else
                        (<Redirect to="/login"/>)
                )}
            />
        );
    }
}

Authorized.defaultProps = {
    path: '',
    exact: false,
};
Authorized.propTypes = {
    loggingIn: PropTypes.bool.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    path: PropTypes.string,
    exact: PropTypes.bool,
};
export default Authorized;
