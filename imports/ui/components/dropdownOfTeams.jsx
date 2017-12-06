import React, {Component} from 'react'
import DropdownItem from 'muicss/lib/react/dropdown-item';

export default class DropdownOfTeams extends Component {

constructor(props) {
    super(props);
}
  render() {
    return (
        <div>
            <DropdownItem>
                {this.props.team.name} {this.props.team.season}
            </DropdownItem>
        </div>
    )
  }
}
