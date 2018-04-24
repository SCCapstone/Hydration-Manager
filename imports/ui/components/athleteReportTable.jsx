// Package Imports
import React, {Component} from 'react';
import {Table, FormControl, FormGroup, Modal, Button, Radio, Popover, OverlayTrigger} from 'react-bootstrap';
import autoBind from 'react-autobind';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


const popoverRight = (
    <Popover id="popover-positioned-right" title="Click to Edit">
        Click on a row to edit an athlete.
    </Popover>
);

/*AthleteReportTable component can be found and is linked with the athleteReport page at location
 * imports/ui/pages/athleteReport.jsx */
class AthleteReportTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            date: '',
            prePost: '',
            weight: '',
        };
        // this.getListofDates = this.getListofDates.bind(this);
        // this.getDatePreWeight = this.getDatePreWeight.bind(this);
        // this.getDatePostWeight = this.getDatePostWeight.bind(this);
        autoBind(this);
    };

    componentDidMount() {
        this.getListofDates();
    };

    /* open function -- opens modal */
    open() {
        this.setState({
            showModal: true,
        });
    };

    /* close function -- closes modal */
    close() {
        this.setState({showModal: false});
    };

    //Formatting for date
    getDateFormat(Date1) {
        let now = new Date(Date1);
        let month = (now.getMonth() + 1);
        let day = now.getDate();
        if (month < 10)
            month = "0" + month;
        if (day < 10)
            day = "0" + day;
        let today = now.getFullYear() + '-' + month + '-' + day;
        if (now.getHours() === 1) {
            return today + '-session one';
        }
        else if (now.getHours() === 2) {
            return today + '-session two';
        }
        else if (now.getHours() === 3) {
            return today + '-session three';
        }
        else {
            return today + '-noSessionData';
        }
    };

    /* Edits entry and calls athlete.editWeight function on the server side passing through
    @params pId, pDate pWeight, and pPrePost and closing modal upon finishing */
    editEntry() {
        event.preventDefault();
        const pId = this.props.athlete._id;
        const pWeight = this.state.weight;
        const pDate = this.state.date;
        const pPrePost = this.state.prePost;
        if (pId === '' || pWeight === '' || pDate === '' || pPrePost === '') {
            window.alert("Make sure to complete all fields for weight editing.");
        }
        else {
            Meteor.call('athletes.editWeight', pId, pDate, pWeight, pPrePost, () => {
                Bert.defaults = {hideDelay: 3500};
                Bert.alert('Weight edited!', 'success', 'growl-top-left', 'fa-check');
                this.setState({
                    date: "",
                    weight: "",
                    prePost: "",
                });
                this.close();
            });
        }
        this.close();
    };

// Getters
    /*Fetches the list of dates for postWeight and preWeight data and sorts the data by date
    * @Params: none*/
    getListofDates() {
        let curAthlete = this.props.athlete;
        let curDates = [];
        for (let i = 0; i < curAthlete.preWeightData.length; i++) {
            curDates.push(curAthlete.preWeightData[i].date);
        }
        for (let i = 0; i < curAthlete.postWeightData.length; i++) {
            if (curDates.indexOf(curAthlete.postWeightData[i].date) === -1) {
                curDates.push(curAthlete.postWeightData[i].date);
            }
        }
        curDates.sort().reverse();
        this.setState({dates: curDates});
    };

    /*Fetches the date of the preWeight addition
    * @Params: aDate*/
    getDatePreWeight(aDate) {
        let preData = this.props.athlete.preWeightData;
        for (let i = 0; i < preData.length; i++) {
            if (preData[i].date === aDate) {
                return Number.parseFloat(preData[i].weight).toPrecision(4);
            }
        }
    };

    /*Fetches the date of the postWeight addition
    * @Params: aDate*/
    getDatePostWeight(aDate) {
        let postData = this.props.athlete.postWeightData;
        for (let i = 0; i < postData.length; i++) {
            if (postData[i].date === aDate) {
                return Number.parseFloat(postData[i].weight).toPrecision(4);
            }
        }
    };

    /*Fetches the Hydration by date
    * @Params: aDate*/
    getHydration(aDate) {
        let preData = this.props.athlete.preWeightData;
        let postData = this.props.athlete.postWeightData;
        let hydration = '';
        let pre = 0;
        let post = 0;
        for (let i = 0; i < preData.length; i++) {
            if (preData[i] !== undefined) {
                if (preData[i].date === aDate) {
                    pre = preData[i].weight;
                }
            }
        }
        for (let i = 0; i < postData.length; i++) {
            if (postData[i] !== undefined) {
                if (postData[i].date === aDate) {
                    post = postData[i].weight;
                }
            }
        }
        if (pre > 0 && post > 0) {
            hydration = (((pre - post)) / pre) * 100;
            if (hydration >= -3 && hydration <= 3) {
                this.setColor(aDate, 'greenStatus');
            }
            else if (hydration > -4 && hydration < -3) { //yellow
                this.setColor(aDate, 'yellowStatus');
            }
            else if (hydration > 3 && hydration < 4) { //yellow
                this.setColor(aDate, 'yellowStatus');
            }
            else if (hydration <= -4 || hydration >= 4) { //red
                this.setColor(aDate, 'redStatus');
            }
            return Number.parseFloat(hydration).toPrecision(4);
        }
        else {
            return "Please enter missing Pre/Post weight."
        }
    };

// Setters
    /*Sets color for element
    * @params aDate, aColor*/
    setColor(aDate, aColor) {
        let elements = document.getElementsByTagName('tr');
        //console.log(aDate);
        for (let i = 0; i < elements.length; i++) {
            //console.log(elements[i].keyprop);
            if (elements[i].getAttribute('keyprop') === aDate) {
                elements[i].classList.add(aColor);
            }
        }
    };

// Handlers
    /* handleEditButtonClick function -- when button is pressed date is set to aDate and this.open function is run
     * @params aDate*/
    handleEditButtonClick(aDate) {
        this.setState({date: aDate});
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

    /*Renders Dates, Weight Loss Percentage, PreWeights, and PostWeights for athletes*/
    render() {
        return (
            <div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Athlete Edit Weight</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup>
                                    <FormControl.Static>{this.props.athlete.name}</FormControl.Static>
                                    <FormControl.Static>{this.state.date}</FormControl.Static>
                                    <FormGroup>
                                        <Radio value='PreWeight' checked={this.state.prePost === 'PreWeight'}
                                               onChange={this.handleOptionChange}>PreWeight</Radio>
                                        <Radio value='PostWeight' checked={this.state.prePost === 'PostWeight'}
                                               onChange={this.handleOptionChange}>PostWeight</Radio>
                                    </FormGroup>
                                    <FormControl placeholder='Enter Weight Here' label='Weight' type='number'
                                                 onChange={this.handleWeight}/>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}> Close </Button>
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

                    {this.state.dates.map((date) => <OverlayTrigger trigger="hover" placement="right"
                                                                    overlay={popoverRight}>
                        <tr key={date} keyprop={date} onClick={() => this.handleEditButtonClick(date)}>
                            <td>{this.getDateFormat(date)}</td>
                            <td>{this.getHydration(date)}</td>
                            <td>{this.getDatePreWeight(date)}</td>
                            <td>{this.getDatePostWeight(date)}</td>
                        </tr>
                    </OverlayTrigger>)}

                    </tbody>
                </Table>
            </div>
        )
    }//End Render
}//End Class
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