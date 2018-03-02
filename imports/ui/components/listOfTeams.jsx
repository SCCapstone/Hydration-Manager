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
}
    routeToReport () {
        window.location ='/app/masterReport/'+ this.props.team._id;
    }
    deleteTeam() {
        Meteor.call('teams.remove',this.props.team._id)
    }

    open() {
           this.setState({showModal: true});
     }
     close() {
           this.setState({showModal: false});
     }

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
                 </div>
           </div>
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
