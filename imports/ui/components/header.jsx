import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export const Header = () => (
    <div>
        <div>
            <div className = "container-fluid main-header">
                <div className = "col-xs-12">
                    <h1 className="text-center header-text">Hydration Manager</h1>
                </div>
                <button className="col-xs-offset-11 glyphicon glyphicon-cog"></button>
            </div>
        </div>
    </div>
)