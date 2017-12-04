import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

export default class WeightEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'PreWeight',
            selectedDate: '12-08-2017'
        }
        };

    handleOptionChange(changeEvent) {
        this.state = ({
            selectedOption: changeEvent.value
        });
        console.log('You have selected:', this.state.selectedOption);
    }
    handleDateChange(changeEvent) {
        this.state = ({
            selectedDate: changeEvent.target.value
        });
        console.log('The date you selected is:', this.state.selectedDate);
    }
    handleFormSubmit(formSubmitEvent) {
        console.log('The date you selected is:', this.state.selectedDate);
        console.log('You have selected:', this.state.selectedOption);
    }

    render() {
        return (
            <div className="mui--align-center">
                <span className="mui--pull-left"><h3>Weight Entry</h3></span>
                <div className="mui--clearfix"></div>
                <form>
                    <div className="mui--text-center">
                        <br/><br/>
                        <input type="date" value="selectedDate" onChange={this.handleDateChange}/>
                        <br/><br/>
                        <div className="radio">
                            <label>
                                <input type="radio" value="PreWeight" defaultChecked={this.state.selectedOption === "PreWeight"} onChange={this.handleOptionChange}/>
                                PreWeight
                            </label>
                            <label>

                            </label>
                            <label>
                                <input type="radio" value="PostWeight" checked={this.state.selectedOption === "PostWeight"} onChange={this.handleOptionChange}/>
                                PostWeight
                            </label>
                        </div>
                        <br/><br/>
                            <Button variant="raised" onClick={this.handleFormSubmit}>Submit</Button>
                    </div>
                </form>
            </div>
            )
    }
}
