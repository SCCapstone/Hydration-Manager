import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from '../imports/ui/Home.jsx';

Meteor.startup(() => {
    render(<App />, document.getElementById('root'));
});