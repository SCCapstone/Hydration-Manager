import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './home.jsx';
import WeightEntry from './weightEntry.jsx';
import MasterReport from './masterReport.jsx';
import Alerts from './alerts.jsx';
import Logout from './logout.jsx';

/* Routing for the main application */

export const AppRouting = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/weightEntry' component={WeightEntry}/>
            <Route path='/masterReport' component={MasterReport}/>
            <Route path='/alerts' component={Alerts}/>
            <Route path='/logout' component={Logout}/>
        </Switch>
    </main>
)