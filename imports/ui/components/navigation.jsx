import React, {Component} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
/* Side navigation bar for the application */

export default class Navigation extends Component {

    constructor () {
        super()
        this.state = {
            isHidden:true
        }
    }
    //Code sidebar appearance and disappearance
    toggleVisible() {
        var x = document.getElementById("pageNavigation");
        x.classList.toggle(".visible-xs-*");
        x.classList.toggle("hidden-xs");
    }
    render() {
        let style = {
            float: 'right'
        };
        let visble = {

        }
        let hidden = {

        }
        return (
            <div className = "NavClass">
                <Button type="button" onClick={this.toggleVisible}><Glyphicon glyph="align-justify"/> Menu</Button>
                <ul id= "pageNavigation" className= "nav-sidebar">
                    <li><h3>Hydration Manager</h3></li>
                    <li><NavLink to = '/app' onClick={this.toggleVisible}>Home</NavLink></li>
                    <li><NavLink to = '/app/weightEntry' onClick={this.toggleVisible}>Weight Entry</NavLink></li>
                    <li><NavLink to = '/app/masterReport' onClick={this.toggleVisible}>Master Report</NavLink></li>
                    <li><NavLink to = '/app/yourTeams' onClick={this.toggleVisible}>Your Teams</NavLink></li>
                    <li><NavLink to = '/app/alerts' onClick={this.toggleVisible}>Alerts</NavLink></li>
                    <li style={style}><Link to = '/app/logout' onClick={this.toggleVisible}>Logout</Link></li>
                </ul>
            </div>
        )
    }
}