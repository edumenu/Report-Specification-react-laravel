import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudyInfo from '../components/StudyInfo';
import ReportSummary from '../components/ReportSummary';
import { observer, inject } from "mobx-react";


class Home extends Component {
    state = {
        studies:[],
        comments: [],
        reports: [],
    }

    componentDidMount(){
        this.props.StudyStore.loadAllStudies();
        this.props.ReportStore.loadAllReports();
        this.props.CommentStore.loadAllComments();

        setTimeout(() => {
            this.handleStudies();
            this.handleComments();
            this.handleReports();
        }, 1000);
    }

    handleStudies = () => {this.setState({ studies: this.props.StudyStore.studies })};

    handleComments = () => {this.setState({ comments: this.props.CommentStore.comments })};

    handleReports = () => {this.setState({ reports: this.props.ReportStore.reports })};


    render() {
        const {studies, reports, comments} = this.state;

        return (
            <div className="container-fluid centerCards">
                <div className="row">
                    <div className="col-12 col-md-4"> <StudyInfo studies={studies} reports={reports} /> </div>
                    <div className="col-12 col-md-8"> <ReportSummary comments={comments} reports={reports} />  </div>
                </div>
            </div>
        )
    }
}

export default inject("StudyStore", "ReportStore", "CommentStore")(observer(Home));

