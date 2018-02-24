// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
// import { renderRoutes } from './routes.jsx';
//
// Meteor.startup(() => {
//     render(renderRoutes(), document.getElementById('root'));
// })

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../../ui/layouts/App/App';
//import '../../ui/stylesheets/app.scss';

// Note:  <div id="react-root"></div> element defined in /client/main.html
//           -- called on client side of Meteor startup
Meteor.startup(() => render(<App />, document.getElementById('react-root')));
