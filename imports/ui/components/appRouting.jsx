import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home.jsx';
import WeightEntry from './weightEntry.jsx';
import MasterReport from './masterReport.jsx';
import Alerts from './alerts.jsx';
import Logout from './logout.jsx';
import yourTeams from './Teams.jsx';
import Users from './Users'
import NotFound from './NotFound'

/* Routing for the main application */

export const AppRouting = ( {match} ) => (
    <div className="col-md-10">
            <Switch>
                <Route exact path='/app' component={Home}/>
                <Route exact path='/app/weightEntry' component={WeightEntry}/>
                <Route path='/app/weightEntry/:teamId' component={WeightEntry}/>
                <Route exact path='/app/masterReport/' component={MasterReport}/>
                <Route path='/app/masterReport/:teamId' component={MasterReport}/>
                <Route path='/app/users' component={Users}/>
                <Route exact path='/app/yourTeams' component={yourTeams}/>
                <Route path='/app/alerts' component={Alerts}/>
                <Route path='/app/logout' component={Logout}/>
                <Route component={ NotFound }/>
            </Switch>
    </div>
)


