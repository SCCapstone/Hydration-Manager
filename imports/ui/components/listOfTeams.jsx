import React, {Component} from 'react'
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class ListOfTeams extends Component {

constructor(props) {
    super(props);
    this.routeToReport = this.routeToReport.bind(this);
}
routeToReport () {
    window.location ='/app/masterReport/'+ this.props.team._id;
}
deleteTeam() {
  Meteor.call('team.delete',this.props.team._id)
}

  render() {
    return (
      <div>
        <ListGroup>
            {/*TODO: make the list strech across to the delete button */}
            <span className = "pull-left">
                {/*<ListGroupItem onClick={this.routeToReport}>*/}
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
            <div>{/*Null comment*/}</div>
        </ListGroup>
      </div>
    )
  }
}
