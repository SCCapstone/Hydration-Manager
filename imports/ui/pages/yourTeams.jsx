// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {withTracker} from 'meteor/react-meteor-data';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

// Custom File Imports
import TeamsCollection from '../../api/Teams/Teams.js';
import ListOfTeams from '../components/listOfTeams.jsx';
import Teams from "../../api/Teams/Teams";

class YourTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModal2: false,
            teamName: '',
            teamSeason: '',
        };
        // this.open = this.open.bind(this);
        // this.close = this.close.bind(this);
        // this.routeToReport = this.routeToReport.bind(this);
        // this.addTeam = this.addTeam.bind(this);
        // this.showTeamsList = this.showTeamsList.bind(this);
        autoBind(this);  //binds class methods to the component instance
    };

    // componentWillMount() {
    //   Roles.userIsInRole(user, ["ADMIN"]);
    // };
    componentWillUnmount() {
        this.props.subscriptions.forEach((s) => {
            s.stop();
        });
    };

    open() {
        this.setState({showModal: true});
    };

    close() {
        this.setState({showModal: false});
    };

    open2() {
        this.setState({showModal2: true});
    };

    close2() {
        this.setState({showModal2: false});
    };

    addTeam() {
        event.preventDefault();
        const teamName = this.state.teamName;
        const teamSeason = this.state.teamSeason;

        if (teamName !== "") {
            const curUser = this.props.name;  //CurrentUser.findOne();
            const id = this.props.userId;  //curUser.userID;
            const user = this.props.emailAddress;
            //console.log(curUser);
            //console.log(id);
            Meteor.call('teams.insert', teamName, teamSeason, id, user, () => {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Team Created', 'success', 'growl-top-left', 'fa-check');
                this.team = "";
                this.season = "";
                this.close();
            });
        }
    };

    addTeamCSV() {
        event.preventDefault();
        if (this.state.data !== undefined) {
            let TeamName = this.state.data[0][0];
            let TeamSeason = this.state.data[0][1];
            if (TeamName !== null && TeamSeason !== null) {
                let id = this.props.userId;
                let user = this.props.emailAddress;
                Meteor.call('teams.insert', TeamName, TeamSeason, id, user);
            }
            let myTeam = Teams.findOne({name: TeamName});
            for (let i = 1; i < this.state.data.length; i++) {
                let AthleteName = this.state.data[i][0];
                let AthleteWeight = this.state.data[i][1];
                if (AthleteName !== null && AthleteWeight !== null) {
                    Meteor.call('athletes.insert', AthleteName, AthleteWeight, myTeam._id);
                }
            }
        }
        this.close2();
    }

    handleTeam = (e) => {
        e.persist();
        this.setState({teamName: e.target.value});
    };
    handleSeason = (e) => {
        e.persist();
        this.setState({teamSeason: e.target.value});
    };

    uploadFile(event) {
        let file = event.target.files[0];
        let Papa = require("papaparse/papaparse.min.js");
        Papa.parse(file, {
            header: false,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: this.uploadData
        });
    }

    uploadData(result) {
        let data = result.data;
        this.setState({data: data});
        console.log(this.state.data);
    }

    render() {
        const props = this.props;
        return (
            <div>
                <div className="YourTeamHeader">
                    <h3>Your Teams</h3>
                    {props.userRoles[0] === "ADMIN" ?
                        <Button onClick={this.open} bsStyle="primary">&#43; Create a Team</Button> : ''}
                    {props.userRoles[0] === "ADMIN" ?
                        <Button onClick={this.open2} bsStyle="primary">&#43; Import a Team</Button> : ''}
                </div>
                <hr/>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl placeholder='Team Name' label='Team Name' type='text'
                                                 onChange={this.handleTeam}/><br/>
                                    <FormControl placeholder='Season' label='Season' type='text'
                                                 onChange={this.handleSeason}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}> Close </Button>
                            <Button onClick={this.addTeam} bsStyle="primary"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div>
                    <Modal show={this.state.showModal2} onHide={this.close2}>
                        <Modal.Header>
                            <Modal.Title>Import a CSV to Create a Team</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>To import a CSV file it needs to be in the format shown below</p><br/>
                            <img src="/images/example.png" alt={"Format for CSV"}/><br/>
                            <p>The first row should be the team name followed by the team's season as shown in the
                                example, Football - 1995</p>
                            <p>For the next rows if should be the athletes name followed by the athletes base weight as
                                shown in the example as Justin - 190. You can import as many athletes as you need
                                too.</p>
                            <p><strong>If the file is not in the above format your team will not be created
                                successfully.</strong></p><br/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close2}> Close </Button>
                            <span className="btn btn-primary btn-file">
                                    Upload CSV<input type="file"
                                                     name="myFile"
                                                     onChange={this.uploadFile}/>
                            </span>
                            <Button onClick={this.addTeamCSV} bsStyle="primary"> Import Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <ul className="ListOfTeams">
                    {this.props.teamsList.map((team) => {
                        return <ListOfTeams key={team._id} team={team}/>
                    })}
                </ul>
            </div>
        )
    }
}

YourTeams.propTypes = {
    userRoles: PropTypes.array.isRequired,
    subscriptions: PropTypes.array,
    loading: PropTypes.bool,
    teamsList: PropTypes.array
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(() => {
    const subscription = Meteor.subscribe('teams.all');
    const loading = !subscription.ready();
    const teamsList = !loading ? TeamsCollection.find().fetch() : [];
    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    //console.log(teamsList);

    return {
        subscriptions: [subscription],
        loading,
        teamsList,
    };
})(YourTeams);
