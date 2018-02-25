import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import {FormControl} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {Button, Table} from 'react-bootstrap';

import {Modal} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

//import {Teams} from '../../api/teams.jsx';
import TeamsCollection from '../../api/Teams/Teams.js';
import ListOfTeams from './listOfTeams.jsx';
import {CurrentUser} from '../../api/users.jsx';


//export default class YourTeams extends TrackerReact(React.Component) {
class YourTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            teamName: '',
            teamSeason: '',
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.routeToReport = this.routeToReport.bind(this);
        this.addTeam = this.addTeam.bind(this);
        this.showTeamsList = this.showTeamsList.bind(this);
    }

    routeToReport() {
        window.location = '/app/masterReport';
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }

    addTeam() {
        event.preventDefault();
        const teamName = this.state.teamName;
        const teamSeason = this.state.teamSeason;

        if (teamName != "") {
            const curUser = this.props.name;  //CurrentUser.findOne();
            const id = this.props.userId;  //curUser.userID;
            console.log(curUser);
            console.log(id);

            Meteor.call('teams.insert', teamName, teamSeason, id, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Team Created', 'success', 'fixed-top', 'fa-check');

                this.team = "";
                this.season = "";
                this.close();
            });
        }
    }

    // teams() {
    //     const curUser = this.props.name;  //CurrentUser.findOne();
    //     console.log(curUser);
    //     const id = this.props.userId;  //curUser.userID;
    //     return Teams.find({user: id}).fetch();
    // }
/*
    handleAddTeam(e){
        //this.setState({value1: e.target.value1});
        this.team = this.state.value1;
        this.season = this.state.value2;
        addTeam();
    }
 */
    handleTeam = (e) => {
        e.persist();
        this.setState({
            teamName: e.target.value
        });
    }
    handleSeason = (e) => {
        e.persist();
        this.setState({
            teamSeason : e.target.value
        });
    }
/*
    FieldGroup({id, label, help, ...props}) {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props}/>
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }
    formInstance = (
        <form>
            <FieldGroup id="formControlsTeam" type="text" label="text"/>
            <FieldGroup id="formControlsSeason" type="text" label="text"/>
            <Button type="submit">Submit</Button>
        </form>
    );
*/
    showTeamsList() {
      const teamsL = this.props.teamsList;
      return (
        <tbody>
        {
          teamsL.map((tm, idx) =>
            <tr key={idx}>
              <td>{idx + 1} </td>
              <td>{tm.name}</td>
              <td>{tm.season}</td>
            </tr>
          )
        }
        </tbody>
      );
    }

    render () {
        return (
            <div>
                <div>
                    <span><h3>Your Teams</h3></span>
                    <span><Button onClick={this.open} bsStyle="primary">Create a Team</Button></span>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl placeholder='Team Name' label='Team Name' type='text' onChange={this.handleTeam}/>
                                    <FormControl placeholder='Season' label='Season' type='text' onChange={this.handleSeason}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} bsStyle="danger"> Close </Button>
                            <Button onClick={this.addTeam} bsStyle="success"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div>
                    <br/>
                    <ListGroup className="teams">
                        {this.props.teamsList.map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>

                    <div>
                      <Table className="AdminTable" striped bordered condensed hover responsive >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Season</th>
                          </tr>
                        </thead>
                        {this.showTeamsList()}
                      </Table>
                    </div>

                </div>
            </div>
        )
    }
}

// YourTeams.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
//   //match: PropTypes.object.isRequired,
//   //history: PropTypes.object.isRequired,
// };
//
// export default withTracker(() => {
//   const subscription = Meteor.subscribe('teams');
//   return {
//     loading: !subscription.ready(),
//     teamsList: TeamsCollection.find().fetch(),
//   };
// })(YourTeams);

YourTeams.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool,
  teamsList: PropTypes.array
};

// Fetch User & Role data from server
export default withTracker(() =>{
  const subscription = Meteor.subscribe('teams');
  const loading = !subscription.ready();
  const teamsList = !loading ? TeamsCollection.find().fetch() : [];

  return {
    subscriptions: [subscription],
    loading,
    teamsList,
  };
})(YourTeams);


    /*
    render () {
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Your Team's</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create a Team</Button></span>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form>
                                <input ref={el => {this.team = el;}} required = {true} />
                                <input ref={el => {this.season = el;}} required = {true} />
                            </form>
                            <form>
                                <FormControl type='input' value={el => {this.team = el;}}></FormControl>
                                <FormControl type='input' value={el => {this.season = el;}}></FormControl>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} variant="raised"> Close </Button>
                            <Button onClick={this.addTeam} variant="raised" color="primary"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    <ListGroup className="teams">
                        {this.teams().map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>
                </div>
            </div>
        )
    }
}
*/
