import React, { Component } from 'react';
import CardSummary from './components/CardSummary';
import ReportChart from './components/ReportChart';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


export class dashboard extends Component {
    render() {
        return (
            <div className="container-fluid dashboardCard text-blue">
                <CardSummary />
                <div className="row">
                    <div className="col-12 col-md-6"> <ReportChart /></div>
                    <div className="col-12 col-md-6"> <ReportChart /> </div>
                </div>
                {/* <ReportChart /> */}
            </div>
        )
    }
}

export default dashboard
