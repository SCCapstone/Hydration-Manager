// Package Imports
import React, {Component} from 'react'
import {Button, FormControl, FormGroup, Modal, DropdownButton, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {Meteor} from "meteor/meteor";


// Custom File & Collections Imports

export default class ListOfTeams extends Component {
    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showEditModal: false,
            teamEditName: '',
            editSeason: '',
            teamID: '',
        };
        autoBind(this);
    }

    //Edit teams method that calls to the Meteor server established method passing through the team._id
    editTeam() {
        Meteor.call('teams.edit', this.props.team._id)
    }

    //deleteTeam Method -- makes call to Teams Collection to remove the selected team
    deleteTeam() {
        Meteor.call('teams.remove', this.props.team._id)
    };

    /* editEntry method -- edits the team
     - Takes in inputs: teamEditName and editSeason
     - Alerts the editor to complete all fields when editing
     - Calls to the server to make changes to teams collection
         --Passes in team_id(pID), teamEditName(nm), and editSeason(s)
     - Provides an alert upon completion of the edit, and closing of the modal
    */
    editEntry() {
        event.preventDefault();
        const pID = this.props.team._id;
        let nm = this.state.teamEditName;
        let s = this.state.editSeason;
        /*if (pID === '' || nm === '' || s === '') {
            window.alert("Make sure to complete all fields for editing.");
        }*/
        if (nm === '') {
            nm = this.props.team.name;
        }
        if (s === '') {
            s = this.props.team.season;
        }
        Meteor.call('teams.edit', pID, nm, s, () => {
            Bert.defaults = {hideDelay: 3500};
            Bert.alert('Team edited', 'success', 'growl-top-left', 'fa-check');
            this.setState({teamEditName: '', editSeason: ''});
            this.closeEdit();
        });
        this.close();
    };

    //open Method -- open the modal for the Team Deletion Confirmation Modal
    open() {
        this.setState({showModal: true});
    };

    //close Method -- closes the modal for the Team Deletion Confirmation Modal
    close() {
        this.setState({showModal: false});
    };

    //openEdit Method -- opens the modal for the Team Edit Modal
    openEdit() {
        this.setState({showEditModal: true})
    };

    //closeEdit Method -- closes the modal for the Team Edit Modal
    closeEdit() {
        this.setState({showEditModal: false})
    };

    //handleEditName method that sets the teamEditName state
    handleEditName = (e) => {
        this.setState({teamEditName: e.target.value});
    };
    //handleSeason method that sets the editSeason state
    handleSeason = (e) => {
        this.setState({editSeason: e.target.value});
    };

    handleView() {
        //let userID = this.props.user._id;
        //let id = this.user._id;
        //console.log(usersList);
        //console.log(userID);
        //console.log("this.user._id "+this.user._id);
        //console.log("this.user()._id "+this.user()._id);
        //console.log("this.users()._id "+this.users()._id);
        let currentUser = Meteor.user();
        if (currentUser !== null) {
            let check = false;
            for (let i = 0; i < currentUser.profile.teamAccess.length; i++) {
                if (this.props.team._id === currentUser.profile.teamAccess[i]) {
                    check = true;
                }
            }
            return check;
        }
        else return false;
    };

    render() {
        return (
            <div className="CardContainer">
                {/*Beginning of Card*/}
                {this.handleView() || Meteor.user().roles[0] === "ADMIN" ?
                    <div className="card">
                        <DropdownButton id="close" title="">
                            <MenuItem onClick={this.openEdit}>Edit Team</MenuItem>
                            {Meteor.user().roles[0] === "ADMIN" ?
                                <MenuItem onClick={this.open}>Delete Team</MenuItem> : ''}
                        </DropdownButton>
                        <div className="InnerCard">
                            <Link to={{pathname: "/app/masterReport/" + this.props.team._id}}
                                  className={this.props.team._id + "card"}>
                                <h4>{this.props.team.name}</h4>
                                <p>{this.props.team.season}</p>
                            </Link>
                        </div>
                    </div> : ''}
                {/*Ending of Card*/}
                {/*Beginning of Deleting Modal Confirmation*/}
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Deleting a Team</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete this Team?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}> Close </Button>
                            <Button onClick={this.deleteTeam} bsStyle="danger"> Delete team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {/*Ending of Deleting Modal Confirmation*/}
                {/*Beginning of Edit Teams Modal */}
                <div>
                    <Modal show={this.state.showEditModal} onHide={this.closeEdit}>
                        <Modal.Header>
                            <Modal.Title>Team Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl defaultValue={this.props.team.name} label='name' type='text'
                                                 onChange={this.handleEditName}/><br/>
                                    <FormControl defaultValue={this.props.team.season} label='season' type='text'
                                                 onChange={this.handleSeason}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeEdit}>Close</Button>
                            <Button onClick={this.editEntry} bsStyle="primary">Edit Team</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {/*Ending of Edit Teams Modal */}
            </div>
        )
    }
}