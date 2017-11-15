import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

export const Navigation = () => (
    <Col sm = "2">
        <ul className="nav nav-pills nav-stacked">
            <li><NavLink to = '/'>Home</NavLink></li>
            <li><NavLink to = '/weightEntry'>Weight Entry</NavLink></li>
            <li><NavLink to = '/masterReport'>Master Report</NavLink></li>
            <li><NavLink to = '/alerts'>Alerts</NavLink></li>
            <li><Link to = '/logout'>Logout</Link></li>
        </ul>
    </Col>
)