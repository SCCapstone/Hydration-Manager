import React from 'react';


import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MasterDropdownOfTeams from './masterDropdownOfTeams.jsx';
import {DropdownButton} from 'react-bootstrap';
//import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {CurrentUser} from '../../api/users.jsx';
import {Teams} from '../../api/teams.jsx';
import {Athletes} from '../../api/athletes.jsx';
import AthleteSingle from './athletesingle.jsx';


export default class MasterReport extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            name: '',
            weight: '',
            height: ''
        };
        this.routeToReport = this.routeToReport.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.teams = this.teams.bind(this);
        this.athletes = this.athletes.bind(this);
    }
    routeToReport () {
        window.location ='/app/athleteReport';
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }
    addPlayer() {
        event.preventDefault();
        const pName = this.state.name;
        const pWeight = this.state.weight;
        const pHeight = this.state.height;

        console.log(pName);
        console.log(pWeight);
        console.log(pHeight);

        Meteor.call('addNewPlayer', pName,pWeight,pHeight, ()=> {
            Bert.defaults = {hideDelay: 4500};
            Bert.alert('Player Created','success', 'fixed-top', 'fa-check');

            this.name = "";
            this.weight = "";
            this.height = "";
            this.close();
        });

        this.close();
    }
    athletes() {
        return Athletes.find().fetch();
    }
    teams() {
        const curUser = CurrentUser.findOne();
        console.log(curUser);
        const id = curUser.userID;
        return Teams.find({user:id}).fetch();
    };

    displayCurrentTeam() {
        if(this.props.match.params.teamId) {
            teamId = this.props.match.params.teamId;
            currentTeam = Teams.findOne({"_id": teamId});
            return currentTeam.name + " " + currentTeam.season;
        }
        else{
            return "";
        }
    };

    handleName = (e) => {
        e.persist();
        this.setState({
            name : e.target.value
        });
    };

    handleHeight = (e) => {
        e.persist();
        this.setState({
            height : e.target.value
        });
    };

    handleWeight = (e) => {
        e.persist();
        this.setState({
            weight : e.target.value
        });
    };

    render() {
        athletes = this.athletes;
        return (
            <div>
                <br/>
                <div>
                    <span><h3>Master Report</h3></span>
                    <span>
                        <DropdownButton id={'Team Select'} title={'Team Select'} noCaret>
                            {this.teams().map((team)=>{return <MasterDropdownOfTeams key={team._id} team={team} />})}
                        </DropdownButton>
                    </span>
                    <h1> {this.displayCurrentTeam()} </h1>
                    <span><Button onClick={this.open} bsStyle="primary">Create an Athlete</Button></span>
                    <div>{/*Null comment*/}</div>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Athlete Entry Form</Modal.Title>
                        </Modal.Header>
                        {/*TODO: Check that name is a string, baseweight is a number, and height is a number */}
                        <Modal.Body>
                        <form>
                            <FormGroup>
                                <FormControl placeholder='Player Name' label='Player Name' type='text' onChange={this.handleName}/>
                                <FormControl placeholder='Baseline Weight' label='Base Weight' type='text' onChange={this.handleWeight}/>
                                <FormControl placeholder='Height' label='Height' type='text' onChange={this.handleHeight}/>
                            </FormGroup>
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} bsStyle="danger"> Close </Button>
                            <Button onClick={this.addPlayer} bsStyle="success"> Create Athlete </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div>
                    <br/>
                    {/*TODO: Able to click on athlete to go athlete report screen*/}
                    <Table striped bordered condensed hover className="teams">
                      <thead>
                      <tr>
                          <th>Name</th>
                          <th>Base Weight</th>
                          <th>Height</th>
                          <th>PreWeight</th>
                          <th>PostWeight</th>
                          <th>Remove</th>
                      </tr>
                      </thead>
                        <tbody>
                            {this.athletes().map((athlete)=>{return <AthleteSingle key={athlete._id} athlete={athlete} />})}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}