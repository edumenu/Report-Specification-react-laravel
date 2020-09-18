import React, { useEffect, useState } from 'react';
import TableRow from '../components/TableRow';
import PropTypes from 'prop-types';
import spinner from '../assests/images/spinner.gif';
import { indexCounter } from '../utility/StudyUtility';

function ReportTable({ comments, reports }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="container text-blue centerCards">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="card shadow-sm rounded-lg mt-1">
                        <div className="table-responsive-xl tableScroll ">
                            <h4 className="card-header font-weight-bold">Report Table</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="d-flex text-blue">
                                            <th className="col-2">Id</th>
                                            <th className="col-3">Name</th>
                                            <th className="col-3">Study</th>
                                            <th className="col-2">Status</th>
                                            <th className="col-2">Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-blue">
                                        {loading &&
                                            <tr className="d-flex">
                                                <td></td>
                                                <td>
                                                    <img className="my-auto mx-auto" src={spinner} alt="test" />
                                                </td>
                                            </tr>}

                                        {(Object.keys(reports).length !== 0 && loading === false) &&
                                            reports.map((report, index) => (
                                                <TableRow key={report.id} id={report.id} report_name={report.report_name}
                                                    study={report.report_study} status={report.report_status}
                                                    totalComments={indexCounter(comments, report.id, "commentsPerReportLength")} />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportTable

ReportTable.propTypes = {
    comments: PropTypes.array.isRequired,
    reports: PropTypes.array.isRequired
}

