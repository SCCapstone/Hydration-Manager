// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import {Link} from 'react-router-dom'
import {DropdownButton, MenuItem, Table, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

// Collection(s) & Custom File(s) Imports
import WeightDropdownOfTeams from '../components/weightDropdownOfTeams.jsx';
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '../../api/Teams/Teams.js';
import AthleteEntryList from '../components/athlete_entry_list.jsx';


class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Default',
            selectedDate: '',
            selectedSession: '',
        };
        autoBind(this);
    };

    componentWillUnmount() {
        this.props.subscriptions.forEach((s) => {
            s.stop();
        });
    }

    componentDidMount() {
        let now = new Date();
        let month = (now.getMonth() + 1);
        let day = now.getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        let today = now.getFullYear() + '-' + month + '-' + day;
        this.setState({selectedDate: today, selectedSession: '1'});
    }

    /* handleDebounce function --  prints the state of the selected option within the console log*/
    handleDebounce = () => {
        //console.log('The selected option is:', this.state.selectedOption);
    };

    /* handleOptionChange function -- sets selectedOption to e.target.value */
    handleOptionChange(value) {
        this.setState({selectedOption: value});
        let weightElements = document.getElementsByClassName("weightEnterInput");
        for (let i = 0; i < weightElements.length; i++) {
            weightElements[i].value = "";
            //console.log(weightElements[i]);
        }
        this.handleDebounce();
    };

    handleSessionChange = (e) => {
        this.setState({selectedSession: e});
        let weightElements = document.getElementsByClassName("weightEnterInput");
        for (let i = 0; i < weightElements.length; i++) {
            weightElements[i].value = "";
            //console.log(weightElements[i]);
        }
        this.handleDebounce();
    };

    /* handleDataChange function -- sets selectedDate to e.target.value
     * Also printed the data selected into the console log containing the selectDate (e.target.value) */
    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({selectedDate: e.target.value});
        //console.log('The date you selected is:', e.target.value);
    };

    /* Teams component returns the team with matching user id */
    teams() {
        const curUser = this.props.name;  //CurrentUser.findOne();
        //console.log(curUser);
        const id = this.props.userId;  //curUser.userID;
        return TeamsCollection.find({user: id}).fetch();
    };

    /* Athletes component */
    athletes() {
        let currentTeam = "";
        const curUser = this.props.name;//CurrentUser.findOne(); curUser never used -anthony
        const id = this.props.userId;  //curUser.userID;
        if (this.props.match.params.teamId) {
            let teamId = this.props.match.params.teamId;
            currentTeam = TeamsCollection.findOne({"_id": teamId, user: id});
            return AthletesCollection.find({teamId: currentTeam._id}).fetch();
        }
        else {
            return AthletesCollection.find().fetch();
        }
    };

    /* displayAthletes component */
    displayAthletes() {
        /* If the athletes result is NOT null the athlete single is returned. */
        if (this.athletes() != null) {
            return (this.athletes().map((athlete) => {
                return <AthleteEntryList key={athlete._id} athlete={athlete} selOp={this.state.selectedOption}
                                         session={this.state.selectedSession} dat={this.state.selectedDate}/>
            }))
        }
        /* If nothing else, a tuple stating 'select a team' is returned. */
        else {
            return <li>Select a Team</li>
        }
    }

    /* displayCurrentTeam constructor*/
    displayCurrentTeam() {
        /* If this.props.match.params.teamId, this is set as the teamId. The currentTeam is
         * set to the team of one of the team id. It is finally returns the currentTeam name
         * and currentTeam season. */
        if (this.props.match.params.teamId) {
            let teamId = this.props.match.params.teamId;
            let currentTeam = TeamsCollection.findOne({"_id": teamId});
            return ": " + currentTeam.name + " " + currentTeam.season;
        }
        /* In other case, an empty string is returned. */
        else {
            return "";
        }
    }

    /* Renders Weight Entry Lists of Athletes, dropdown buttons of teams,
     * and forms for inputting athlete weights. */
    render() {
        //const {props} = this;
        return (
            <div>
                <div className="WeightHeader">
                    <h3>Weight Entry {this.displayCurrentTeam()}</h3>
                    <div className="WeightButtons">
                        <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange}
                               id="DatePicker"/>
                        <DropdownButton id={'SessionSelect'} title={'Session ' + this.state.selectedSession}
                                        bsStyle={'default'} onSelect={this.handleSessionChange}>
                            <MenuItem eventKey="1">Session 1</MenuItem>
                            <MenuItem eventKey="2">Session 2</MenuItem>
                            <MenuItem eventKey="3">Session 3</MenuItem>
                        </DropdownButton>
                        <ToggleButtonGroup type="radio" name="options" id="RadioButtons"
                                           value={this.state.selectedOption}>
                            <ToggleButton id = "PreButton" value={"PreWeight"}
                                          onClick={() => this.handleOptionChange("PreWeight")}>PreWeight</ToggleButton>
                            <ToggleButton id = "PostButton" value={"PostWeight"}
                                          onClick={() => this.handleOptionChange("PostWeight")}>PostWeight</ToggleButton>
                        </ToggleButtonGroup>
                        <DropdownButton id={'TeamSelect'} title={'Team Select'} key={null} bsStyle={'default'}>
                            {this.teams().map((team) => {
                                return <WeightDropdownOfTeams key={team._id} team={team}/>
                            })}
                            <MenuItem>
                                <Link to={{pathname: "/app/weightEntry/"}}> All Athletes </Link>
                            </MenuItem>
                        </DropdownButton>
                    </div>
                </div>
                <hr/>
                <form>
                    <br/>
                    <br/><br/>
                    <Table striped bordered condensed hover className="teams">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight Entry</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.displayAthletes()}
                        {/*{this.athletes().map((athlete)=>{return <AthleteEntryList key={athlete._id} athlete={athlete} selOp={this.state.selectedOption} dat={this.state.selectedDate}/>})}*/}
                        </tbody>
                    </Table>
                </form>
            </div>
        )
    }
}

WeightEntry.propTypes = {
    subscriptions: PropTypes.array,
    teamLoading: PropTypes.bool,
    athleteLoading: PropTypes.bool,
    teamsList: PropTypes.array,
    athletesList: PropTypes.array,
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(() => {
    const teamSubscription = Meteor.subscribe('teams.all');
    const athleteSubscription = Meteor.subscribe('athletes.all');
    const userSubscription = Meteor.subscribe('users.all');
    const teamLoading = !teamSubscription.ready();
    const athleteLoading = !athleteSubscription.ready();
    const teamsList = !teamLoading ? TeamsCollection.find().fetch() : [];
    const athletesList = !athleteLoading ? AthletesCollection.find().fetch() : [];
    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    //console.log(teamsList);
    //console.log(athletesList);

    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
    };
})(WeightEntry);
