import React from 'react';
import { App } from '../components/app.jsx';

/* The idea here is that this index layout will be used as a
* security buffer, either directing to login or to the application
* based on whether the user is logged in.
* */
export const Index = () => (
    <div>
        <App />
    </div>
)