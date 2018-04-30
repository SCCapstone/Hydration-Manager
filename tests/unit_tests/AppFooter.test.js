import React from 'react';
import {shallow} from "enzyme";
import { AppFooter } from '../../imports/ui/components/AppFooter';

describe('Component: App Footer', function(){
    if (Meteor.isClient) return true;
    it('renders without crashing', function() {
        expect(
            shallow(
                <AppFooter />
            ).length
        ).isEqual(1);
    });

    it('does something else');
});
