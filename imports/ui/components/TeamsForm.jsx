import React, { Component } from 'react';

export default class TeamsForm extends Component{
    addTeam(event) {
        event.preventDefault(); /*Prevent page from resetting.*/
        const NameOfTeam = this.refs.team.value;
        const NameOfSport = this.refs.team.value;
        const SeasonYear = this.ref.team.value;

        console.log(NameOfSport);
        console.log(NameOfTeam);
        Meteor.call('addTeam', NameOfTeam, NameOfSport, SeasonYear, ()=>{
            /*this.refs.team.value = ""; *//*Resets text box*/
        });
    }


    render() {
        return(
            <form className="new-team" onSubmit={this.addTeam.bind(this)}>
                <div>
                    <label className={"Team-Label"}>
                    <input
                        type="text"
                        ref="NameOfTeam"
                        placeholder="Enter Team Here"
                    /> <br />
                    <input
                        type="text"
                        ref="SportPlayed"
                        placeholder="Enter Sport Here"
                    /> <br />
                    <input
                        type="text"
                        ref="Season"
                        placeholder={"Enter Season"}
                    />
                    </label>
                </div>
                <div>
                    <button className="submit-team" onClick={this.addTeam.bind(this)}>Submit</button>
                </div>
            </form>
        )
    }
}