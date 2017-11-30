import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
Teams = new Mongo.Collection("teams");

export default class Home extends TrackerReact(React.Component) {
    teams() {
        return Teams.find().fetch();
    }

    addTeam(event) {
        event.preventDefault(); /*Prevent page from resetting.*/
        const text = this.refs.team.value.trim();

        Teams.insert({
            text: text,
            createdAt: new Date()
        });

        this.refs.team.value = ""; /*Resets text box*/
    }

    render() {
/*        let tm = this.teams();
        console.log(this.teams());*/
        return (
            <div>
                <h1>Teams</h1>
                <form className="new-team" onSubmit={this.addTeam.bind(this)}>
                    <input
                        type="text"
                        ref="team"
                        placeholder="Enter Team Here"
                    />
                </form>
                <div>

                </div>
            </div>
        )
    }
}