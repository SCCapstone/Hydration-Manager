// Package Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Custom File Imports
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '..//../api/Teams/Teams.js';
import { Teams } from '../../api/teams.jsx';

import AthleteReportTable from './athleteReportTable';

class AthleteReport extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        // this.deleteAthlete = this.deleteAthlete.bind(this);
        // this.athlete = this.athlete.bind(this);
    }


    showCurrentWeight() {
        preWeightDate = this.athlete().preWeightData[0].date;
        postWeightDate = this.athlete().postWeightData[0].date;
        if(postWeightDate > preWeightDate)
        {
            return this.athlete().postWeightData[0].weight;
        }
        else
        {
            return this.athlete().preWeightData[0].weight;
        }
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
                <h5>Team: {this.team().name} {this.team().season}</h5>
                <h5>Height: {this.athlete().height} in.</h5>
                <h5>Base Weight: {this.athlete().baseWeight} lbs.</h5>
                <h5>Current Weight: {this.showCurrentWeight()} lbs.</h5>
                <h5>Total Loss: {null} lbs.</h5>
                <AthleteReportTable athlete={this.athlete()}/>
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
