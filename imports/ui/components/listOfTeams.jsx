// Package Imports
import React, {Component} from 'react'
import {Button, FormControl, FormGroup, Modal, DropdownButton, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import autoBind from 'react-autobind';


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

    /*  //routeToReport Method -- sends the user to the masterReport page for the selected team
        routeToReport() {
            window.location = '/app/masterReport/' + this.props.team._id;
        }
    */

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
        const nm = this.state.teamEditName;
        const s = this.state.editSeason;
        if (pID === '' || nm === '' || s === '') {
            window.alert("Make sure to complete all fields for editing.");
        }
        else {
            Meteor.call('teams.edit', pID, nm, s, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('team edited', 'success', 'fixed-top', 'fa-check');
                this.setState({teamEditName: '', editSeason: ''});
                this.closeEdit();
            });
        }
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

    render() {
        return (
            <div className="CardContainer">
                {/*Beginning of Card*/}
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