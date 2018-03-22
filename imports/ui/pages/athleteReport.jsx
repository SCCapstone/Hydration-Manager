// Package Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import { Button, DropdownButton, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Custom File Imports
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '../../api/Teams/Teams.js';
import ReportDropdownOfTeams from '../components/reportDropdownOfTeams.jsx';
import AthleteReportTable from '../components/athleteReportTable';

class AthleteReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            name: '',
            base: '',
            height: '',
            team: '',
        };
        autoBind(this);

        // this.deleteAthlete = this.deleteAthlete.bind(this);
        // this.athlete = this.athlete.bind(this);
    }

    routeToMaster() {
        window.location = "/app/masterReport/";
    }

    showCurrentWeight() {
        preWeightDate = null;
        postWeightDate = null;

        if(this.athlete().preWeightData[0] != undefined) {
            preWeightDate = this.athlete().preWeightData[0].date;
        }
        if (this.athlete().postWeightData[0] != undefined) {
            postWeightDate = this.athlete().postWeightData[0].date;
        }
        if(postWeightDate != null && preWeightDate != null)
        {
            return Number.parseFloat(this.athlete().postWeightData[0].weight).toPrecision(6);
   /*
            If both weights do exist, current weight will be postWeight data. -anthony

            if(postWeightDate > preWeightDate)
            {
                return this.athlete().postWeightData[0].weight;
            }
            else
            {
                return this.athlete().preWeightData[0].weight;
            }
   */
        }
        else if(postWeightDate != null)
        {
            return Number.parseFloat(this.athlete().postWeightData[0].weight).toPrecision(6);
        }
        else if(preWeightDate != null)
        {
            return Number.parseFloat(this.athlete().preWeightData[0].weight).toPrecision(6);
        }
        else
        {
            return this.athlete().baseWeight;
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
        if(this.props.athleteId) {
            athleteId = this.props.athleteId;
            // athlete = AthletesCollection.findOne({"_id": athleteId});
            currentAthlete = '';
            console.log(this.props.athletesList)
            for(i=0;i<this.props.athletesList.length;i++)
            {
                if(this.props.athletesList[i]._id == athleteId)
                {
                    currentAthlete = (this.props.athletesList[i]);
                }
            }
            return currentAthlete;
        }
        else{
            return "";
        }
    }

    team() {
        //playerTeamId = this.athlete().teamId;
        //currentTeam = TeamsCollection.findOne({"_id": playerTeamId});
        //console.log(playerTeamId + "," + currentTeam);
        //return currentTeam;
        return this.props.teamsList;
    }

    teams() {
        const curUser = this.props.name;  //CurrentUser.findOne();
        console.log(curUser);
        const id = this.props.userId;  //curUser.userID;
        return TeamsCollection.find({user:id}).fetch();
    };

    /*getTeam function returns teams name and season*/
    getTeam() {
        for(i=0;i<this.props.teamsList.length;i++)
        {
            if(this.props.teamsList[i]._id === this.athlete().teamId)
            {
                return this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
            }
        }
    }

    calcLoss(){
        currentWeight = this.showCurrentWeight();
        baseWeight = this.athlete().baseWeight;
        weightChange = currentWeight - baseWeight;
        if(weightChange > 0)
        {
            return "+" + Number.parseFloat(weightChange).toPrecision(6);
        }
        else if (weightChange == 0)
        {
            return Number.parseFloat(weightChange).toPrecision(6);
        }
        else {
            return "(" + Number.parseFloat(weightChange).toPrecision(6) + ")";
        }
    }

        open() {
            this.setState({
                showModal: true,
            });
        }
        close() {
            this.setState({ showModal: false });
        }

        handleName = (e) => {
            this.setState({name: e.target.value});
        }

        handleWeight = (e) => {
            this.setState({base: e.target.value});
        }

        handleHeight = (e) => {
            this.setState({height: e.target.value});
        }

        handleTeam = (e) => {
            this.setState({team: e.target.value});
        }

        handleEditButtonClick() {
            this.open();
        }

        editEntry() {
            event.preventDefault();
            const pId = this.props.athleteId;
            const nm = this.state.name;
            const bw = this.state.base;
            const h = this.state.height;
            const t = this.state.team;
            if(pId == '' || nm == '' || bw == '' || h == '' || t == '')
            {
                window.alert("Make sure to complete all fields for editing.");
            }
            else {
                Meteor.call('athletes.edit', pId, nm, h, bw, t, () => {
                    Bert.defaults = {hideDelay: 4500};
                    Bert.alert('athlete edited', 'success', 'fixed-top', 'fa-check');

                    this.setState({
                        name: '',
                        base: '',
                        height: '',
                        team: '',
                    })
                    this.close();
                });
            }

            this.close();
        }

    render() {
        athlete = this.props.athlete;
        team = this.props.team;

        if(this.props.athleteLoading || this.props.teamLoading){
            return null;
        }
        for(i=0;i < this.props.athletesList.length;i++)
        {
            if(this.props.athletesList[i]._id == this.props.athleteId)
            {
                return (
                    <div>
                        <Modal show={this.state.showModal} onHide={this.close} >
                            <Modal.Header>
                                <Modal.Title>Athlete Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <FormGroup>
                                        <FormControl placeholder={this.athlete().name} label='Name' type='string' onChange={this.handleName}/>
                                        <FormControl placeholder={this.athlete().height} label='Height' type='number' onChange={this.handleHeight}/>
                                        <FormControl placeholder={this.athlete().baseWeight} label='Weight' type='number' onChange={this.handleWeight}/>
                                        <DropdownButton id={'Team Select'} title={'Team Select'} key={null} bsStyle={'default'} className = "DropDown" onChange={this.handleTeam}>
                                            {this.teams().map((team) => { return <ReportDropdownOfTeams key={team._id} team={team}/>})}
                                        </DropdownButton>
                                    </FormGroup>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close} bsStyle="danger">Close</Button>
                                <Button onClick={this.editEntry} bsStyle="primary">Edit Athlete</Button>
                            </Modal.Footer>
                        </Modal>
                        <Link to = {"/app/masterReport/" + this.team()._id}><Button bsStyle="primary">&lt; Back to {this.team().name} {this.team().season}</Button></Link>
                        <h3>Athlete Report</h3>
                        {/*TODO: Create component for the basic info*/}
                        <h4>{this.athlete().name} <Button bsSize="xsmall" onClick={() => this.handleEditButtonClick()}><span className="glyphicon glyphicon-pencil"></span></Button></h4>
                        <h5>Team: {this.getTeam()}</h5>
                        <h5>Height: {this.athlete().height} in.</h5>
                        <h5>Base Weight: {this.athlete().baseWeight} lbs.</h5>
                        <h5>Current Weight: {this.showCurrentWeight()} lbs.</h5>
                        <h5>Total Weight Change: {this.calcLoss()} lbs.</h5>
                        <AthleteReportTable athlete={this.athlete()}/>
                    </div>
                )
            }
        }
        return this.routeToMaster();

    }
}

AthleteReport.propTypes = {
    subscriptions: PropTypes.array,
    teamLoading: PropTypes.bool,
    athleteLoading: PropTypes.bool,
    teamsList: PropTypes.array,
    athletesList: PropTypes.array,
    athleteId: PropTypes.string,
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(({match}) => {
    const teamSubscription = Meteor.subscribe('teams.all');
    const athleteSubscription = Meteor.subscribe('athletes.all');
    const teamLoading = !teamSubscription.ready();
    const athleteLoading = !athleteSubscription.ready();
    const teamsList = !teamLoading ? TeamsCollection.find().fetch() : [];
    const athletesList = !athleteLoading ? AthletesCollection.find().fetch() : [];
    const athleteId = match.params.athleteId;
    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    console.log(teamsList);
    console.log(athletesList);
    console.log(athleteLoading);

    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
        athleteId,
    };
})(AthleteReport);
