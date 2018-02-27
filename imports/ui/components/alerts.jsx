// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import { Table, DropdownButton } from 'react-bootstrap';

// Custom File Imports
import AlertDropdownOfTeams from './alertDropdownOfTeams.jsx';
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '..//../api/Teams/Teams.js';
import { Teams } from '../../api/teams.jsx';
import AthleteAlert from './athleteAlert.jsx';

class Alerts extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                showModal: false,
                name: '',
                weight: '',
                height: '',
                playerTeamId: '',
            };
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

        athletes() {
        return AthletesCollection.find().fetch();
        }

        teams() {

            const curUser = this.props.name;  //CurrentUser.findOne();
            console.log(curUser);
            const id = this.props.userId;  //curUser.userID;
            return TeamsCollection.find({user:id}).fetch();
        };

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
        getCurrentTeam ()
        {
            currentTeam = this.props.match.params.teamId;
            this.setState({
                playerTeamId : currentTeam
            });
        }


        render() {
            return (
                <div>
                    <div>
                        <span><h3>Alerts</h3></span>
                        <span>
                            <DropdownButton id={'Team Select'} title={'Team Select'} noCaret>
                                {this.teams().map((team)=>{return <AlertDropdownOfTeams key={team._id} team={team} />})}
                            </DropdownButton>
                        </span>
                        <h1> {this.displayCurrentTeam()} </h1>
                    </div>
                    <div>
                        <br/>
                        {/*TODO: Able to click on athlete to go athlete report screen*/}
                        <Table striped bordered condensed hover className="red">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Hydration %</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.athletes().map((athlete)=>{return <AthleteAlert key={athlete._id} athlete={athlete} />})}
                            </tbody>
                        </Table>
                        <Table striped bordered condensed hover className="yellow">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Hydration %</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.athletes().map((athlete)=>{return <AthleteAlert key={athlete._id} athlete={athlete} />})}
                            </tbody>
                        </Table>
                    </div>
                </div>

                )
        }
}

Alerts.propTypes = {
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
})(Alerts);
