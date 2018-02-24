import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import getUserName from '../../../modules/get-user-name';

// import Home from '../../components/home.jsx';
// import WeightEntry from '../../components/weightEntry.jsx';
// import MasterReport from '../../components/masterReport.jsx';
// import AthleteReport from '../../components/athleteReport.jsx';
// import Alerts from '../../components/alerts.jsx';
// import Logout from '../../components/logout.jsx';
// import YourTeams from '../../components/yourTeams.jsx';

import LoginAlt from '../../pages/LoginAlt';
// import Registration from '../../pages/Registration';
// import NotFound from '../../pages/NotFound';
//import AdminDash from '../../pages/AdminDash';

// import VerifyEmailAlert from '../../components/VerifyEmailAlert';
// import Navigation from '../../components/Navigation';
// import Authorized from '../../components/Authorized';
// import AppFooter from '../../components/AppFooter';

//import './App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { routePastLogin: null };
    autoBind(this);  //binds class methods to the component instance
  }

  render() {
    const { props } = this;  //const { props, state } = this;
    return (
      <BrowserRouter>

        //Delay b/w server data pushed to client,
        // avoid inadvertently showing unauthorized components
        //{!props.loading ? (
          <div className="App">

            // {props.isAuthorized ?
            //   // // Alert user if email unverified
            //   // <VerifyEmailAlert
            //   //   userId={props.userId}
            //   //   emailVerified={props.emailVerified}
            //   //   emailAddress={props.emailAddress}
            //   // />
            //   <Navigation {...props} />
            //   : ''}


            //Grid: wraps each route's component it renders in a <div className="container"></div> element
            <Grid>
              <Switch>
                // Start Page: Login/LandingPage
                //<Route exact path="/" component={Login} />
                <Route exact path="/" component={LoginAlt} />
                // <Route exact path="/registration" component={Registration} />

                // <Authorized exact path="/app" component={Home} {...props} {...state}/>
                // <Authorized exact path='/app/weightEntry' component={WeightEntry} {...props} />
                // <Authorized path='/app/weightEntry/:teamId' component={WeightEntry} {...props} />
                // <Authorized exact path='/app/masterReport/' component={MasterReport} {...props} />
                // <Authorized path='/app/masterReport/:teamId' component={MasterReport} {...props} />
                // <Authorized exact path='/app/yourTeams' component={YourTeams} {...props} />
                // <Authorized exact path='/app/alerts' component={Alerts} {...props} />

                //Admin routeProps
                //<Authorized path='/app/admin' component={AdminDash} {...props} {...state}/>
                //<Authorized path='/app/admin/:userId' component={Alerts} {...props} {...state}/>

                // <Public path="/registration" component={Registration} {...props} {...state} />
                // <Public path="/login" component={Login} {...props} {...state} />

                // <Route path="/logout" render={routeProps => <Logout {...routeProps} />} {...props} {...state} />
                // <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
                // <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
                // <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
                // <Route name="terms" path="/terms" component={Terms} />
                // <Route name="privacy" path="/privacy" component={Privacy} />
                //<Route component={NotFound} />
              </Switch>
            </Grid>
            //<AppFooter/>
          </div>
        //) : ''}  //end of: {!props.loading ?
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
  userRoles: PropTypes.Array
};

// Data from the server pushed to main app component
export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  // &&'s below - > returns furthest left "truthy" value
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    isAuthorized: !loggingIn && !!userId,
    name: name || emailAddress,
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails /*&& user.emails[0].verified*/ : true,
    userRoles: !loading && Roles.getRolesForUser(userId),
  };
})(App);
