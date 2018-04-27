// Package Imports
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import autoBind from 'react-autobind';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

// Custom File Imports
import AthletesCollection from '../../api/Athletes/Athletes.js';
import TeamsCollection from '../../api/Teams/Teams.js';
import AthleteReportTable from '../components/athleteReportTable';
import AthleteChart from '../components/AthleteChart';

class AthleteReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModalDelete: false,
            name: '',
            base: '',
            team: '',
        };
        autoBind(this);
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
        Meteor.call('athletes.remove', this.athlete()._id);
        Bert.defaults = {hideDelay: 3500};
        Bert.alert('Athlete Deleted', 'success', 'growl-top-left', 'fa-info');
        this.closeDelete();
        this.routeToMaster();

    };

    routeToMaster() {
        window.location = '/app/masterReport';
    };

    /*athlete component*/
    athlete() {
        /* If this.props.athleteId, athleteId is set to this.props.athleteId.*/
        if (this.props.athleteId) {
            let athleteId = this.props.athleteId;
            let currentAthlete = '';
            /* Finally the athletesLists is iterated through. While iterating through,
               the athleteList id attributes are checked to see if they are equal to
               the athleteId attribute.*/
            for (let i = 0; i < this.props.athletesList.length; i++) {
                /* Finally, if this check passes as true, the currentAthlete
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

    openDelete() {
        this.setState({showModalDelete: true});
    };

    //close method
    closeDelete() {
        this.setState({showModalDelete: false});
    };

    getCurrentTeam() {
        this.setState({team: this.props.teamId});
    }

    /*getTeam function returns teams name and season*/
    getTeam() {
        for (let i = 0; i < this.props.teamsList.length; i++) {
            // This will error. Do not uncomment. if(this.props.teamsList[i]._id.equals(this.athlete().teamId))
            // This will error. Do not uncomment. if(this.props.teamsList[i]._id == (this.athlete().teamId))
            if (this.props.teamsList[i]._id === (this.athlete().teamId)) {
                // Can't set state from here. massive loop errors.
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
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('athlete edited', 'success', 'growl-top-left', 'fa-check');
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
        const props = this.props;
        const users = this.props.usersList;
        if (this.props.athleteLoading || this.props.teamLoading) {
            return null;
        }
        for (let i = 0; i < this.props.athletesList.length; i++) {
            if (this.props.athletesList[i]._id === this.props.athleteId) {
                return (
                    <div>
                        {/*Beginning of Deleting Modal Confirmation*/}
                        <div>
                            <Modal show={this.state.showModalDelete} onHide={this.closeDelete}>
                                <Modal.Header>
                                    <Modal.Title>Deleting an Athlete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Are you sure you want to delete this Athlete?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.closeDelete}> Close </Button>
                                    <Button onClick={this.deleteAthlete} bsStyle="danger">Delete Athlete</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        {/*Ending of Deleting Modal Confirmation*/}
                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title>Athlete Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <FormGroup>
                                        <FormControl defaultValue={this.athlete().name} label='Name' type='string'
                                                     onChange={this.handleName}/><br/>
                                        <FormControl defaultValue={this.athlete().baseWeight} label='Weight'
                                                     type='number' onChange={this.handleWeight}/><br/>
                                        <FormControl defaultValue={this.athlete().teamId} value={this.state.team}
                                                     componentClass="select" label='Team' onChange={this.handleTeam}>
                                            {this.teams().map((team) => <option value={team._id}
                                                                                key={team._id}>{team.name} {team.season}</option>)}
                                        </FormControl>
                                    </FormGroup>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close}>Close</Button>
                                {props.userRoles[0] === "ADMIN" ?
                                    <Button onClick={this.openDelete} bsStyle="danger">Delete Athlete</Button> : ''}
                                <Button onClick={this.editEntry} bsStyle="primary">Edit Athlete</Button>

                            </Modal.Footer>
                        </Modal>
                        <h3>Athlete Report</h3>
                        <h4>{this.athlete().name} - {this.getTeam()} - {this.athlete().baseWeight} <Button
                            bsSize="xsmall" onClick={() => this.handleEditButtonClick()}><span
                            className="glyphicon glyphicon-pencil">{}</span></Button></h4><br/>
                        <div>
                            <div className="col-md-8 col-sm-10">
                                <AthleteChart athlete={this.athlete()}/><br/><br/>
                            </div>
                            <div className="col-md-10 col-sm-11">
                                <AthleteReportTable athlete={this.athlete()}/>
                            </div>
                        </div>
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
    usersList: PropTypes.array,
    loading: PropTypes.bool,
};
// Retrieves data from server and puts it into client's minimongo
export default withTracker(({match}) => {
    const subscription = Meteor.subscribe('users.all');
    const teamSubscription = Meteor.subscribe('teams.all');
    const athleteSubscription = Meteor.subscribe('athletes.all');
    const teamLoading = !teamSubscription.ready();
    const athleteLoading = !athleteSubscription.ready();
    const teamsList = !teamLoading ? TeamsCollection.find().fetch() : [];
    const athletesList = !athleteLoading ? AthletesCollection.find().fetch() : [];
    const athleteId = match.params.athleteId;
    const usersList = !loading ? Meteor.users.find().fetch() : [];
    const loading = !subscription.ready();
    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
        teamsList,
        athletesList,
        athleteId,
    };
})(AthleteReport);
