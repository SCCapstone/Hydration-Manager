import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import { Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

export default class YourTeams extends React.Component {
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
        window.location ='/app/masterReport';
    }
    open() {
        this.setState({ showModal: true });
    }
    close() {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div>
                <br/>
                <div>
                    <span className = "mui--pull-left"><h3>Your Team's</h3></span>
                    <span className = "mui--pull-right"><Button onClick={this.open} color="primary" variant="raised">Create a Team</Button></span>
                    <div className="mui--clearfix"></div>
                </div>
                <div>
                    <Modal show={this.state.showModal} onhide={this.close}>
                        <Modal.Header>
                            <Modal.Title>Team Entry Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form className = "mui--text-left" >
                                <Input label = "Team Name" floatingLabel = {true} required = {true} />
                                <Input label = "Season" floatingLabel = {true} required = {true} />
                            </Form>
                        </Modal.Body>
                        {/*TODO: Add the team's data to the database*/}
                        <Modal.Footer>
                            <Button onClick={this.close} variant="raised"> Close </Button>
                            <Button onClick={this.close} variant="raised" color="primary"> Create Team </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <br/>
                <div className="mui--divider-top">
                    <br/>
                    {/*TODO: Conditional Rendering of this list*/}
                    <ListGroup>
                        <ListGroupItem onClick = {this.routeToReport}>Example Team</ListGroupItem>
                        <ListGroupItem onClick = {this.routeToReport}>Example Team</ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        )
    }
}