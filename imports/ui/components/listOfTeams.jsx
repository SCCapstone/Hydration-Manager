// Package Imports
import React, { Component } from 'react'
import { Button, Form, FormControl, FormGroup, Modal, DropdownButton, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';


// Custom File Imports
import TeamsCollection from '../../api/Teams/Teams.js';

export default class ListOfTeams extends Component {

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
/*        this.routeToReport = this.routeToReport.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.deleteTeam = this.deleteTeam.bind(this);
*/
    }

    routeToReport() {
        window.location = '/app/masterReport/' + this.props.team._id;
    }

    deleteTeam() {
        Meteor.call('teams.remove', this.props.team._id)
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    openEdit() {
        this.setState({showEditModal: true})
    }

    closeEdit() {
        this.setState({showEditModal: false})
    }

    editTeam() {     /*TODO: LINK TO METHODS PROPERLY*/
        Meteor.call('teams.edit', this.props.team._id)
    }

    handleEditName = (e) => {
        this.setState({teamEditName: e.target.value});
    }

    handleSeason = (e) => {
        this.setState({editSeason: e.target.value});
    }


    editEntry() {
        event.preventDefault();
        const pID = this.props.team._id;
        const nm = this.state.teamEditName;
        const s = this.state.editSeason;
        if(pID == '' || nm == '' || s == '')
        {
            window.alert("Make sure to complete all fields for editing.");
        }
        else {
            Meteor.call('teams.edit', pID, nm, s, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('team edited', 'success', 'fixed-top', 'fa-check');

                this.setState({
                    teamEditName: '',
                    editSeason: '',
                })
                this.closeEdit();
            });
        }

        this.close();
    }

    /*TODO: FINISH THESE METHODS*/
/*    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target,
                update = {};

            update._id = this.state.editing;
            update[target.name] = target.value;

            this.handleTeamUpdate(update);
        }
    }

    handleEditItem() {
        let teamId = this.state.editing;

        this.handleTeamUpdate({
            _id: teamId,
            name: this.refs[`name_${ teamId }`].value,
            season: this.refs[`season_${ teamId }`].value,
        });
    }
*/
    render() {
        return (
            <div className="CardContainer">
                <div className="card">
                    <DropdownButton id="close" title="">
                        <MenuItem onClick={this.openEdit}>Edit Team</MenuItem>
                        <MenuItem onClick={this.open}>Delete Team</MenuItem>
                    </DropdownButton>
                    <div className="InnerCard">
                        <Link to={{pathname: "/app/masterReport/" + this.props.team._id}}>
                            <h4>{this.props.team.name}</h4>
                            <p>{this.props.team.season}</p>
                        </Link>
                    </div>
                </div>
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
                <div>
                    <Modal show={this.state.showEditModal} onHide={this.closeEdit} >
                        <Modal.Header>
                            <Modal.Title>Team Edit</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl placeholder={this.props.team.name} label='name' type='text' onChange={this.handleEditName}/><br/>
                                    <FormControl placeholder={this.props.team.season} label='season' type='text' onChange={this.handleSeason}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeEdit}>Close</Button>
                            <Button onClick={this.editEntry} bsStyle="primary">Edit Team</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            /*---Confirm Edit Section Beginning---*/
            /*
                          <div>
                              <Modal show={this.state.showConfirmEditModal} onHide={this.closeConfirmEdit}>
                                  <Modal.Header>
                                      <Modal.Title>Edit Team</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                      <p>Are you sure you would like to edit this team?</p>
                                  </Modal.Body>
                                  <Modal.Footer>
                                      <Button onClick={this.closeConfirmEdit}> Close </Button>
                                      <Button onClick={this.confirmEdit} bsStyle="warning"> Confirm Team Edit </Button>
                                  </Modal.Footer>
                              </Modal>
                          </div>*/
            /*---Confirm Edit Section Ending---*/
        )
    }
}

