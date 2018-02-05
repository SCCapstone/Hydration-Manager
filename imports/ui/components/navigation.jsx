import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Col from 'muicss/lib/react/col';

/* Side navigation bar for the application */

export const Navigation = () => (
    <Col sm = "2">
        <ul className="nav nav-pills nav-stacked">
            <li><NavLink to = '/app'>Home</NavLink></li>
            <li><NavLink to = '/app/weightEntry'>Weight Entry</NavLink></li>
            <li><NavLink to = '/app/masterReport'>Master Report</NavLink></li>
            <li><NavLink to = '/app/yourTeams'>Your Teams</NavLink></li>
            <li><NavLink to = '/app/alerts'>Alerts</NavLink></li>
            <li><Link to = '/app/logout'>Logout</Link></li>
        </ul>
    </Col>
)