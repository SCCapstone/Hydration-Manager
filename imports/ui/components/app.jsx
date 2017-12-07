import React from 'react';
import Container from 'muicss/lib/react/container';
import Col from 'muicss/lib/react/col';
import { Header } from './header.jsx';
import { Navigation } from './navigation.jsx';
import { AppRouting } from './appRouting.jsx';

/* Contains the main application */

export const App = () => (
    <div>
        <Header />
        <Container fluid = {true}>
            <Navigation />
            <Col sm = "10">
                <AppRouting />
            </Col>
        </Container>
    </div>
);