import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'muicss/lib/react/container';
import Col from 'muicss/lib/react/col';
import { Header } from './header.jsx';
import { Navigation } from './navigation.jsx';
import { Main } from './main.jsx';

export const App = () => (
    <div>
        <Header />
        <Container fluid = {true}>
            <Navigation />
            <Col sm = "10">
                <Main />
            </Col>
        </Container>
    </div>
)