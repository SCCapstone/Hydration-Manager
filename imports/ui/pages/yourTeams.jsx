// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {withTracker} from 'meteor/react-meteor-data';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

// Custom File Imports
import TeamsCollection from '../../api/Teams/Teams.js';
import ListOfTeams from '../components/listOfTeams.jsx';


class YourTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            teamName: '',
            teamSeason: '',
        };
        // this.open = this.open.bind(this);
        // this.close = this.close.bind(this);
        // this.routeToReport = this.routeToReport.bind(this);
        // this.addTeam = this.addTeam.bind(this);
        // this.showTeamsList = this.showTeamsList.bind(this);
        autoBind(this);  //binds class methods to the component instance
    }

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
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Team Created', 'success', 'fixed-top', 'fa-check');
                this.team = "";
                this.season = "";
                this.close();
            });
        }
    };

    handleTeam = (e) => {
        e.persist();
        this.setState({teamName: e.target.value});
    };
    handleSeason = (e) => {
        e.persist();
        this.setState({teamSeason: e.target.value});
    };

    render() {
        return (
            <div>
                <div className="YourTeamHeader">
                    <h3>Your Teams</h3>
                    <Button onClick={this.open} bsStyle="primary">&#43; Create a Team</Button>
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
                                    <FormControl placeholder='Team Name' label='Team Name' type='text' onChange={this.handleTeam}/><br/>
                                    <FormControl placeholder='Season' label='Season' type='text' onChange={this.handleSeason}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}> Close </Button>
                            <Button onClick={this.addTeam} bsStyle="primary"> Create Team </Button>
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
