import React from 'react';

import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import {Modal} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Teams} from '../../api/teams.jsx';
import ListOfTeams from './listOfTeams.jsx';
import {CurrentUser} from '../../api/users.jsx';


export default class YourTeams extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            value1: '',
            value2: '',
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
        const teamName = this.team;
        const teamSeason = this.season;

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
        const curUser = CurrentUser.findOne();
        console.log(curUser);
        const id = curUser.userID;
        return Teams.find({user: id}).fetch();
    }
/*
    handleAddTeam(e){
        //this.setState({value1: e.target.value1});
        this.team = this.state.value1;
        this.season = this.state.value2;
        addTeam();
    }
 */
    handleTeam(e){
        this.team = e.value;
    }
    handleSeason(e){
        this.season = e.value;
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
                <br/>
                <div>
                    <span><h3>Your Team's</h3></span>
                    <span><Button onClick={this.open} bsStyle="primary">Create a Team</Button></span>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl placeholder='Team Name' label='Team Name' type='text' value={this.target} onChange={this.handleTeam}/>
                                    <FormControl placeholder='Season' label='Season' type='text' value={this.target} onChange={this.handleSeason}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} bsStyle="danger"> Close </Button>
                            <Button onClick={this.addTeam} bsStyle="success"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div>
                    <br/>
                    <ListGroup className="teams">
                        {this.teams().map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>
                </div>
            </div>
        )
    }
}
    /*
    render () {
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Your Team's</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create a Team</Button></span>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form>
                                <input ref={el => {this.team = el;}} required = {true} />
                                <input ref={el => {this.season = el;}} required = {true} />
                            </form>
                            <form>
                                <FormControl type='input' value={el => {this.team = el;}}></FormControl>
                                <FormControl type='input' value={el => {this.season = el;}}></FormControl>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} variant="raised"> Close </Button>
                            <Button onClick={this.addTeam} variant="raised" color="primary"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    <ListGroup className="teams">
                        {this.teams().map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>
                </div>
            </div>
        )
    }
}
*/