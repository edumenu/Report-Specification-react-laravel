import React, { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { observer, inject } from "mobx-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddReport(props) {
    const [reportName, setReportName] = useState('');
    const [studyName, setStudyName] = useState('CDK9');
    const [nameError, setNameError] = useState('');
    const [studyNameError, setStudyNameError] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        AddReport(reportName);
    }

    async function AddReport(reportName) {
        try {
            const reportObj = {
                report_name: reportName,
                report_study: studyName,
                study_id: props.studies.filter(item => item.study_name === studyName)[0].id,
                report_status: "programming",
            }

            const config = {
                headers: { 'Content-Type': 'application/json' }
            }

            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`http://127.0.0.1:8000/api/reports`, reportObj, config)
                    .then(res => {
                        toast.success(`${reportName} was successfully created!`, {
                            autoClose: 3000,
                            hideProgressBar: true
                        });
                    })
                    .catch(error => {
                        setNameError(error.response.data.reportErrorMessage);
                        setStudyNameError(error.response.data.studyErrorMessage);
                    });
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container text-blue centerCards">
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-1">
                        <h1 className="text-center font-weight-bold my-3">Add Report</h1>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputName">Report name:</label>
                                    <input className="form-control py-4" value={reportName} onChange={(e) => setReportName(e.target.value)} id="studyName" type="text" placeholder="Enter report name" />
                                </div>
                                {nameError && <ErrorMessage errorMessage={nameError} />}
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputRole">Select Study</label>
                                    <select className="form-control" id="inputRole" value={studyName} onChange={(e) => setStudyName(e.target.value)}>
                                        {props.studies.map((study) => (
                                            < option key={study.id} value={study.study_name} > {study.study_name}</option>
                                        ))}
                                    </select>
                                </div>
                            {studyNameError && <ErrorMessage studyNameError={studyNameError} />}
                            <div className="form-group mt-4 mb-0">
                                <button className="btn btn-primary float-right" type="submit">Add</button>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}

export default AddReport;

