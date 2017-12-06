import React from 'react';
import Button from 'muicss/lib/react/button';
import Dropdown from 'muicss/lib/react/dropdown';

import {Teams} from '../../api/teams.jsx';
import {CurrentUser} from '../../api/users.jsx';
import DropdownOfTeams from './dropdownOfTeams.jsx';

export default class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'PreWeight',
            selectedDate: '2017-12-08'
        };
        console.log('The DEFAULT date is:', this.state.selectedDate);
        console.log('You DEFAULT radio option is:', this.state.selectedOption);

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDateChange =  this.handleDateChange.bind(this);
    };

    handleOptionChange = (e) => {
        this.setState({selectedOption: e.target.value});
        console.log('You have selected:', e.target.value);

    }
    handleDateChange = (e) => {
        this.setState({selectedDate: e.target.value});
        console.log('The date you selected is:', e.target.value);

    }

    teams() {
        var curUser = CurrentUser.findOne();
        console.log(curUser);
        var id = curUser.userID;
        return Teams.find({user:id}).fetch();
    }

    render() {
        return (
            <div className="mui--align-center">
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Weight Entry</h3></span>
                    <span className = "mui--pull-right">
                        {/*TODO: the dropdown looks weird, not sure why */}
                        <Dropdown color="primary" label="Select a Team">
                            {this.teams().map((team)=>{return <DropdownOfTeams key={team._id} team={team} />})}
                        </Dropdown>
                    </span>
                    <div className = "mui--clearfix"></div>
                </div>
                <br/>
                <form className="mui--divider-top">
                    <br/>
                    <div>
                        <div className = "mui--pull-left">
                            <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange.bind(this)}/>
                        </div>
                        <div className="mui--align-top">
                            <div className="radio" >
                                {/*TODO: this is not how you do this, but Im also lazy */}
                                <label>

                                </label>
                                <label>
                                    <input type="radio" value="PreWeight" checked={this.state.selectedOption === 'PreWeight'} onChange={this.handleOptionChange.bind(this)}/>
                                    PreWeight
                                </label>
                                <label>

                                </label>
                                <label>
                                    <input type="radio" value="PostWeight" checked={this.state.selectedOption === 'PostWeight'} onChange={this.handleOptionChange.bind(this)}/>
                                    PostWeight
                                </label>
                            </div>
                        </div>
                        <br/>
                        {/*TODO: add the grid similar to the master report's. Checkout: https://react-bootstrap.github.io/components.html#forms to help with taking in input*/}
                        <div className = "mui--pull-right">
                            <Button variant="raised" onClick={this.handleFormSubmit}>Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
