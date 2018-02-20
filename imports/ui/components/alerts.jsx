import React from 'react';
import { Table } from 'react-bootstrap';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AlertDropdownOfTeams from './alertDropdownOfTeams.jsx';
import {DropdownButton} from 'react-bootstrap';
import {CurrentUser} from '../../api/users.jsx';
import {Teams} from '../../api/teams.jsx';
import {Athletes} from '../../api/athletes.jsx';
import AthleteAlert from './athleteAlert.jsx';


export default class Alerts extends TrackerReact(React.Component) {
        constructor(props) {
            super(props);

            this.state = {
                showModal: false,
                name: '',
                weight: '',
                height: '',
                playerTeamId: '',
            };
            this.teams = this.teams.bind(this);
            this.athletes = this.athletes.bind(this);
            this.getCurrentTeam = this.getCurrentTeam.bind(this);
        }
        athletes() {
        return Athletes.find().fetch();
        }
        teams() {
            const curUser = CurrentUser.findOne();
            console.log(curUser);
            const id = curUser.userID;
            return Teams.find({user:id}).fetch();
        };

        displayCurrentTeam() {
            if(this.props.match.params.teamId) {
                teamId = this.props.match.params.teamId;
                currentTeam = Teams.findOne({"_id": teamId});
                return currentTeam.name + " " + currentTeam.season;
            }
            else{
                return "";
            }
        };
        getCurrentTeam ()
        {
            currentTeam = this.props.match.params.teamId;
            this.setState({
                playerTeamId : currentTeam
            });
        }


        render() {
            return (
                <div>
                    <div>
                        <span><h3>Alerts</h3></span>
                        <span>
                            <DropdownButton id={'Team Select'} title={'Team Select'} noCaret>
                                {this.teams().map((team)=>{return <AlertDropdownOfTeams key={team._id} team={team} />})}
                            </DropdownButton>
                        </span>
                        <h1> {this.displayCurrentTeam()} </h1>
                    </div>
                    <div>
                        <br/>
                        {/*TODO: Able to click on athlete to go athlete report screen*/}
                        <Table striped bordered condensed hover className="red">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Hydration %</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.athletes().map((athlete)=>{return <AthleteAlert key={athlete._id} athlete={athlete} />})}
                            </tbody>
                        </Table>
                        <Table striped bordered condensed hover className="yellow">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Hydration %</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.athletes().map((athlete)=>{return <AthleteAlert key={athlete._id} athlete={athlete} />})}
                            </tbody>
                        </Table>
                    </div>
                </div>

                )
        }
}