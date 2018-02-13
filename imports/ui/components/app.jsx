import React from 'react';
import { Header } from './header.jsx';
import { Navigation } from './navigation.jsx';
import { AppRouting } from './appRouting.jsx';

/* Contains the main application */

export const App = () => (
    <div>
        <Header />
            <Navigation />
            <AppRouting />
    </div>
);