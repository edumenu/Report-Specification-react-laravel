import React from 'react';
import StudyInfo from '../components/StudyInfo';
import ReportSummary from '../components/ReportSummary';

function Home(props){
    return (
        <div className="container-fluid centerCards">
            <div className="row">
                <div className="col-12 col-md-4"> <StudyInfo studies={props.studies} reports={props.reports} /> </div>
                <div className="col-12 col-md-8"> <ReportSummary comments={props.comments} reports={props.reports} />  </div>
            </div>
        </div>
    )
}

export default Home;

