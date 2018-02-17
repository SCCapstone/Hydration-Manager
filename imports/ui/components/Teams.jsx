import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import { TeamsCollection } from '/imports/api/TeamsCollection'
import TeamsModal from '/imports/ui/components/TeamsModal'

class Teams extends Component {
  constructor(props){
    super(props)
    this.state={
      isCreatingTeams: false
    }
    this.toggleCreateState = this.toggleCreateState.bind(this)
  }

  renderTeamsTable(){
    let teams = this.props.teams

    return teams.map((member, index) => (
      <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{member.team_name}</td>
          <td>{member.sport_name}</td>
          <td>{member.season}</td>
      </tr>
    ))
  }

  toggleCreateState(){
    let toggle = !this.state.isCreatingTeams
    this.setState({isCreatingTeams: toggle})
  }

  renderCreateTeamsArea(){
    if(!this.state.isCreatingTeams){
      return(
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); this.setState({isCreatingTeams: true})}}>Add Teams Member<i className="fa fa-plus"></i></button>
      )
    }
    else {
      return <TeamsModal handler={this.toggleCreateState}/>
    }
  }

  render() {
    return (
      <div role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <h1>Teams</h1>
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/app">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Teams</li>
              </ol>
          </nav>
        {this.renderCreateTeamsArea()}<br />
          <div>
              <div className="table-responsive">
                  <table className="table table-striped table-sm">
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Team Name</th>
                          <th>Sport Name</th>
                          <th>Season</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.renderTeamsTable()}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    )
  }
}

export default withTracker(props => {
  const teamsSubscription = Meteor.subscribe("TeamsCollection")
  const loading = teamsSubscription ? !teamsSubscription.ready() : true

  return {
    loading,
    teams: TeamsCollection.find().fetch()
  }
})(Teams)