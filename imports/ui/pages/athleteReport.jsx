// Package Imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

// Custom File Imports
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '../../api/Teams/Teams.js';
import ReportDropdownOfTeams from '../components/reportDropdownOfTeams.jsx';
import AthleteReportTable from '../components/athleteReportTable';

class AthleteReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            base: '',
            team: '',
        };
        autoBind(this);

        // this.deleteAthlete = this.deleteAthlete.bind(this);
        // this.athlete = this.athlete.bind(this);
    };

    componentDidMount() {
        this.getCurrentTeam();
    };

    componentWillUnmount() {
        this.props.subscriptions.forEach((s) => {
            s.stop();
        });
    };

    /*deleteAthlete method, calls to method found on in the Athletes api,
    * located at imports/api/Athletes/methods.js */
    deleteAthlete() {
        Meteor.call('deleteAthlete', this.props.athlete._id);
    };

    /*athlete component*/
    athlete() {
        /* If this.props.athleteId, athleteId is set to this.props.athleteId.*/
        if (this.props.athleteId) {
            let athleteId = this.props.athleteId, currentAthlete = '';
            /* Finally the athletesLists is iterated through. While iterating through,
               the athleteList id attributes are checked to see if they are equal to
               the athleteId attribute.*/
            for (let i = 0; i < this.props.athletesList.length; i++) {   /* Finally, if this check passes as true, the currentAthlete
                is now set as the list of athletes that have passed the check.*/
                if (this.props.athletesList[i]._id === athleteId) {
                    currentAthlete = (this.props.athletesList[i]);
                }
            }
            //Finally the currentAthlete is returned
            return currentAthlete;
        }
        //In any other situation and empty string is returned.
        else {
            return "";
        }
    };

    //team component
    teams() {
        /*The teamsList is returned here*/
        return this.props.teamsList;
    }

    routeToMaster() {
        window.location = "/app/masterReport/";
    };

    open() {
        this.setState({showModal: true});
    };

    //close method
    close() {
        this.setState({showModal: false});
    };

    getCurrentTeam() {
        this.setState({team: this.props.teamId});
    }

    /*getTeam function returns teams name and season*/
    getTeam() {
        for (let i = 0; i < this.props.teamsList.length; i++) {
            // console.log("The length of the teams list is " + this.props.teamsList.length);
            // console.log("The id of the team at position " + i + " is " + this.props.teamsList[i]._id);
            // console.log("The teamid of the athlete is " + this.athlete().teamId);
            // console.log("The props object is " + this.props.teamsList);
            // console.log("The props object at position " + i + " is " + this.props.teamsList[i]);
            // This will error. Do not uncomment. if(this.props.teamsList[i]._id.equals(this.athlete().teamId))
            // This will error. Do not uncomment. if(this.props.teamsList[i]._id == (this.athlete().teamId))
            if (this.props.teamsList[i]._id === (this.athlete().teamId)) {
                // Can't set state from here. massive loop errors.
                //console.log("The state team is " + this.state.team);
                //this.handleTeam(this.athlete().teamId);
                //console.log("The state team is now " + this.state.team);
                return this.props.teamsList[i].name + " " + this.props.teamsList[i].season;
            }
        }
    };

    /*showCurrentWeight method  */
    showCurrentWeight() {
        let preWeightDate = null;
        let postWeightDate = null;
        /* Check #1: If the selected athlete's preWeightData with index 0 is NOT undefined,
           the preWeightDate is set to the athlete's preWeightData on the date that it was
           set.     */
        if (this.athlete().preWeightData[0] !== undefined) {
            preWeightDate = this.athlete().preWeightData[0].date;
        }
        /* Check #2: If the selected athlete's postWeightData with index 0 is NOT undefined,
           the postWeightDate is set to that particular athlete's postWeightData on the date
           that it was set.     */
        if (this.athlete().postWeightData[0] !== undefined) {
            postWeightDate = this.athlete().postWeightData[0].date;
        }
        /* Check #3: If the postWeightDate AND the preWeightDate are both NOT null,
           then the weight of the athlete's postWeightData with index 0,
           will be returned as a number with 4 precision points, (i.e. 205.0)   */
        if (postWeightDate != null && preWeightDate != null) {
            return Number.parseFloat(this.athlete().postWeightData[0].weight).toPrecision(4);
        }
        /* Check #4: If the postWeightDate is NOT null,
           then the weight of the athlete's postWeightData with index 0,
           will be returned as a number with 4 precision points, (i.e. 205.0)   */
        else if (postWeightDate != null) {
            return Number.parseFloat(this.athlete().postWeightData[0].weight).toPrecision(4);
        }
        /* Check #4: If the preWeightDate is NOT null,
           then the weight of the athlete's preWeightData with index 0,
           will be returned as a number with 4 precision points, (i.e. 205.0)   */
        else if (preWeightDate != null) {
            return Number.parseFloat(this.athlete().preWeightData[0].weight).toPrecision(4);
        }
        /* In any other instance the athlete's baseWeight will be returned*/
        else {
            return this.athlete().baseWeight;
        }
    };

    /*Loss calculation method
     * Grabs and subtracts the showCurrentWeight by the baseWeight of the athlete */
    calcLoss() {
        let currentWeight = this.showCurrentWeight();
        let baseWeight = this.athlete().baseWeight;
        let weightChange = currentWeight - baseWeight;
        /*If the weightChange is greater than zero,
        * the weight change is returned along with the plus operator in front of the weight
        * change with the decimal format of four precision points.*/
        if (weightChange > 0) {
            return "+" + Number.parseFloat(weightChange).toPrecision(4);
        }
        /* If the weightChange is equal to zero,
         * the weight change is returned as zero in decimal format with four precision points. */
        else if (weightChange === 0) {
            return Number.parseFloat(weightChange).toPrecision(4);
        }
        /* In any other case, the weight change is returned within parenthesis in decimal
        * format with four precision points. */
        else {
            return "(" + Number.parseFloat(weightChange).toPrecision(4) + ")";
        }
    }

    /*Edit Entry method*/
    editEntry() {
        event.preventDefault();
        let pId = this.props.athleteId;
        let nm = this.state.name;
        let bw = this.state.base;
        let t = this.state.team;
        /* If any values are left blank, then accept the previous value in that athlete's information */
        if (nm === '') {
            nm = this.athlete().name;
        }
        if (bw === '') {
            bw = this.athlete().baseWeight;
        }
        if (t === '') {
            t = this.athlete().teamId;
        }
        /* Meteor method athletes.edit on the collections side will be called and an alert will be issued
         * stating that athlete was edited and that the edit was successful. '*/
        Meteor.call('athletes.edit', pId, nm, bw, t, () => {
            Bert.defaults = {hideDelay: 4500};
            Bert.alert('athlete edited', 'success', 'fixed-top', 'fa-check');
            this.setState({
                name: '',
                base: '',
                team: '',
            });
            this.close();
        });
    };

// Handlers
    /* handleName function -- sets the name equal to e.target.value */
    handleName = (e) => {
        e.persist();
        this.setState({name: e.target.value});
    };
    /* handleWeight function -- sets the base weight equal to e.target.value */
    handleWeight = (e) => {
        e.persist();
        this.setState({base: e.target.value});
    };
    /* handleTeam function -- sets the team equal to e.target.value */
    handleTeam = (e) => {
        e.persist();
        this.setState({team: e.target.value});
    };

    /* Upon firing, method will call the open function, which in turn will open the modal window. */
    handleEditButtonClick() {
        this.open();
    };

    /* Render method -- contains the modal form for editing an athlete's information,
     * such as the name, weight, and the team to which that player relates to. */
    render() {
        let athlete = this.props.athlete;
        let team = this.props.team;
        if (this.props.athleteLoading || this.props.teamLoading) {
            return null;
        }
        for (let i = 0; i < this.props.athletesList.length; i++) {
            if (this.props.athletesList[i]._id === this.props.athleteId) {
                return (
                    <div>
                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title>Athlete Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <FormGroup>
                                        <FormControl defaultValue={this.athlete().name} label='Name' type='string'
                                                     onChange={this.handleName}/>
                                        <FormControl defaultValue={this.athlete().baseWeight} label='Weight'
                                                     type='number' onChange={this.handleWeight}/>
                                        <FormControl defaultValue={this.athlete().teamId} value={this.state.team}
                                                     componentClass="select" label='Team' onChange={this.handleTeam}>
                                            {this.teams().map((team) => <option value={team._id}
                                                                                key={team._id}>{team.name} {team.season}</option>)}
                                        </FormControl>
                                    </FormGroup>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close} bsStyle="danger">Close</Button>
                                <Button onClick={this.editEntry} bsStyle="primary">Edit Athlete</Button>
                            </Modal.Footer>
                        </Modal>
                        <h3>Athlete Report</h3>
                        {/*TODO: Create component for the basic info*/}
                        <h4>{this.athlete().name} <Button bsSize="xsmall"
                                                          onClick={() => this.handleEditButtonClick()}><span
                            className="glyphicon glyphicon-pencil">{}</span></Button></h4>
                        <h5>Team: {this.getTeam()}</h5>
                        <h5>Base Weight: {this.athlete().baseWeight}</h5>
                        <h5>Current Weight: {this.showCurrentWeight()}</h5>
                        <h5>Total Weight Change: {this.calcLoss()}</h5>
                        <AthleteReportTable athlete={this.athlete()}/>
                    </div>
                )
            }
        }
        return this.routeToMaster();
    }//End Render
}//End Class
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
    //console.log(teamsList);
    //console.log(athletesList);
    //console.log(athleteLoading);
    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
        athleteId,
    };
})(AthleteReport);
