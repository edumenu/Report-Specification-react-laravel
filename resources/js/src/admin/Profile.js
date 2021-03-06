import React, { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ handleUserState, user }) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState('Data Manager');
    const [password, setpassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        userUpdate(name, email, role, password);
    }

    async function userUpdate(name, email, role, password) {
        let environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";
        try {
            axios.get(`/sanctum/csrf-cookie`).then(response => {
                axios.put(`/api/user/${user.id}`,
                    {
                        name,
                        email,
                        role,
                        password
                    })
                    .then(res => {
                        axios.get(`/api/user`).then(response => {
                            handleUserState(response.data);
                            toast.success(res.data.message, {
                                autoClose: 3000,
                                hideProgressBar: true
                            });
                            setNameError('');
                            setEmailError('');
                            setRoleError('');
                            setPasswordError('');
                        });
                    })
                    .catch(error => {
                        setNameError(error.response.data.nameMessage);
                        setEmailError(error.response.data.emailMessage);
                        setRoleError(error.response.data.roleMessage);
                        setPasswordError(error.response.data.passwordMessage);
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
                        <h1 className="text-center font-weight-bold my-3">Update</h1>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputName">Name:</label>
                                    <input className="form-control py-4" value={name} onChange={(e) => setname(e.target.value)} id="inputName" type="text" placeholder="Enter your name" />
                                </div>
                                {nameError && <ErrorMessage errorMessage={nameError} />}
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                    <input className="form-control py-4" value={email} onChange={(e) => setemail(e.target.value)} id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                </div>
                                {emailError && <ErrorMessage errorMessage={emailError} />}
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputRole">Role</label>
                                    <select className="form-control" id="inputRole" value={role} onChange={(e) => setrole(e.target.value)}>
                                        <option value="Data Manager">Data Manager</option>
                                        <option value="Quality Control">Quality Control</option>
                                        <option value="Data Cleaner">Data Cleaner</option>
                                        <option value="Programmer">Programmer</option>
                                    </select>
                                </div>
                                {roleError && <ErrorMessage errorMessage={roleError} />}
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                    <input className="form-control py-4" id="inputPassword" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter password" />
                                </div>
                                {passwordError && <ErrorMessage errorMessage={passwordError} />}
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                    </div>
                                </div>
                                <div className="form-group mt-4 mb-0">
                                    <button className="btn btn-primary float-right" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
