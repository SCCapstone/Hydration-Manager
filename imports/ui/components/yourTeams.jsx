import React from 'react';

import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import {Modal} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Teams} from '../../api/teams.jsx';
import ListOfTeams from './listOfTeams.jsx';
import {User} from '../../api/users.jsx';


export default class YourTeams extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            teamName: '',
            teamSeason: '',
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.routeToReport = this.routeToReport.bind(this);
        this.addTeam = this.addTeam.bind(this);
    }

    routeToReport() {
        window.location = '/app/masterReport';
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    addTeam() {
        event.preventDefault();
        const teamName = this.state.teamName;
        const teamSeason = this.state.teamSeason;

        if (teamName != "") {
            const curUser = CurrentUser.findOne();
            const id = curUser.userID;

            Meteor.call('addNewTeam', teamName, teamSeason, id, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Team Created', 'success', 'fixed-top', 'fa-check');

                this.team = "";
                this.season = "";
                this.close();
            });
        }
    }

    teams() {
       // const curUser = CurrentUser.findOne();
       // console.log(curUser);
       // const id = curUser.userID;
       // return Teams.find({user: id}).fetch();
        return Teams.find().fetch();
    }

    handleTeam = (e) => {
        e.persist();
        this.setState({
            teamName: e.target.value
        });
    }
    handleSeason = (e) => {
        e.persist();
        this.setState({
            teamSeason : e.target.value
        });
    }
/*
    FieldGroup({id, label, help, ...props}) {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props}/>
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }
    formInstance = (
        <form>
            <FieldGroup id="formControlsTeam" type="text" label="text"/>
            <FieldGroup id="formControlsSeason" type="text" label="text"/>
            <Button type="submit">Submit</Button>
        </form>
    );
*/

    render () {
        return (
            <div>
                <div className="YourTeamHeader">
                    <h3>Your Team's</h3>
                    <Button onClick={this.open} bsStyle="primary">Create a Team</Button>
                </div>
                <hr/>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
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
                            <Button onClick={this.close} bsStyle="danger"> Close </Button>
                            <Button onClick={this.addTeam} bsStyle="success"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div>
                    <ListGroup className="teams">
                        {this.teams().map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>
                </div>
            </div>
        )
    }
}