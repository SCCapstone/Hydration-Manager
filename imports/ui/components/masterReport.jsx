import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap';


export default class MasterReport extends React.Component {
    constructor(props) {
        super(props);
        this.routeToReport = this.routeToReport.bind(this);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
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
    render() {
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Master Report</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create an Athlete</Button></span>
                    <div className="mui--clearfix">{/*Null comment*/}</div>
                </div>
                <div>
                    <Modal show={this.state.showModal} onhide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Athlete Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form className = "mui--text-left" >
                                <Input label = "Athlete Name" floatingLabel = {true} required = {true} />
                                <Input label = "Baseline Weight" floatingLabel = {true} required = {true} />
                                <Input label = "Height" floatingLabel = {true} required = {true} />
                            </Form>
                        </Modal.Body>
                        {/*TODO: Add the team's data to the database*/}
                        <Modal.Footer>
                            <Button onClick={this.close} variant="raised"> Close </Button>
                            <Button onClick={this.close} variant="raised" color="primary"> Create Athlete </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    {/*TODO: Conditional Rendering of this Table*/}
                    {/*TODO: Able to click on athlete to go athlete report screen*/}
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Last Name, First Name</th>
                            <th>Hydration Level</th>
                            <th>{/*Null comment*/}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Smith, John</td>
                            <td>Test</td>
                            <td>{/*Null comment*/}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Smith, John</td>
                            <td>Test</td>
                            <td>{/*Null comment*/}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Smith, John</td>
                            <td>Test</td>
                            <td>{/*Null comment*/}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}