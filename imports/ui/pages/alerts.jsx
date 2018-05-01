/* TODO: WILL BE COMING BACK TO FINISH THE REST OF THE COMMENTS --Jaymel */

// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import {Table} from 'react-bootstrap';

// Collection(s) & Custom File(s) Imports
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '../../api/Teams/Teams.js';
import AthleteAlert from '../components/athleteAlert.jsx';
import LongTermAthleteAlert from '../components/longTermAthleteAlert';

class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            weight: '',
            playerTeamId: '',
        };
        autoBind(this);
    };

    componentWillUnmount() {
        this.props.subscriptions.forEach((s) => {
            s.stop();
        });
    }

    getCurrentTeam() {
        let currentTeam = this.props.match.params.teamId;
        this.setState({playerTeamId: currentTeam});
    }

    /*Red Teams Athletes for athletes needing major attention.*/
    redAthletes() {
        let allAthletes = AthletesCollection.find().fetch(), redAthletes = [];
        let preWeight, postWeight, hydration = '';
        for (let i = 0; i < allAthletes.length; i++) {
            if (allAthletes[i].preWeightData[0] !== undefined && allAthletes[i].postWeightData[0] !== undefined) {
                if (allAthletes[i].preWeightData[0].date === allAthletes[i].postWeightData[0].date) {
                    preWeight = allAthletes[i].preWeightData[0].weight;
                    postWeight = allAthletes[i].postWeightData[0].weight;
                    hydration = (preWeight - postWeight) / preWeight * 100;
                    if (hydration <= -4 || hydration >= 4) {
                        redAthletes.push(allAthletes[i]);
                    }
                }
            }
        }
        return redAthletes;
    }

    longTermRedAthletes() {
        let allAthletes = AthletesCollection.find().fetch(), longTermRedAthletes = [];
        let preWeight, postWeight, baseWeight, hydration = '';
        for (let i = 0; i < allAthletes.length; i++) {
            if (allAthletes[i].preWeightData[0] !== undefined && allAthletes[i].postWeightData[0] !== undefined) {
                if (allAthletes[i].preWeightData[0].date === allAthletes[i].postWeightData[0].date) {
                    preWeight = allAthletes[i].preWeightData[0];
                    postWeight = allAthletes[i].postWeightData[0];
                    baseWeight = allAthletes[i].baseWeight;
                    let mostRecentWeight = '';
                    if (preWeight.date <= postWeight.date) {
                        mostRecentWeight = postWeight.weight;
                    }
                    else {
                        mostRecentWeight = preWeight.weight;
                    }
                    hydration = (baseWeight - mostRecentWeight) / baseWeight * 100;
                    if (hydration <= -4 || hydration >= 4) {
                        longTermRedAthletes.push(allAthletes[i]);
                    }
                }
            }
        }
        return longTermRedAthletes;
    }

    /*Yellow Team Athletes for athletes needing some attention. */
    yellowAthletes() {
        let allAthletes = AthletesCollection.find().fetch(), yellowAthletes = [];
        let preWeight = '';
        let postWeight = '';
        let hydration = '';
        for (let i = 0; i < allAthletes.length; i++) {
            if (allAthletes[i].preWeightData[0] !== undefined && allAthletes[i].postWeightData[0] !== undefined) {
                if (allAthletes[i].preWeightData[0].date === allAthletes[i].postWeightData[0].date) {
                    preWeight = allAthletes[i].preWeightData[0].weight;
                    postWeight = allAthletes[i].postWeightData[0].weight;
                    hydration = (preWeight - postWeight) / preWeight * 100;
                    if (hydration > -4 && hydration < -3) {
                        yellowAthletes.push(allAthletes[i]);
                    }
                    if (hydration > 3 && hydration < 4) {
                        yellowAthletes.push(allAthletes[i]);
                    }
                }
            }
        }
        return yellowAthletes;
    }

    longTermYellowAthletes() {
        let allAthletes = AthletesCollection.find().fetch(), longTermYellowAthletes = [];
        let preWeight, postWeight, baseWeight, hydration = '';
        for (let i = 0; i < allAthletes.length; i++) {
            if (allAthletes[i].preWeightData[0] !== undefined && allAthletes[i].postWeightData[0] !== undefined) {
                if (allAthletes[i].preWeightData[0].date === allAthletes[i].postWeightData[0].date) {
                    preWeight = allAthletes[i].preWeightData[0];
                    postWeight = allAthletes[i].postWeightData[0];
                    baseWeight = allAthletes[i].baseWeight;
                    let mostRecentWeight = '';
                    if (preWeight.date <= postWeight.date) {
                        mostRecentWeight = postWeight.weight;
                    }
                    else {
                        mostRecentWeight = preWeight.weight;
                    }
                    hydration = (baseWeight - mostRecentWeight) / baseWeight * 100;
                    if (hydration > -4 && hydration < -3) {
                        longTermYellowAthletes.push(allAthletes[i]);
                    }
                    if (hydration > 3 && hydration < 4) {
                        longTermYellowAthletes.push(allAthletes[i]);
                    }
                }
            }
        }
        return longTermYellowAthletes;
    }

    render() {
        return (
            <div>
                <h3>Alerts</h3>
                <hr/>
                <div>
                    <div>
                        <br/>
                        <h4>Red Athletes</h4>
                        <Table bordered condensed responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Weight Change %</th>
                                <th>Current Weight</th>
                            </tr>
                            </thead>
                            <tbody className="redBack">
                            {this.redAthletes().map((athlete) => {
                                return <AthleteAlert key={athlete._id} athlete={athlete}
                                                     teamsList={this.props.teamsList}/>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <br/>
                        <h4>Long Term Red Athletes</h4>
                        <Table bordered condensed responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Weight Change %</th>
                                <th>Current Weight</th>
                            </tr>
                            </thead>
                            <tbody className="redBack">
                            {this.longTermRedAthletes().map((athlete) => {
                                return <LongTermAthleteAlert key={athlete._id} athlete={athlete}
                                                             teamsList={this.props.teamsList}/>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    <br/><br/>
                    <div>
                        <h4>Yellow Athletes</h4>
                        <Table bordered condensed responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Weight Change %</th>
                                <th>Current Weight</th>
                            </tr>
                            </thead>
                            <tbody className="yellowBack">
                            {this.yellowAthletes().map((athlete) => {
                                return <AthleteAlert key={athlete._id} athlete={athlete}
                                                     teamsList={this.props.teamsList}/>
                            })}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <br/>
                        <h4>Long Term Yellow Athletes</h4>
                        <Table bordered condensed responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Team</th>
                                <th>Weight Change %</th>
                                <th>Current Weight</th>
                            </tr>
                            </thead>
                            <tbody className="yellowBack">
                            {this.longTermYellowAthletes().map((athlete) => {
                                return <LongTermAthleteAlert key={athlete._id} athlete={athlete}
                                                             teamsList={this.props.teamsList}/>
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )//End Return
    }//End Render
}//End Class
Alerts.propTypes = {
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
    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
    };
})(Alerts);
