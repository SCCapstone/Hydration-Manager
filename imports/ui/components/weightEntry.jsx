import React from 'react';

import { DropdownButton } from 'react-bootstrap';

import WeightDropdownOfTeams from './weightDropdownOfTeams.jsx';
import { Teams } from '../../api/teams.jsx';
import { CurrentUser } from '../../api/users.jsx';
import { Table } from 'react-bootstrap';
import { debounce } from 'throttle-debounce';

import {Athletes} from '../../api/athletes.jsx';
import AthleteEntryList from './athlete_entry_list.jsx';

export default class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Default',
            selectedDate: '',
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDateChange =  this.handleDateChange.bind(this);
        this.handleDebounce = debounce(1000, this.handleDebounce);
    };

    handleDebounce = () => {
        console.log('The selected option is:',this.state.selectedOption);
    };

    handleOptionChange = (e) => {
        this.setState({selectedOption: e.target.value});
        this.handleDebounce();
    };
    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({selectedDate: e.target.value});
        console.log('The date you selected is:', e.target.value);
    };

    teams() {
        const curUser = CurrentUser.findOne();
        console.log(curUser);
        const id = curUser.userID;
        return Teams.find({user:id}).fetch();
    };
    athletes() {
        currentTeam = "";
        const curUser = CurrentUser.findOne();
        const id = curUser.userID;
        if(this.props.match.params.teamId) {
            teamId = this.props.match.params.teamId;
            currentTeam = Teams.findOne({"_id": teamId, user:id});
            return Athletes.find({teamId: currentTeam._id}).fetch();
        }
        else{
            return null;
        }
    };

    displayAthletes() {
        if(this.athletes() != null) {
            return (this.athletes().map((athlete) => {
                return <AthleteEntryList key={athlete._id} athlete={athlete} selOp={this.state.selectedOption}
                                         dat={this.state.selectedDate}/>
            }))
        }
        else{
            return <li>Select a Team</li>
        }
        }

    displayCurrentTeam() {
        if(this.props.match.params.teamId) {
            teamId = this.props.match.params.teamId;
            currentTeam = Teams.findOne({"_id": teamId});
            return currentTeam.name + " " + currentTeam.season;
        }
        else{
            return "";
        }
    }
    render() {
        return (
            <div>
                <div>
                    <span><h3>Weight Entry</h3></span>
                    <span>
                        <DropdownButton id={'Team Select'} title={'Team Select'} noCaret>
                           {this.teams().map((team)=>{return <WeightDropdownOfTeams key={team._id} team={team} />})}
                        </DropdownButton>
                    </span>
                    <h1>{this.displayCurrentTeam()}</h1>
                    <div>{/*Null comment*/}</div>
                </div><br/>

                <form>
                    <br/>
                    <div>
                        <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange}/>
                    </div><br/>

                    <div>
                        {/*TODO: Look into changing these radio buttons to a toggle*/}
                        <label>
                            <input type="radio" value="PreWeight" checked={this.state.selectedOption === 'PreWeight'} onChange={this.handleOptionChange}/>
                            PreWeight
                        </label>
                        {/*TODO: Fix this label hack*/}
                        <label>{/*Null Comment to add some spaaaace*/}</label>
                        <span>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="radio" value="PostWeight" checked={this.state.selectedOption === 'PostWeight'} onChange={this.handleOptionChange.bind(this)}/>
                                PostWeight
                            </label>
                        </span>
                    </div>
                    <div>{/*Null comment*/}</div><br/><br/><br/>

                    {/*TODO: Able to click on athlete to go athlete report screen*/}
                    <Table striped bordered condensed hover className="teams">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight Entry</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.displayAthletes()}
                        {/*{this.athletes().map((athlete)=>{return <AthleteEntryList key={athlete._id} athlete={athlete} selOp={this.state.selectedOption} dat={this.state.selectedDate}/>})}*/}
                        </tbody>
                    </Table>
                </form>
            </div>
        )
    }
}
