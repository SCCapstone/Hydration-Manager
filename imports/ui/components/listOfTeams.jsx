import React, {Component} from 'react'
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class ListOfTeams extends Component {

constructor(props) {
    super(props);
    this.routeToReport = this.routeToReport.bind(this);
}
routeToReport () {
    window.location ='/app/masterReport';
}
deleteTeam() {
  Meteor.call('deleteTm',this.props.team._id)
}

  render() {
    return (
        <ListGroup>
            {/*TODO: make the list strech across to the delete button */}
            <span className = "pull-left">
                <ListGroupItem onClick={this.routeToReport}>
                  {this.props.team.name} {this.props.team.season}
                </ListGroupItem>
            </span>
            <span className = "pull-right">
                <Button bsStyle="danger" onClick={this.deleteTeam.bind(this)}>
                    &times;
                </Button>
            </span>
            <div>{/*Null comment*/}</div>
        </ListGroup>
    )
  }
}
