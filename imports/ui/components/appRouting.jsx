import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home.jsx';
import WeightEntry from './weightEntry.jsx';
import MasterReport from './masterReport.jsx';
import Alerts from './alerts.jsx';
import Logout from './logout.jsx';
import YourTeams from './yourTeams.jsx';

/* Routing for the main application */

export const AppRouting = ( {match} ) => (
    <div className="col-md-10">
            <Switch>
                <Route exact path='/app' component={Home}/>
                <Route exact path='/app/weightEntry' component={WeightEntry}/>
                <Route path='/app/weightEntry/:teamId' component={WeightEntry}/>
                <Route exact path='/app/masterReport/' component={MasterReport}/>
                <Route path='/app/masterReport/:teamId' component={MasterReport}/>
                <Route path='/app/yourTeams' component={YourTeams}/>
                <Route path='/app/alerts' component={Alerts}/>
                <Route path='/app/logout' component={Logout}/>
            </Switch>
    </div>
)


