import React, { useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import spinner from '../assests/images/spinner.gif';
import { indexCounter } from '../utility/StudyUtility';

function StudyInfo(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function loadAllReports() {
        props.RootStore.ReportStore.loadAllReports();
        setTimeout(() => {
            props.handleAllData();
        }, 2000);
    }

    function loadSelectedReport(study_name) {
        props.RootStore.ReportStore.loadReportByStudy(study_name);
        setTimeout(() => {
            props.handleAllData();
        }, 2000);
    }

    return (
        <div className="card shadow-sm text-blue">
            <h5 className="card-header font-weight-bold text-center">Select a Study to view reports</h5>
            {loading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}

            <div className="d-flex flex-row flex-nowrap studyCardScroll">
                {(Object.keys(props.studies).length !== 0 && props.studies !== undefined && loading === false) && <div onClick={loadAllReports} className="card card-body shadow-sm text-blue"><h5 className="card-title text-center">All Studies</h5><button className="btn btn-outline-info stretched-link">{props.reports.length}</button></div>}

                {(Object.keys(props.studies).length !== 0 && props.studies !== undefined && loading === false) &&
                    props.studies.map((study, index) => (
                        <div key={study.id} className="card card-body shadow-sm text-blue" onClick={() => loadSelectedReport(study.study_name)}><h5 className="card-title text-center">{study.study_name}</h5><button className="btn btn-outline-info stretched-link">{indexCounter(props.reports, study.id, "reportsPerStudy")}</button></div>
                    ))}
            </div>
            {(Object.keys(props.studies).length == 0 && props.studies !== undefined && loading === false) && <h4 className="text-center">There are no studies</h4>}
        </div>
    )
}

export default inject("RootStore")(observer(StudyInfo));

StudyInfo.propTypes = {
    studies: PropTypes.array.isRequired,
    reports: PropTypes.array.isRequired,
    handleAllData: PropTypes.func.isRequired
}

