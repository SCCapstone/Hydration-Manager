import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';

import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '..//../api/Teams/Teams.js';
import {AthletesOld} from '../../api/athletes.jsx';
import {Teams} from '../../api/teams.jsx';
import { Link } from 'react-router-dom';

class AthleteReport extends Component {
    constructor(props) {
        super(props);
        // this.deleteAthlete = this.deleteAthlete.bind(this);
        // this.athlete = this.athlete.bind(this);
        autoBind(this);
    }

    componentWillUnmount() {
        this.props.subscriptions.forEach((s) =>{
            s.stop();
        });
    }

    deleteAthlete() {
        Meteor.call('deleteAthlete',this.props.athlete._id);
    }

    athlete() {
        if(this.props.match.params.athleteId) {
            athleteId = this.props.match.params.athleteId;
            athlete = AthletesCollection.findOne({"_id": athleteId});
            return athlete;
        }
        else{
            return "";
        }
    }

    team() {
        playerTeamId = this.athlete().teamId;
        team = TeamsCollection.findOne({"_id": playerTeamId});
        return team;
    }

    render() {
        athlete = this.athlete;
        team = this.team;
        return (
            <div>
                <Link to = {"/app/masterReport/" + this.team()._id}><Button bsStyle="primary">&lt; Back to {this.team().name} {this.team().season}</Button></Link>
                <h3>Athlete Report</h3>
                {/*TODO: Create component for the basic info*/}
                <h4>{this.athlete().name}</h4>
                <h4>{this.team().name} {this.team().season}</h4>
                <h4>{this.athlete().height}</h4>
                <h4>{this.athlete().baseWeight}</h4>
                {/*TODO: Create component for the visualization of data*/}
            </div>
        )
    }
}

AthleteReport.propTypes = {
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
})(AthleteReport);
