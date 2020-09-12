import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StudyList from './StudyList';
import spinner from '../assests/images/spinner.gif';
import { indexCounter } from '../utility/StudyUtility';

function StudyInfo({ studies, reports }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1100);
    }, []);

    return (
        <div className="card shadow-sm text-blue">
            <h5 className="card-header font-weight-bold">Select a Study to view reports</h5>
            <div className="card-body text-dark">
                <div className="list-group list-group-flush">
                    {loading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}
                    {/* Print first line (All studies) */}
                    {(studies.length !== 0 && loading === false) && <div><a href="#" className="list-group-item list-group-item-action">
                        All Studies<span className="badge badge-primary badge-pill float-right">{ reports.length }</span></a></div>}

                    {(studies.length !== 0 && loading === false) &&
                        studies.map((study, index) => (
                            <StudyList key={study.id} id={study.id} study={study.study_name} totalReport={indexCounter(reports, study.id, "reportsPerStudy")} />
                        ))}
                    {(studies.length == 0 && loading === false) && <h4>There are no studies</h4>}
                </div>
            </div>
        </div>
    )
}

export default StudyInfo;

StudyInfo.propTypes = {
    studies: PropTypes.array.isRequired,
    reports: PropTypes.array.isRequired
}

