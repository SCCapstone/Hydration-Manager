// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
// import { renderRoutes } from './routes.jsx';
//
// Meteor.startup(() => {
//     render(renderRoutes(), document.getElementById('root'));
// })
// Package Imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// Custom File Imports
import App from '../../ui/layouts/App/App';
import '../both/api';

// Note:  <div id="react-root"></div> element defined in /client/main.html
//           -- called on client side of Meteor startup
Meteor.startup(() => render(<App />, document.getElementById('react-root')));
