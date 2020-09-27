import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { observer, inject } from 'mobx-react';

function Login({ handleUserState, user }) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let history = useHistory();
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [invalidError, setInvalidError] = useState(null);

    function onSubmit(e) {
        e.preventDefault();
        userLogin(email, password);
    }

    async function userLogin(email, password) {
        let environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";
        try {
            axios.get(`/sanctum/csrf-cookie`).then(response => {
                axios.post(`/api/login`,
                    {
                        email,
                        password
                    })
                    .then(res => {
                        axios.get(`/api/user`).then(response => {
                            localStorage.setItem('loggedIn', 'true');
                            handleUserState(response.data);
                            history.push("/dashboard");
                        });
                    }).catch(error => {
                        setEmailError(error.response.data.emailMessage);
                        setPasswordError(error.response.data.passwordMessage);
                        setInvalidError(error.response.data.message);
                    });
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container text-blue">
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-1">
                        <h1 className="text-center font-weight-bold my-5">Login</h1>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                    <input className={ emailError ? "form-control py-4 border border-danger" : "form-control py-4"}  value={email} onChange={(e) => setemail(e.target.value)} id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                </div>
                                {emailError && <ErrorMessage errorMessage={emailError} />}
                                <div className="form-group">
                                    <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                    <input className={ passwordError ? "form-control py-4 border border-danger" : "form-control py-4"}  value={password} onChange={(e) => setpassword(e.target.value)} id="inputPassword" type="password" placeholder="Enter password" />
                                </div>
                                {passwordError && <ErrorMessage errorMessage={passwordError} />}
                                {invalidError && <ErrorMessage errorMessage={invalidError} />}
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                        <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                                    </div>
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <a className="small" href="password.html">Forgot Password?</a>
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <div className="small"><a href="/signup">Need an account? Sign up!</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

