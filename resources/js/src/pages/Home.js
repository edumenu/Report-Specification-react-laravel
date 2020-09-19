import React from 'react';
import StudyInfo from '../components/StudyInfo';
import ReportSummary from '../components/ReportSummary';

function Home(props) {
    return (
        <div className="container-fluid centerCards">
            {/* <h1>Home</h1> */}
            {/* <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><h4>Home</h4></li>
            </ol> */}
            <div className="row">
                <div className="col-12 col-md-4"> <StudyInfo studies={props.studies} reports={props.reports} handleAllData={props.handleAllData}  /> </div>
                <div className="col-12 col-md-8"> <ReportSummary comments={props.comments} reports={props.reports} handleAllData={props.handleAllData} />  </div>
            </div>
        </div>
    )
}

export default Home;

