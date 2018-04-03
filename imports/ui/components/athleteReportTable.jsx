// Package Imports
import React, { Component } from 'react';
import { Table, FormControl, FormGroup, Modal, Button, Radio } from 'react-bootstrap';
import autoBind from 'react-autobind';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/*AthleteReportTable component can be found and is linked with the athleteReport page at location
 * imports/ui/pages/athleteReport.jsx */
class AthleteReportTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            dates : [],
            date: '',
            prePost: '',
            weight: '',
        };
        // this.getListofDates = this.getListofDates.bind(this);
        // this.getDatePreWeight = this.getDatePreWeight.bind(this);
        // this.getDatePostWeight = this.getDatePostWeight.bind(this);
        autoBind(this);
    }

    componentDidMount() {
        this.getListofDates();
    }
    /*Fetches the list of dates for postWeight and preWeight data and sorts the data by date
    * @Params: none*/
    getListofDates() {
        curAthlete = this.props.athlete;
        curDates = [];
        for(i = 0; i < curAthlete.preWeightData.length; i++)
        {
            curDates.push(curAthlete.preWeightData[i].date);
        }
        for(i=0; i< curAthlete.postWeightData.length; i++)
        {
            if(curDates.indexOf(curAthlete.postWeightData[i].date) === -1) {
                curDates.push(curAthlete.postWeightData[i].date);
            }
        }
        curDates.sort().reverse();
        this.setState(
            {
                dates : curDates
            });
    }
    /*Fetches the date of the preWeight addition
    * @Params: aDate*/
    getDatePreWeight(aDate) {
        preData = this.props.athlete.preWeightData;
        for(i = 0; i < preData.length; i++)
        {
            if(preData[i].date === aDate)
            {
                return Number.parseFloat(preData[i].weight).toPrecision(6);
            }
        }
    }
    /*Fetches the date of the postWeight addition
    * @Params: aDate*/
    getDatePostWeight(aDate) {
        postData = this.props.athlete.postWeightData;
        for(i = 0; i < postData.length; i++)
        {
            if(postData[i].date === aDate)
            {
                return Number.parseFloat(postData[i].weight).toPrecision(6);
            }
        }
    }
    /*Fetches the Hydration by date
    * @Params: aDate*/
    getHydration(aDate) {
        preData = this.props.athlete.preWeightData;
        postData = this.props.athlete.postWeightData;
        hydration = null;
        let pre = 0;
        let post = 0;
        for(i = 0; i < preData.length; i++)
        {
            if(preData[i] !== undefined)
            {
                if(preData[i].date === aDate)
                {
                    pre = preData[i].weight;
                }
            }
        }
        for(i = 0; i < postData.length; i++)
        {
            if(postData[i] !== undefined)
            {
                if(postData[i].date === aDate)
                {
                    post = postData[i].weight;
                }
            }

        }
        if(pre > 0 && post > 0) {
            hydration = (((pre - post)) / pre) * 100;
            if(hydration >= -2 && hydration <=3)
            {
               this.setColor(aDate,'greenStatus');
            }
            else if(hydration >= -4 && hydration <-2)
            {
                //yellow
                this.setColor(aDate,'yellowStatus');
            }
            else if(hydration < -4 || hydration > 3)
            {
                //red
                this.setColor(aDate,'redStatus');
            }
            return Number.parseFloat(hydration).toPrecision(6);
        }
        else
        {
            return "Please enter missing Pre/Post weight."
        }
    }
    /*Sets color for element
    * @params aDate, aColor*/
    setColor(aDate,aColor) {
        elements = document.getElementsByTagName('tr');
        //console.log(aDate);
        for(i=0;i<elements.length;i++)
        {
            //console.log(elements[i].keyprop);
            if(elements[i].getAttribute('keyprop') === aDate)
            {
                elements[i].classList.add(aColor);
            }
        }
    };

    /* handleEditButtonClick function -- when button is pressed date is set to aDate and this.open function is run
     * @params aDate*/
    handleEditButtonClick(aDate) {
        this.setState({
           date : aDate,
        });
        this.open();
    };

    /* handleOptionChange function -- sets prePost weight to e.target.value */
    handleOptionChange = (e) => {
        this.setState({prePost: e.target.value});
    };

    /* handleWeight function -- sets prePost weight to e.target.value */
    handleWeight = (e) => {
        this.setState({weight: e.target.value});
    };

    /* open function -- opens modal */
    open() {
        this.setState({
            showModal: true,
        });
    }
    /* close function -- closes modal */
    close() {
        this.setState({ showModal: false });
    }
    /* Edits entry and calls athlete.editWeight function on the server side passing through
       @params pId, pDate pWeight, and pPrePost and closing modal upon finishing */
    editEntry() {
        event.preventDefault();
        const pId = this.props.athlete._id;
        const pWeight = this.state.weight;
        const pDate = this.state.date;
        const pPrePost = this.state.prePost;

        if(pId === '' || pWeight === '' || pDate === '' || pPrePost === '')
        {
            window.alert("Make sure to complete all fields for weight editing.");
        }
        else {
            Meteor.call('athletes.editWeight', pId, pDate, pWeight, pPrePost, () => {
                Bert.defaults = {hideDelay: 4500};
                Bert.alert('Weight edited', 'success', 'fixed-top', 'fa-check');

                this.setState({
                    date: "",
                    weight: "",
                    prePost: "",
                });

                this.close();
            });
        }

        this.close();
    }
    /*Renders Dates, Weight Loss Percentage, PreWeights, and PostWeights for athletes*/
    render() {
        return(
            <div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Athlete Entry Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl.Static>{this.props.athlete.name}</FormControl.Static>
                                    <FormControl.Static>{this.state.date}</FormControl.Static>
                                    <FormGroup>
                                        <Radio value='PreWeight' checked={this.state.prePost === 'PreWeight'} onChange={this.handleOptionChange}>PreWeight</Radio>
                                        <Radio value='PostWeight' checked={this.state.prePost === 'PostWeight'} onChange={this.handleOptionChange}>PostWeight</Radio>
                                    </FormGroup>
                                    <FormControl placeholder='Enter Weight Here' label='Weight' type='number' onChange={this.handleWeight}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} bsStyle="danger"> Close </Button>
                            <Button onClick={this.editEntry} bsStyle="primary"> Edit Weight </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Table bordered condensed responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight Loss %</th>
                            <th>PreWeight</th>
                            <th>PostWeight</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.dates.map((date)=><tr key={date} keyprop={date}><td>{date}</td><td>{this.getHydration(date)}</td><td>{this.getDatePreWeight(date)}</td><td>{this.getDatePostWeight(date)}</td><td><Button onClick={() => this.handleEditButtonClick(date)}><span className="glyphicon glyphicon-pencil"></span>Edit</Button></td></tr>)}
                    </tbody>
                </Table>
            </div>
        )
    }

}

AthleteReportTable.propTypes = {
    subscriptions: PropTypes.array,
    teamLoading: PropTypes.bool,
    athleteLoading: PropTypes.bool,
    teamsList: PropTypes.array,
    athletesList: PropTypes.array,
};

// Retrieves data from server and puts it into client's minimongo
export default withTracker(() => {
    const teamSubscription = Meteor.subscribe('teams.thisUserId');
    const athleteSubscription = Meteor.subscribe('athletes.thisTeamId');
    const teamLoading = !teamSubscription.ready();
    const athleteLoading = !athleteSubscription.ready();
    // teamsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    // match: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,

    return {
        subscriptions: [teamSubscription, athleteSubscription],
        teamLoading,
        athleteLoading,
    };
})(AthleteReportTable);