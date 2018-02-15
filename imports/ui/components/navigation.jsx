import React from 'react'
import { NavLink, Link } from 'react-router-dom'

/* Side navigation bar for the application */

export const Navigation = () => (
    <div className="nav-sidebar col-md-2 hidden-sm">
        <ul className="nav nav-pills nav-stacked">
            <li><NavLink to = '/app'>Home</NavLink></li>
            <li><NavLink to = '/app/weightEntry'>Weight Entry</NavLink></li>
            <li><NavLink to = '/app/masterReport'>Master Report</NavLink></li>
            <li><NavLink to = '/app/yourTeams'>Your Teams</NavLink></li>
            <li><NavLink to = '/app/alerts'>Alerts</NavLink></li>
            <li><Link to = '/app/logout'>Logout</Link></li>
        </ul>
    </div>
)