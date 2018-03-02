// Package Imports
import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, FormControl, FormGroup, ListGroup, Modal} from 'react-bootstrap';

// Custom File Imports
import TeamsCollection from '../../api/Teams/Teams.js';
import ListOfTeams from './listOfTeams.jsx';


class YourTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            teamName: '',
            teamSeason: '',
        };
        // this.open = this.open.bind(this);
        // this.close = this.close.bind(this);
        // this.routeToReport = this.routeToReport.bind(this);
        // this.addTeam = this.addTeam.bind(this);
        // this.showTeamsList = this.showTeamsList.bind(this);
        autoBind(this);  //binds class methods to the component instance
    }

    // componentWillMount() {
    //   Roles.userIsInRole(user, ["ADMIN"]);
    // }

    componentWillUnmount() {
      this.props.subscriptions.forEach((s) =>{
        s.stop();
      });
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
            teamSeason: e.target.value
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

    render() {
        return (
            <div>
                <h3>Your Teams</h3>
                <div className="YourTeamHeader">
                    <span><Button onClick={this.open} bsStyle="primary">Create a Team</Button></span>
                </div>
                <hr/>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl placeholder='Team Name' label='Team Name' type='text' onChange={this.handleTeam}/><br/>
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
                <div>
                    <br/>
                    <ListGroup className="teams">
                        {this.props.teamsList.map((team)=>{return <ListOfTeams key={team._id} team={team} />})}
                    </ListGroup>

                </div>
            </div>
        )
    }
}

YourTeams.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool,
  teamsList: PropTypes.array
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(() => {
  const subscription = Meteor.subscribe('teams.thisUserId');
  const loading = !subscription.ready();
  const teamsList = !loading ? TeamsCollection.find().fetch() : [];
  // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  // match: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  console.log(teamsList);

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
