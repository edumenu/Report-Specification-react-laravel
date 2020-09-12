import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import spinner from '../assests/images/spinner.gif';


function Report(props) {
    const [userComment, setUserComment] = useState('');
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        props.ReportStore.loadOneReport(props.match.params.id);
        setTimeout(() => {
            searchReport(props.ReportStore.report);
            setLoading(false);
        }, 1000);
    }, [])

    function searchReport(report) {
        setReport(report);
        console.log(report);
    }

    function onSubmit() {
        console.log("test");
    }

    return (
        <div className="container-fluid text-blue centerCards">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card border-dark mb-3">
                        <div className="card-header text-center font-weight-bold">Add a comment</div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <input className="form-control" value={userComment} onChange={e => setUserComment(e.target.value)} />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg mt-1">
                        {loading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}
                        {(report.length !== 0 && report !== undefined && loading === false) &&
                            <>
                                <div className="card">
                                    <div className="card-header font-weight-bold text-center"><h2>{report.report_name}</h2></div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><span className="font-weight-bold">Report study:</span> {report.report_study}</li>
                                        <li className="list-group-item"><span className="font-weight-bold">Status:</span> <span className="text-success">{report.report_status}</span></li>
                                    </ul>
                                </div>

                                <div className="card-body mt-5">
                                    <div className="card border-light mb-3">
                                        <div className="card-header">Edem Dumenu</div>
                                        <div className="card-body">
                                            <h5 className="card-title">Warning card title</h5>
                                        </div>
                                    </div>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </>
                        }
                        {(report.length === 0 && report !== undefined && loading === false) &&
                            <>
                                <div className="card shadow-lg border-0 rounded-lg mt-1">
                                    <h2 className="text-center font-weight-bold my-5">Report cannot be found</h2>
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("ReportStore")(observer(Report));

