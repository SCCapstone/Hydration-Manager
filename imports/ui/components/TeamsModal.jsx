import React, { Component } from 'react'

export default class TeamsModal extends Component {
  constructor(props){
    super(props)
    this.state={
      team_name: '',
      sport_name: '',
      season: '',
    }
  }

  handleTeamsSubmit(e){
    e.preventDefault()
    let newTeams = this.state
    Meteor.call("teams.insert", newTeams, function(error){
      if(error){
        Bert.alert({
          title: 'Error',
          message: error.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-times'
        })
      }
      else{
        Bert.alert({
          title: 'Team Added',
          message: newTeams.team_name + ' ' + newTeams.sport_name + ' ' + newTeams.season + ' has been added to Teams',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-users'
        })
      }
    })
    this.props.handler()
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card" style={{width: '20rem'}}>
            <div className="card-body">
              <h4 className="card-title">Add New Teams Member</h4>
              <form onSubmit={this.handleTeamsSubmit.bind(this)}>
                <div className="form-group">
                  <label>Team Name</label>
                  <input type="text" className="form-control" value={this.state.team_name}
                         onChange={(e)=>{e.preventDefault(); this.setState({team_name: e.target.value})}} required/>
                </div>
                <div className="form-group">
                  <label>Sport Name</label>
                  <input type="text" className="form-control" value={this.state.sport_name}
                         onChange={(e)=>{e.preventDefault(); this.setState({sport_name: e.target.value})}} required/>
                </div>
                <div className="form-group">
                  <label>Season</label>
                  <input type="text" className="form-control" value={this.state.season}
                         onChange={(e)=>{e.preventDefault(); this.setState({season: e.target.value})}} required/>
                </div>
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button className="btn btn-secondary" onClick={this.props.handler} >Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}