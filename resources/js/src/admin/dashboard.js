import React, { Component } from 'react';
import CardSummary from './components/CardSummary';
import ReportChart from './components/ReportChart';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


export class dashboard extends Component {
    render() {
        return (
            <>
                <CardSummary />
                <ReportChart />
            </>
        )
    }
}

export default dashboard
