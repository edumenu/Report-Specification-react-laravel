import React from 'react';
import StudyInfo from '../components/StudyInfo';
import ReportSummary from '../components/ReportSummary';

function Home(props) {
    return (
        <div className="container centerCards">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <StudyInfo studies={props.studies} reports={props.reports} handleAllData={props.handleAllData} />
                </div>
                <div className="col-lg-12">
                    <ReportSummary comments={props.comments} reports={props.reports} reportsByStudy={props.reportsByStudy} handleAllData={props.handleAllData} />
                </div>
            </div>
        </div>
    )
}

export default Home;

