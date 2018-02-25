import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        }
        };


    log() {
        Meteor.call('logoutUser', this.props.user._id);
        window.location ='/login';
    }

    open() {
        this.setState({ showModal: true });
        this.getCurrentTeam();
    }
    close() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close} >
                    <Modal.Header>
                        <Modal.Title>Are you sure you want to logout?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.log}>Not Working Yet</Button>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}