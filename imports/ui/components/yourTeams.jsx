import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Teams} from '../../api/teams.jsx'
import TeamSingle from './teamsingle.jsx'

import {SiteUser} from '../../api/users.jsx'

export default class YourTeams extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        this.routeToReport = this.routeToReport.bind(this);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    routeToReport () {
        window.location ='/app/masterReport';
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }

    addTeam(event) {
      event.preventDefault();
      var teamName = this.team.controlEl.value;
      var teamSeason = this.season.controlEl.value;

      var curUser = SiteUser.findOne({"currentUser": "true"});
      var id = curUser._id;

      if (teamName != "") {
        Meteor.call('addNewTeam', teamName,teamSeason,id, ()=> {
          Bert.defaults = {hideDelay: 4500}
          Bert.alert('Team Created','success', 'fixed-top', 'fa-check');

          this.team.controlEl.value = "";
          this.season.controlEl.value = "";
          this.close();
        });
      }
    }

    teams() {
        return Teams.find().fetch();
    }

    render () {
        let tm = this.teams();
        
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Your Team's</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create a Team</Button></span>
                    <div className="mui--clearfix"></div>
                </div>
                <div>
                  <span>Select Team For Details</span>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form className = "mui--text-left" onSubmit={this.addTeam.bind(this)}>
                                <Input ref={el => {this.team = el;}} label = "Team Name" floatingLabel = {true} required = {true} />
                                <Input ref={el => {this.season = el;}} label = "Season" floatingLabel = {true} required = {true} />
                                <Button onClick={this.close} variant="raised"> Close </Button>
                                <Button variant="raised" color="primary"> Create Team </Button>
                            </Form>
                        </Modal.Body>
                        {/*TODO: Add the team's data to the database*/}
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    {/*TODO: Conditional Rendering of this list*/}
                    <ListGroup>

                        <ul className="teams">
                            {this.teams().map((team)=>{
                                return <TeamSingle key={team._id} team={team} />
                            })}
                        </ul>

                        <ListGroupItem onClick = {this.routeToReport}>Example Team</ListGroupItem>
                        <ListGroupItem onClick = {this.routeToReport}>Example Team</ListGroupItem>
                    </ListGroup>
                </div>

            </div>
        )
    }
}
