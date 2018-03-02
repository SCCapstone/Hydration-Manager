// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import {Roles} from 'meteor/alanning:roles';

// Custom File Imports
import getUserName from '../../../modules/get-user-name';
import WeightEntry from '../../pages/weightEntry.jsx';
import MasterReport from '../../pages/masterReport.jsx';
import AthleteReport from '../../pages/athleteReport.jsx';
import Alerts from '../../pages/alerts.jsx';
import YourTeams from '../../pages/yourTeams.jsx';
import LoginAlt from '../../pages/LoginAlt/LoginAlt.js';
import Registration from '../../pages/Registration/Registration.js';
import NotFound from '../../pages/NotFound/NotFound.js';
import Navigation from '../../components/Navigation/Navigation.js';
import Public from '../../components/Public/Public.js';
import Authorized from '../../components/Authorized/Authorized.js';
import AppFooter from '../../components/AppFooter/AppFooter.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        //this.state = { routePastLogin: null };
        autoBind(this);  //binds class methods to the component instance
    }

    render() {
        const {props} = this;
        return (

            <BrowserRouter>
                {!props.loading ? (
                    <div >

                        {props.isAuthorized ?

                            <Navigation {...props} />
                            : ''}
                      <div className="AppContent">
                        <Switch>

                          <Public exact path="/" component={LoginAlt} {...props} />
                          <Public exact path="/login" component={LoginAlt} {...props} />
                          <Public exact path="/registration" component={Registration} {...props} />

                          <Authorized exact path="/app" component={WeightEntry} {...props} />
                          <Authorized exact path='/app/weightEntry' component={WeightEntry} {...props} />
                          <Authorized path='/app/weightEntry/:teamId' component={WeightEntry} {...props} />
                          <Authorized exact path='/app/masterReport/' component={MasterReport} {...props} />
                          <Authorized path='/app/masterReport/:teamId' component={MasterReport} {...props} />
                          <Authorized path='/app/athlete/:athleteId' component={AthleteReport} {...props} />
                          <Authorized exact path='/app/yourTeams' component={YourTeams} {...props} />
                          <Authorized exact path='/app/alerts' component={Alerts} {...props} />

                          <Route component={NotFound}/>
                            {/*

                <Route exact path="/" component={LoginAlt} />
                <Route exact path="/login" component={LoginAlt} />
                <Route exact path="/registration" component={Registration} />

                <Authorized exact path="/app" component={Home} {...props} {...state}/>
                <Authorized exact path='/app/weightEntry' component={WeightEntry} {...props} />
                <Authorized path='/app/weightEntry/:teamId' component={WeightEntry} {...props} />
                <Authorized exact path='/app/masterReport/' component={MasterReport} {...props} />
                <Authorized path='/app/masterReport/:teamId' component={MasterReport} {...props} />
                <Authorized exact path='/app/yourTeams' component={YourTeams} {...props} />
                <Authorized exact path='/app/alerts' component={Alerts} {...props} />

                <Authorized path='/app/admin' component={AdminDash} {...props} {...state}/>
                <Authorized path='/app/admin/:userId' component={Alerts} {...props} {...state}/>



                <Route path="/logout" render={routeProps => <Logout {...routeProps} />} {...props} {...state} />
                <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
                <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
                <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
                <Route name="terms" path="/terms" component={Terms} />
                <Route name="privacy" path="/privacy" component={Privacy} />
                <Route component={NotFound} />
                */}
                        </Switch>
                      </div>
                    </div>
                ) : ''}
            </BrowserRouter>

        );

    }
}

App.defaultProps = {
    userId: '',
    emailAddress: '',
};

// Type checking props pushed to component
App.propTypes = {
    userId: PropTypes.string,
    emailAddress: PropTypes.string,
    emailVerified: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    userRoles: PropTypes.array
};

// Data from the server pushed to main app component
export default withTracker(() => {
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();
    const loading = !Roles.subscription.ready();
    // &&'s below - > returns furthest right "truthy" value
    const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
    const emailAddress = user && user.emails && user.emails[0].address;

    return {
        loading,
        loggingIn,
        isAuthorized: !loggingIn && !!userId,
        name: name || emailAddress,
        userId,
        emailAddress,
        emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
        userRoles: !loading ? Roles.getRolesForUser(userId) : [], //!loading && Roles.getRolesForUser(userId),
    };
})(App);
