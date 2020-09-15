import React, { Component } from 'react';
import CardSummary from './components/CardSummary';
import ReportChart from './components/ReportChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export class dashboard extends Component {
    render() {
        return (
            <div className="container-fluid dashboardCard text-blue">
                <CardSummary />
                <div className="row mt-1">
                    <div className="col-12 col-md-6"> <ReportChart /></div>
                    <div className="col-12 col-md-6"><Calendar className="calendarStyle shadow" /></div>
                </div>
                {/* <ReportChart /> */}
            </div>
        )
    }
}

export default dashboard
