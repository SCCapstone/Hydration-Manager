// Package Imports
import React, { Component } from 'react'
import { Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class ListOfTeams extends Component {

  // constructor(props) {
  //       super(props);
  //       this.state = {
  //           showModal: false,
  //       };
  //       this.open = this.open.bind(this);
  //       this.close = this.close.bind(this);
  //       this.routeToReport = this.routeToReport.bind(this);
  //       this.deleteTeam = this.deleteTeam.bind(this);
  // }
  //
  // routeToReport () {
  //       window.location ='/app/masterReport/'+ this.props.team._id;
  // }
  // deleteTeam() {
  //     Meteor.call('deleteTm',this.props.team._id)
  // }
  // open() {
  //       this.setState({showModal: true});
  // }
  // close() {
  //       this.setState({showModal: false});
  // }
  //
  // render() {
  //   return (
  //       <div>
  //           <div className="card">
  //               <p id = "close" onClick ={this.open}>&times;</p>
  //               <div className="InnerCard">
  //                   <Link to ={{pathname: "/app/masterReport/" + this.props.team._id}}>
  //                       <h4>{this.props.team.name}</h4>
  //                       <p>{this.props.team.season}</p>
  //                   </Link>
  //               </div>
  //           </div>
  //           <div>
  //               <Modal show={this.state.showModal} onHide={this.close} >
  //                   <Modal.Header>
  //                       <Modal.Title>Deleting a Team</Modal.Title>
  //                   </Modal.Header>
  //                   <Modal.Body>
  //                       <p>Are you sure you want to delete this Team?</p>
  //                   </Modal.Body>
  //                   <Modal.Footer>
  //                       <Button onClick={this.close}> Close </Button>
  //                       <Button onClick={this.deleteTeam} bsStyle="danger"> Delete team </Button>
  //                   </Modal.Footer>
  //               </Modal>
  //           </div>
  //       </div>
  // {/*TODO: make the list stretch across to the delete button*/}
  // {/*<ListGroupItem onClick={this.routeToReport}>*/}

    /*    <div>
      <ListGroup>

          <span className = "pull-left">

              <Link to ={{pathname: "/app/masterReport/" + this.props.team._id}}>
                  <ListGroupItem>
                  {this.props.team.name} {this.props.team.season}
                  </ListGroupItem>
              </Link>
          </span>
          <span className = "pull-right">
              <Button bsStyle="danger" onClick={this.deleteTeam.bind(this)}>
                  &times;
              </Button>
          </span>
      </ListGroup>
    </div>
*/

constructor(props) {
    super(props);
    this.state = {
               showModal: false,
               };
    this.routeToReport = this.routeToReport.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.deleteTeam = this.deleteTeam.bind(this);
}
    routeToReport () {
        window.location ='/app/masterReport/'+ this.props.team._id;
    }
    deleteTeam() {
        Meteor.call('teams.remove',this.props.team._id)
    }

    editTeam(){     /*TODO: LINK TO METHODS PROPERLY*/
        Meteor.call('teams.edit', this.props.team._id)
    }

    open() {
           this.setState({showModal: true});
     }
    close() {
           this.setState({showModal: false});
    }

    openEdit(){
        this.setState({showEditModal: true})
    }
    closeEdit(){
        this.setState({showEditModal: false})
    }

    /*TODO: FINISH THESE METHODS*/
    handleEditField(event){
        if ( event.keyCode === 13 ) {
            let target = event.target,
                update = {};

            update._id = this.state.editing;
            update[ target.name ] = target.value;

            this.handleTeamUpdate(update);
        }
    }
    handleEditItem() {
        let teamId = this.state.editing;

        this.handleTeamUpdate({
            _id: teamId,
            name: this.refs[ `name_${ teamId }` ].value,
            season: this.refs[ `season_${ teamId }` ].value,
        });
    }

/*     openConfirmEdit(){
        this.setState({showConfirmEditModal: true})
     }
     closeConfirmEdit(){
        this.setState({showConfirmEditModal: false})
     }*/

  render() {
    return (
      <div>
            <div className="card">
                <p id = "close" onClick ={this.open}>&times;</p>
                 <div className="InnerCard">
                    <Link to ={{pathname: "/app/masterReport/" + this.props.team._id}}>
                        <h4>{this.props.team.name}</h4>
                         <p>{this.props.team.season}</p>
                     </Link>
                     <Button bsStyle="warning" onClick={this.openEdit}>Edit</Button>
                 </div>
           </div>
          <div>
              <Modal show={this.state.showEditModal} onHide={this.closeEdit}>
                  <Modal.Header>
                      <Modal.Title>Edit Team</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <form>
                          <div className="form-group">
                              <label>Team Name</label>
                              <input onKeyDown={this.handleEditField} type="text" className="form-control" ref={this.props.team._id}
                                     name="teamName" defaultValue={this.props.team.name}/>
                          </div>
                          <div className="form-group">
                              <label>Season</label>
                              <input onKeyDown={this.handleEditField} type="text" className="form-control" ref={this.props.team._id}
                                     name="teamName" defaultValue={this.props.team.season}/>
                          </div>
                      </form>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={this.closeEdit}> Close </Button>
                      <Button onClick={this.handleEditTeam} bsStyle="warning"> Update Team </Button> {/*TODO: FINISH handleEditTeam METHOD*/}
                  </Modal.Footer>
              </Modal>
          </div>

          {/*---Confirm Edit Section Beginning---*/}
          {/*        <div>
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
          </div>*/}
          {/*---Confirm Edit Section Ending---*/}

           <div>
                <Modal show={this.state.showModal} onHide={this.close} >
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
     </div>
    )
  }
}
