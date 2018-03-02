// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import { DropdownButton, Table } from 'react-bootstrap';

// Custom File Imports
import WeightDropdownOfTeams from '../components/weightDropdownOfTeams.jsx';
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '..//../api/Teams/Teams.js';
import AthleteEntryList from '../components/athlete_entry_list.jsx';


class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Default',
            selectedDate: '',
        };
        // this.handleOptionChange = this.handleOptionChange.bind(this);
        // this.handleDateChange =  this.handleDateChange.bind(this);
        // this.handleDebounce = debounce(1000, this.handleDebounce);
        autoBind(this);
    };

    componentWillUnmount() {
        this.props.subscriptions.forEach((s) =>{
            s.stop();
        });
    }

    handleDebounce = () => {
        console.log('The selected option is:',this.state.selectedOption);
    };

    handleOptionChange = (e) => {
        this.setState({selectedOption: e.target.value});
        this.handleDebounce();
    };
    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({selectedDate: e.target.value});
        console.log('The date you selected is:', e.target.value);
    };

    teams() {
        const curUser = this.props.name;  //CurrentUser.findOne();
        console.log(curUser);
        const id = this.props.userId;  //curUser.userID;
        return TeamsCollection.find({user:id}).fetch();
    };
    athletes() {
        currentTeam = "";
        const curUser =  this.props.name;//CurrentUser.findOne();
        const id = this.props.userId;  //curUser.userID;
        if(this.props.match.params.teamId) {
            teamId = this.props.match.params.teamId;
            currentTeam = TeamsCollection.findOne({"_id": teamId, user:id});
            return AthletesCollection.find({teamId: currentTeam._id}).fetch();
        }
        else{
            return null;
        }
    };

    displayAthletes() {
        if(this.athletes() != null) {
            return (this.athletes().map((athlete) => {
                return <AthleteEntryList key={athlete._id} athlete={athlete} selOp={this.state.selectedOption}
                                         dat={this.state.selectedDate}/>
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
    }
    render() {
        const { props } = this;
        return (
            <div>
                <h3>Weight Entry</h3>
                    <div className="WeightHeader">
                    <DropdownButton id={'Team Select'} title={'Team Select'} key={null} bsStyle={'Default'}>
                           {this.teams().map((team)=>{return <WeightDropdownOfTeams key={team._id} team={team} />})}
                    </DropdownButton>
                    <h1>{this.displayCurrentTeam()}</h1>
                </div>
                <hr/>
                <form>
                    <br/>
                    <div>
                        <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange}/>
                    </div><br/>

                    <div>
                        <label>
                            <input type="radio" value="PreWeight" checked={this.state.selectedOption === 'PreWeight'} onChange={this.handleOptionChange}/>
                            PreWeight
                        </label>
                        <span>
                            <label>
                                <input type="radio" value="PostWeight" checked={this.state.selectedOption === 'PostWeight'} onChange={this.handleOptionChange.bind(this)}/>
                                PostWeight
                            </label>
                        </span>
                    </div>
                    <div>{/*Null comment*/}</div><br/><br/><br/>
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
})(WeightEntry);
