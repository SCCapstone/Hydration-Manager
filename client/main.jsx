import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Home from '../imports/ui/pages/Home.jsx';
import '/imports/startup/client'

/*
    I found a great way to traverse from page to page, but I believe it will use
    Blaze templates instead of react classes. Do you think we would be okay
    to use that instead? -afraznein
 */
// Meteor.startup(() => {
//     render(<Home/>, document.getElementById('root'));
// });

