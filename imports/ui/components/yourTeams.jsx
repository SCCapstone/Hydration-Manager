import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Teams} from '../../api/teams.jsx';
import ListOfTeams from './listOfTeams.jsx';
import {CurrentUser} from '../../api/users.jsx';


export default class YourTeams extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.routeToReport = this.routeToReport.bind(this);
        this.addTeam = this.addTeam.bind(this);
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

    addTeam() {
      event.preventDefault();
      var teamName = this.team.controlEl.value;
      var teamSeason = this.season.controlEl.value;

      if (teamName != "") {
        var curUser = CurrentUser.findOne();
        var id = curUser.userID;

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
        var curUser = CurrentUser.findOne();
        console.log(curUser);
        var id = curUser.userID;
        return Teams.find({user:id}).fetch();
    }

    render () {
        let tm = this.teams;
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Your Team's</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create a Team</Button></span>
                    <div className="mui--clearfix"></div>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>
                        {/*TODO: Check that team is a string, and season is a number */}
                        <Modal.Body>
                            <Form className = "mui--text-left">
                                <Input ref={el => {this.team = el;}} label = "Team Name" floatingLabel = {true} required = {true} />
                                <Input ref={el => {this.season = el;}} label = "Season" floatingLabel = {true} required = {true} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} variant="raised"> Close </Button>
                            <Button onClick={this.addTeam} variant="raised" color="primary"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    <ListGroup className="teams">
                        {this.teams().map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>
                </div>
            </div>
        )
    }
}
