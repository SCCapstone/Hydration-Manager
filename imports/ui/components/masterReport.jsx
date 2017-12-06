import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Athletes} from '../../api/athletes.jsx';
import AthleteSingle from './athletesingle.jsx';


export default class MasterReport extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
        this.routeToReport = this.routeToReport.bind(this);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }
    routeToReport () {
        window.location ='/app/athleteReport';
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }
    addPlayer() {
        event.preventDefault();
        var pName = this.name.controlEl.value;
        var pWeight = this.baseWeight.controlEl.value;
        var pHeight = this.height.controlEl.value;

        console.log(pName);
        console.log(pWeight);
        console.log(pHeight);

        Meteor.call('addNewPlayer', pName,pWeight,pHeight, (err, data)=> {
            Bert.defaults = {hideDelay: 4500}
            Bert.alert('Player Created','success', 'fixed-top', 'fa-check');

            this.name.controlEl.value = "";
            this.baseWeight.controlEl.value = "";
            this.height.controlEl.value = "";
            this.close();
        })

        this.close();
    }
    athletes() {
        return Athletes.find().fetch();
    }

    render() {
        athletes = this.athletes;
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Master Report</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create an Athlete</Button></span>
                    <div className="mui--clearfix"></div>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close} >
                        <Modal.Header>
                            <Modal.Title>Athlete Entry Form</Modal.Title>
                        </Modal.Header>
                        {/*TODO: Check that name is a string, baseweight is a number, and height is a number */}
                        <Modal.Body>
                            <Form className = "mui--text-left" >
                                <Input ref={el => {this.name = el;}} label = "Player Name" floatingLabel = {true} required = {true} />
                                <Input ref={el => {this.baseWeight = el;}} label = "Baseline weight" floatingLabel = {true} required = {true} />
                                <Input ref={el => {this.height = el;}} label = "Height" floatingLabel = {true} required = {true} />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} variant="raised"> Close </Button>
                            <Button onClick={this.addPlayer} variant="raised" color="primary"> Create Athlete </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    {/*TODO: Able to click on athlete to go athlete report screen*/}
                    <Table striped bordered condensed hover className="teams">
                      <thead>
                      <tr>
                          <th>Name</th>
                          <th>Base Weight</th>
                          <th>Height</th>
                          <th>Current Hydration</th>
                          <th>Remove</th>
                      </tr>
                      </thead>
                        <tbody>
                            {this.athletes().map((athlete)=>{return <AthleteSingle key={athlete._id} athlete={athlete} />})}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}