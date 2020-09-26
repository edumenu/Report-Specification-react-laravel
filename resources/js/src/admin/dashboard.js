import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import CardSummary from './components/CardSummary';
import ReportChart from './components/ReportChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export class dashboard extends Component {

    state = {
        user: {},
        users: {},
        studies: [],
        reports: [],
        comments: [],
    }

    componentDidMount() {
        this.props.RootStore.StudyStore.loadAllStudies();
        this.props.RootStore.ReportStore.loadAllReports();
        this.props.RootStore.CommentStore.loadAllComments();
        this.props.RootStore.UserStore.loadAllUsers();

        setTimeout(() => {
            this.handleAllData();
        }, 1500);
    }

    handleAllData = () => {
        this.setState({
            studies: this.props.RootStore.StudyStore.studies,
            reports: this.props.RootStore.ReportStore.reports,
            comments: this.props.RootStore.CommentStore.comments,
            users: this.props.RootStore.UserStore.users,
        });
    }

    render() {

        const { users, studies, reports } = this.state

        return (
            <div className="container-fluid dashboardCard text-blue">
                <CardSummary users={users} reports={reports} studies={studies} />
                <div className="row mt-1">
                    <div className="col-12 col-md-6"> <ReportChart reports={reports} /></div>

                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header font-weight-bold">Calendar</div>
                            <div className="card-body">
                                <Calendar className="calendarStyle shadow" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject("RootStore")(observer(dashboard));

