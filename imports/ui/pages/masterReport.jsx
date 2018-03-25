// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import { Button, DropdownButton, FormControl, FormGroup, Modal, Table, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';

// Collection(s) & Custom File(s) Imports
import MasterDropdownOfTeams from '../components/masterDropdownOfTeams.jsx';
import AthleteSingle from '../components/athletesingle.jsx';
import TeamsCollection from '../../api/Teams/Teams.js';
import AthletesCollection from '../../api/Athletes/Athletes.js';


class MasterReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            name: '',
            weight: '',
            height: '',
            playerTeamId: '',
            teamSelected: '',
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

    componentDidMount() {
        this.getCurrentTeam();
    }

    /*Link to athleteReport page */
    routeToReport () {
        window.location ='/app/athleteReport';
    }

    /*Opens Modal and returns information on the current team*/
    open() {
        this.setState({ showModal: true });
        this.getCurrentTeam();
    }

    /*Closes Modal*/
    close() {
        this.setState({ showModal: false });
    }

    /*addPlayer method*/
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
        /*If one of the fields are left blank, then an alert window is generated
        * with message stating such.*/
        if(pName == '' || pWeight == '' || pHeight == '' || pTeamId == '')
        {
            window.alert("Make sure to complete all fields for player creation. If no teams are available, contact an admin to assign you a team.");
        }
        /* Meteor calls the method from the Athlete API Collection which can be found
         * at location: imports/api/Athletes/methods.js; upon completion an alert message
         * will be printed stating the player has been creating and the action was successful.*/
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
    /* Athletes component*/
    athletes() {
        currentTeam = "";

        const curUser = this.props.name;  //CurrentUser.findOne();
        const id = this.props.userId;  //curUser.userID;
        console.log(this.props.teamId);
        if(this.props.teamId !== '') {
            teamId = this.props.teamId;
            // currentTeam = '';
            // // currentTeam = TeamsCollection.findOne({"_id": teamId});
            // for(i=0;i<this.props.teamsList.length; i++)
            // {
            //     if(this.props.teamsList[i]._id == teamId)
            //     {
            //         currentTeam = this.props.teamsList[i];
            //     }
            // }

            /*The currentAthletes is set as an empty array*/
            currentAthletes = [];
            /* The athletes list is iterated through, */
            for(i=0;i<this.props.athletesList.length;i++)
            {
                /*If the athletes list teamId is EQUAL TO the teamId,
                then the increase athlete within the athletesList is pushed onto the currentAthletes array*/
                if(this.props.athletesList[i].teamId == this.props.teamId)
                {
                    currentAthletes.push(this.props.athletesList[i]);
                }
                /*TODO: Pushing Isn't The Best Data Structure To Use For This Guys! -Jaymel*/
            }
            /*Finally it returns the currentAthlete*/
            return currentAthletes;
            // return AthletesCollection.find({teamId: this.props.teamId}).fetch();
        }
        /* In any other case the athletesList is returned. */
        else{
            return this.props.athletesList;
        }

    }

    /* The Teams component simply returns the teamsList */
    teams() {
        // const curUser = this.props.name;  //CurrentUser.findOne();
        // console.log(curUser);
        // const id = this.props.userId;  //curUser.userID;
        // console.log(id);
        // return TeamsCollection.find({user:id}).fetch();
        return this.props.teamsList;
    };

    /* displayAthletes component */
    displayAthletes() {
        /* If the athletes result is NOT null the athlete single is returned.*/
        if(this.athletes() != null) {
            return (this.athletes().map((athlete) => {
                return <AthleteSingle key={athlete._id} athlete={athlete} />
            }))
        }
        /* If nothing else, a tuple stating 'select a team' is returned. */
        else{
            return <li>Select a Team</li>
        }
    }

    /* displayCurrentTeam constructor*/
    displayCurrentTeam() {
        /* If current teamId, teamId is set as the current TeamId */
        if(this.props.teamId) {
            teamId = this.props.teamId;
            /* Increments through teamsList*/
            for(i=0;i<this.props.teamsList.length;i++)
            {
                /* If the teamsList id is EQUAL TO the teamId,
                 * then the Teams List name and the Teams List
                 * season are returned. */
                if(this.props.teamsList[i]._id == teamId)
                {
                    return ": " + this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
                }
            }
            // currentTeam = TeamsCollection.findOne({"_id": teamId});
            // return currentTeam.name + " " + currentTeam.season;
        }
        else{
            return "";
        }
    };

    /* handleName function -- sets the name equal to e.target.value */
    handleName = (e) => {
        e.persist();
        this.setState({
            name : e.target.value
        });
    };

    /* handleHeight function -- sets the base height equal to e.target.value */
    handleHeight = (e) => {
        e.persist();
        const num = Number.parseFloat(e.target.value).toPrecision(6);
        this.setState({
            height : num
        });
    };

    /* handleWeight function -- sets the base weight equal to e.target.value */
    handleWeight = (e) => {
        e.persist();
        const num = Number.parseFloat(e.target.value).toPrecision(6);
        this.setState({
            weight : num
        });
    };

    /* handleTeam function -- sets the team equal to e.target.value */
    handleTeam = (e) => {
        e.persist();
        this.setState({
            playerTeamId : e.target.value
        });
    };

    /* Gets current team so that the modal window automatically has the current team selected.
     * If this.props.teamId, currentTeam is set to this.props.teamId. And the playerTeamId is
     * set to the currentTeam, which is the teamId. */
    getCurrentTeam ()
    {
        if(this.props.teamId)
        {
            currentTeam = this.props.teamId;
            this.setState({
                playerTeamId : currentTeam
            });
        }

        // CurrentUser.findOne().userID -> Alt. Ex: Meteor.users.findOne({ 'emails.address': email })

        /*If the teamsList at index zero is not undefined, the playerTeam id is set to the
        * id of the teamsList at index 0.  */
        else if(this.props.teamsList[0] != undefined)
        {
            this.setState({
                playerTeamId : this.props.teamsList[0]._id
            });
        }
    }

    /* Render */
    render() {
        athletes = this.athletes;

        /* When the athlete or team are loading, null will be returned. */
        if(this.props.athleteLoading || this.props.teamLoading){
            return null;
        }

        /* Returns the Master Report with athlete information */
        return (
            <div>
                <div className="MasterHeader">
                    <h3>Master Report {this.displayCurrentTeam()}</h3>
                    <div className="MasterButtons">
                        <Button onClick={this.open} bsStyle="primary">&#43; Create an Athlete</Button>
                        <DropdownButton id={'Team Select'} title={'Team Select'} key={null} bsStyle={'default'} className = "DropDown">
                            {this.teams().map((team) => {
                                return <MasterDropdownOfTeams key={team._id} team={team}/>
                            })}
                            <MenuItem>
                              <Link to ={ {pathname: "/app/masterReport/"} }> All Athletes </Link>
                            </MenuItem>
                        </DropdownButton>
                    </div>
                </div>
                <hr/>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Athlete Entry Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl placeholder='Player Name' label='Player Name' type='text'
                                                 onChange={this.handleName}/><br/>
                                    <FormControl placeholder='Baseline Weight (lbs)' label='Base Weight' type='number'
                                                 onChange={this.handleWeight}/><br/>
                                    <FormControl placeholder='Height (in)' label='Height' type='number'
                                                 onChange={this.handleHeight}/><br/>
                                    <FormControl placeholder='Team' value={this.state.playerTeamId}
                                                 componentClass="select" label='Team' onChange={this.handleTeam}>
                                        {this.teams().map((team) => <option value={team._id}
                                                                            key={team._id}>{team.name} {team.season}</option>)}
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}> Close </Button>
                            <Button onClick={this.addPlayer} bsStyle="primary"> Create Athlete </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div>
                    <br/>
                    <Table striped bordered condensed hover responsive className="teams">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Most Recent Weight Loss %</th>
                            <th>Current Weight (lbs.)</th>
                            <th>Base Weight (lbs.)</th>
                            <th>Height (in.)</th>
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
    teamId: PropTypes.string,
    match: PropTypes.object.isRequired,
    // setCurTeamToDisplay: PropTypes.func,
    // curTeamToDisplay: PropTypes.object,
    //-->{!this.props.curTeamToDisplay ? 'Team Select' : this.props.curTeamToDisplay}
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(({match}) => {
    const teamSubscription = Meteor.subscribe('teams.thisUserId');
    const athleteSubscription = Meteor.subscribe('athletes.all');
    const teamLoading = !teamSubscription.ready();
    const athleteLoading = !athleteSubscription.ready();
    const teamsList = !teamLoading ? TeamsCollection.find().fetch() : [];
    const athletesList = !athleteLoading ? AthletesCollection.find().fetch() : [];
    //const teamId = match.params.teamId;
    const isTeamIdPassed = !match.params.teamId ? false : true;
    const teamId = isTeamIdPassed ? match.params.teamId : '';  //( (teamsList.length > 0) ? teamsList[0]._id : '');

    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    console.log(teamsList);
    console.log(athletesList);
    console.log(athleteLoading);
    console.log('teamId');
    console.log(teamId);

    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
        teamId,
    };
})(MasterReport);
