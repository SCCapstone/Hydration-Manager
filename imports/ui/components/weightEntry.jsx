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

    render() {
        return (
            <div className="mui--align-center">
                <span className="mui--pull-left"><h3>Weight Entry</h3></span>
                <div className="mui--clearfix"></div>
                <form>
                    <div className="mui--text-center">
                        <br/><br/>
                        <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange.bind(this)}/>
                        <br/><br/>
                        <div className="radio">
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
                        <br/><br/>


                            <Button variant="raised" onClick={this.handleFormSubmit}>Submit</Button>
                    </div>
                </form>
            </div>
            )
    }
}
