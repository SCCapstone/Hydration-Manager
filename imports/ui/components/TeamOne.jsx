import React, { Component } from 'react';

export default class TeamOne extends Component {
    removeThisTeam(){
        Teams.remove(this.props.team._id);
    }
    updateThisTeam() {
        Teams.update(this.props.team.NameOfTeam);
    }

    render() {
        return(
            <li>
                {this.props.team.NameOfTeam}
                {this.props.team.NameOfSport}
                {this.props.team.Season}
                <button className="update" onClick={this.updateThisTeam.bind(this)}>
                    Update
                </button>
                <button className="delete" onClick={this.removeThisTeam.bind(this)}>
                    Remove
                </button>
            </li>
        )
    }
}
