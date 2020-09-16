import React, { useEffect } from 'react';
import { indexCounter } from '../../utility/StudyUtility';

function CardSummary(props) {

    useEffect(() => {
        // console.log(props);
    });

    return (
        <>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><h5>Home</h5></li>
            </ol>
            <div className="row mt-4">
                <div className="col-lg-3 col-md-6">
                    <div className="card mb-3 shadow text-blue">
                        <div className="d-flex card-header">
                            <div>Number of Reports</div>
                            <div className="ml-auto">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-newspaper" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
                                    <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h3>{props.reports.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card mb-3 shadow text-blue">
                        <div className="d-flex card-header">
                            <div>Number of studies</div>
                            <div className="ml-auto">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                                    <path fillRule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z" />
                                </svg>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h3>{props.studies.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card mb-3 shadow text-blue">
                        <div className="d-flex card-header">
                            <div>Number of programmers</div>
                            <div className="ml-auto">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                    <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h3>{indexCounter(props.users, "Programmer", "numberOfUsers")}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">

                    <div className="card mb-3 shadow text-blue">
                        <div className="d-flex card-header">
                            <div>Number of Data Managers</div>
                            <div className="ml-auto">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-badge-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z" />
                                </svg>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h3>{indexCounter(props.users, "Data Manager", "numberOfUsers")}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSummary
