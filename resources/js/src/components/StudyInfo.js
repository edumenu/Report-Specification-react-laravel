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
            <h5 className="card-header font-weight-bold">Select a Study to view reports</h5>
            <div className="card-body text-dark studyInfo">
                <div className="list-group list-group-flush">
                    {loading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}
                    {/* Print first line (All studies) */}
                    {(Object.keys(props.studies).length !== 0 && props.studies !== undefined && loading === false) && <div><button onClick={loadAllReports} className="list-group-item list-group-item-action">
                        All Studies<span className="badge badge-primary badge-pill float-right">{props.reports.length}</span></button></div>}

                    {(Object.keys(props.studies).length !== 0 && props.studies !== undefined && loading === false) &&
                        props.studies.map((study, index) => (
                            // console.log(study.id)
                            <button key={study.id} className="list-group-item list-group-item-action" onClick={() => loadSelectedReport(study.study_name)}>{study.study_name}<span className="badge badge-primary badge-pill float-right">{indexCounter(props.reports, study.id, "reportsPerStudy")}</span></button>
                        ))}
                    {(Object.keys(props.studies).length == 0 && props.studies !== undefined && loading === false) && <h4>There are no studies</h4>}
                </div>
            </div>
        </div>
    )
}

export default inject("RootStore")(observer(StudyInfo));

StudyInfo.propTypes = {
    studies: PropTypes.array.isRequired,
    reports: PropTypes.array.isRequired,
    handleAllData: PropTypes.func.isRequired
}

