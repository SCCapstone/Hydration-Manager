// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
// import { renderRoutes } from './routes.jsx';
//
// Meteor.startup(() => {
//     render(renderRoutes(), document.getElementById('root'));
// })
// Package Imports
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

// Custom File & Collections Imports
import App from '../../ui/layouts/App/App';
import '../both/api';

// Note:  <div id="react-root"></div> element defined in /client/main.html
//           -- called on client side of Meteor startup
Meteor.startup(() => {
    render(<App/>, document.getElementById('react-root'));
    process.env.TWILIO_ACCOUNT_SID = '';
    process.env.TWILIO_AUTH_TOKEN = '';
    process.env.TWILIO_NUMBER = '';
    process.env.MAIL_URL = "smtps://postmaster%40sandbox2128a703612c4650830c88f0cb89b932.mailgun.org:127c6297173d29c775e482dc6a500b5c-833f99c3-fe2c07f1@smtp.mailgun.org:587";
});

