import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
/*import { Teams } from '../../api/teams.jsx';*/
Teams = new Mongo.Collection('teams');
import TeamsForm from './TeamsForm.jsx';
import TeamOne from './TeamOne.jsx';

export default class Home extends TrackerReact(React.Component) {
    teams() {
        return Teams.find().fetch();
    }

    render() {
        let tm = this.teams();
        if(tm.length < 1){
            return (<div>Loading...</div>)
        }
        return (
            <div>
                <h1>Teams</h1>
                <TeamsForm />
                {/*Displayed Teams*/}
                <ul className="teams">
                    {this.teams().map((team)=>{
                        return <TeamOne key={team._id} team={team} />
                    })}
                </ul>
            </div>
        )
    }
}