import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudy(props) {
    const [studyName, setStudyName] = useState('');
    const [studyNameError, setStudyNameError] = useState('');
    let history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        AddStudy(studyName);
    }

    async function AddStudy(studyName) {
        try {
            const studyObj = {
                study_name: studyName
            }

            const config = {
                headers: { 'Content-Type': 'application/json' }
            }

            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`http://127.0.0.1:8000/api/studies`, studyObj, config)
                    .then(res => {
                        toast.success(`${studyName} was successfully created!`, {
                            autoClose: 3000,
                            hideProgressBar: true
                        });
                        history.push("/");
                    })
                    .catch(error => {
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
                        <h1 className="text-center font-weight-bold my-3">Add Study</h1>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputName">Study name:</label>
                                    <input className="form-control py-4" value={studyName} onChange={(e) => setStudyName(e.target.value)} id="studyName" type="text" placeholder="Enter study name" />
                                </div>
                                {studyNameError && <ErrorMessage errorMessage={studyNameError} />}
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

export default AddStudy;

