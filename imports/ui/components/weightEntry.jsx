import React from 'react';
import Dropdown from 'muicss/lib/react/dropdown';
import {Teams} from '../../api/teams.jsx';
import {CurrentUser} from '../../api/users.jsx';
import DropdownOfTeams from './dropdownOfTeams.jsx';
import { Table } from 'react-bootstrap';
import {debounce} from 'throttle-debounce';

import {Athletes} from '../../api/athletes.jsx';
import AthleteEntryList from './athlete_entry_list.jsx';

export default class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'Default',
            selectedDate: '2017-12-08'
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
        var curUser = CurrentUser.findOne();
        console.log(curUser);
        var id = curUser.userID;
        return Teams.find({user:id}).fetch();
    };
    athletes() {
        return Athletes.find().fetch();
    };
    render() {
        return (
            <div className="mui--align-center"><br/>

                <div>
                    <span className = "mui--pull-left"><h3>Weight Entry</h3></span>
                    <span className = "mui--pull-right">
                        {/*TODO: the dropdown looks weird, not sure why */}
                        <Dropdown color="primary" label="Select a Team">
                            {this.teams().map((team)=>{return <DropdownOfTeams key={team._id} team={team} />})}
                        </Dropdown>
                    </span>
                    <div className = "mui--clearfix">{/*Null comment*/}</div>
                </div><br/>

                <form className="mui--divider-top">
                    <br/>
                    <div className="mui--text-center">
                        <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange}/>
                    </div><br/>

                    <div className="mui--text-center">
                        <label>
                            <input type="radio" value="PreWeight" checked={this.state.selectedOption === 'PreWeight'} onChange={this.handleOptionChange}/>
                            PreWeight
                        </label>
                        <label>{/*Null Comment to add some spaaaace*/}</label>
                        <span>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="radio" value="PostWeight" checked={this.state.selectedOption === 'PostWeight'} onChange={this.handleOptionChange.bind(this)}/>
                                PostWeight
                            </label>
                        </span>
                    </div>
                    <div className = "mui--clearfix">{/*Null comment*/}</div><br/><br/><br/>

                    {/*TODO: Able to click on athlete to go athlete report screen*/}
                    <Table striped bordered condensed hover className="teams">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Weight Entry</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.athletes().map((athlete)=>{return <AthleteEntryList key={athlete._id} athlete={athlete} selOp={this.state.selectedOption} dat={this.state.selectedDate}/>})}
                        </tbody>
                    </Table>
                </form>
            </div>
        )
    }
}
