import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    $("#theDate").attr("value", today);
});

export default class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'PreWeight',
            selectedDate: new Date()
        }
        };

    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }
    handleDateChange(changeEvent) {
        this.setState({
            selectedDate: changeEvent.target.value
        });
    }
    handleFormSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();
        console.log('The date you selected is:', this.state.selectedDate);
        console.log('You have selected:', this.state.selectedOption);
    }

    render() {
        return (
            <div className="mui--align-center">
            <span className = "mui--align--center">
                <form>
                <input type="date" value="selectedDate" id="theDate" onChange={this.handleDateChange}/>
                <div className="radio">
                    <label>
                        <input type="radio" value="PreWeight" checked={this.state.selectedOption === 'PreWeight'} onChange={this.handleOptionChange}/>
                        PreWeight
                    </label>
                    <label>
                        <input type="radio" value="option2" checked={this.state.selectedOption === 'PostWeight'} onChange={this.handleOptionChange}/>
                        PostWeight
                    </label>
                </div>
                    <Button variant="raised" onClick={this.handleFormSubmit}>Submit</Button>
                </form>
            </span>
            </div>
            )
    }
}
