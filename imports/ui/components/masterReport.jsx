import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MasterDropdownOfTeams from './masterDropdownOfTeams.jsx';
import {DropdownButton} from 'react-bootstrap';

//import {CurrentUser} from '../../api/users.jsx';
//import { Accounts } from 'meteor/accounts-base';
import autoBind from 'react-autobind';
import {TeamsOld} from '../../api/teams.jsx';
import {AthletesOld} from '../../api/athletes.jsx';

import AthleteSingle from './athletesingle.jsx';
import TeamsCollection from '../../api/Teams/Teams.js';
import AthletesCollection from '../../api/Athletes/Athletes.js';


class MasterReport extends React.Component {
//export default class MasterReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            name: '',
            weight: '',
            height: '',
            playerTeamId: '',
        };
        // this.routeToReport = this.routeToReport.bind(this);
        // this.open = this.open.bind(this);
        // this.close = this.close.bind(this);
        // this.addPlayer = this.addPlayer.bind(this);
        // this.teams = this.teams.bind(this);
        // this.athletes = this.athletes.bind(this);
        // this.getCurrentTeam = this.getCurrentTeam.bind(this);
        autoBind(this);
    }

    componentWillUnmount() {
        this.props.subscriptions.forEach((s) =>{
            s.stop();
        });
    }

    routeToReport () {
        window.location ='/app/athleteReport';
    }
    open() {
        this.setState({ showModal: true });
        this.getCurrentTeam();
    }
    close() {
        this.setState({ showModal: false });
    }
    addPlayer() {
        event.preventDefault();
        const pName = this.state.name;
        const pWeight = this.state.weight;
        const pHeight = this.state.height;
        const pTeamId = this.state.playerTeamId;


        console.log(pName);
        console.log(pWeight);
        console.log(pHeight);
        console.log(pTeamId);
        if(pName == '' || pWeight == '' || pHeight == '' || pTeamId == '')
        {
            window.alert("Make sure to complete all fields for player creation. If no teams are available, contact an admin to assign you a team.");
        }
        else {
            Meteor.call('athletes.insert', pName, pWeight, pHeight, pTeamId, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Player Created', 'success', 'fixed-top', 'fa-check');

                this.name = "";
                this.weight = "";
                this.height = "";
                this.close();
            });
        }

        this.close();
    }
    athletes() {
        currentTeam = "";

        const curUser = this.props.name;  //CurrentUser.findOne();
        const id = this.props.userId;  //curUser.userID;
        if(this.props.match.params.teamId) {
            teamId = this.props.match.params.teamId;

            currentTeam = TeamsCollection.findOne({"_id": teamId});
            return AthletesCollection.find({teamId: currentTeam._id}).fetch();
        }
        else{
            return null;
        }

    }
    teams() {
        const curUser = this.props.name;  //CurrentUser.findOne();
        console.log(curUser);
        const id = this.props.userId;  //curUser.userID;
        console.log(id);
        return TeamsCollection.find({user:id}).fetch();
    };

    displayAthletes() {
        if(this.athletes() != null) {
            return (this.athletes().map((athlete) => {
                return <AthleteSingle key={athlete._id} athlete={athlete} />
            }))
        }
        else{
            return <li>Select a Team</li>
        }
    }

    displayCurrentTeam() {
        if(this.props.match.params.teamId) {
            teamId = this.props.match.params.teamId;
            currentTeam = TeamsCollection.findOne({"_id": teamId});
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

    handleTeam = (e) => {
        e.persist();
        this.setState({
            playerTeamId : e.target.value
        });
    };
    //Gets current team so that the modal window automatically has current team selected
    getCurrentTeam ()
    {
        if(this.props.match.params.teamId)
        {
            currentTeam = this.props.match.params.teamId;
            this.setState({
                playerTeamId : currentTeam
            });
        }

        // CurrentUser.findOne().userID -> Alt. Ex: Meteor.users.findOne({ 'emails.address': email })

        else if(TeamsCollection.findOne({user: this.props.userId}) != undefined)
        {
            this.setState({
                playerTeamId : TeamsCollection.findOne({user: this.props.userId})._id
            });
        }
    }

    render() {
        athletes = this.athletes;

        return (
            <div>
                <div>
                    <h3>Master Report</h3>
                        <DropdownButton id={'Team Select'} title={'Team Select'}>
                            {this.teams().map((team)=>{return <MasterDropdownOfTeams key={team._id} team={team} />})}
                        </DropdownButton>
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
                                    <FormControl placeholder='Baseline Weight' label='Base Weight' type='number' onChange={this.handleWeight}/>
                                    <FormControl placeholder='Height' label='Height' type='number' onChange={this.handleHeight}/>
                                    <FormControl placeholder='Team' value={this.state.playerTeamId} componentClass="select" label='Team' onChange={this.handleTeam}>
                                        {this.teams().map((team)=><option value={team._id} key={team._id}>{team.name} {team.season}</option>)}
                                    </FormControl>
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
                        {this.displayAthletes()}
                            {/*{this.athletes().map((athlete)=>{return <AthleteSingle key={athlete._id} athlete={athlete} />})}*/}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

MasterReport.propTypes = {
    subscriptions: PropTypes.array,
    teamLoading: PropTypes.bool,
    athleteLoading: PropTypes.bool,
    teamsList: PropTypes.array,
    athletesList: PropTypes.array,
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(() => {
    const teamSubscription = Meteor.subscribe('teams.thisUserId');
    const athleteSubscription = Meteor.subscribe('athletes.thisTeamId');
    const teamLoading = !teamSubscription.ready();
    const athleteLoading = !athleteSubscription.ready();
    const teamsList = !teamLoading ? TeamsCollection.find().fetch() : [];
    const athletesList = !athleteLoading ? AthletesCollection.find().fetch() : [];
    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    console.log(teamsList);
    console.log(athletesList);

    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
    };
})(MasterReport);
