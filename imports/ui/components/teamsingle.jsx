import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Tab from 'muicss/lib/react/tab';

import React, {Component} from 'react'

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
      <ul>

        <Button variant="flat" onClick={this.routeToReport}>
          {this.props.team.name} {this.props.team.season}
        </Button>
        <Button className="btn-cancel" variant="raised" color="danger"
                onClick={this.deleteTeam.bind(this)}>
                &times;
        </Button>

      </ul>
    )
  }
}
