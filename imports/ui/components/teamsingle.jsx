import Button from 'muicss/lib/react/button';
import React, {Component} from 'react'
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';


export default class TeamSingle extends Component {

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
            <span className = "mui--pull-left">
                <ListGroupItem onClick={this.routeToReport}>
                  {this.props.team.name} {this.props.team.season}
                </ListGroupItem>
            </span>
            <span className = "mui--pull-right">
                <Button className="btn-cancel" variant="raised" color="danger" onClick={this.deleteTeam.bind(this)}>
                    &times;
                </Button>
            </span>
            <div className="mui--clearfix"></div>
        </ListGroup>
    )
  }
}
