import React, { Component } from 'react';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <div className = "container-fluid main-header">
                    <div className = "col-xs-12">
                        <h1 className="text-center header-text">Hydration Manager</h1>
                    </div>
                    <button className="col-xs-offset-11 glyphicon glyphicon-cog"></button>
                </div>
                <div className = "container">
                    <div className="col-md-1 nav-sidebar">
                    </div>
                </div>
            </div>
        )
    }
}