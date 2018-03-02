// Package Imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Custom File Imports
import WeightEntry from '../imports/ui/pages/weightEntry.jsx';
import MasterReport from '../imports/ui/pages/masterReport.jsx';
import AthleteReport from '../imports/ui/pages/athleteReport';
import Alerts from '../imports/ui/pages/alerts.jsx';
import Logout from './logout.jsx';
import YourTeams from '../imports/ui/pages/yourTeams.jsx';

/* Routing for the main application */

export const AppRouting = ( {match} ) => (
    <div>
            <Switch>
                <Route exact path='/app/weightEntry' component={WeightEntry}/>
                <Route path='/app/weightEntry/:teamId' component={WeightEntry}/>
                <Route exact path='/app/masterReport/' component={MasterReport}/>
                <Route path='/app/masterReport/:teamId' component={MasterReport}/>
                <Route path='/app/athlete/:athleteId' component={AthleteReport}/>
                <Route path='/app/yourTeams' component={YourTeams}/>
                <Route path='/app/alerts' component={Alerts}/>
                <Route path='/appalerts/:teamId' component={Alerts}/>
                <Route path='/app/logout' component={Logout}/>
            </Switch>
    </div>
)


