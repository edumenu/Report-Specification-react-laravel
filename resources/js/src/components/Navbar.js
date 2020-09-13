import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ handleLogout, loggedIn, user }) {
    let history = useHistory();

    async function userLogout() {
        axios.get('/api/logout').then(response => {
            localStorage.setItem('loggedIn', 'false');
            handleLogout();
            history.push("/");
            toast.error(response.data.message, {
                autoClose: 3000,
                hideProgressBar: true
            });
        });
    };


    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
            <Link to="/" className="navbar-brand">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {loggedIn === 'true' &&
                <>
                    <div className="collapse navbar-collapse navBarDrop" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/reportTable" className="nav-link">Reports table</Link>
                            </li>
                        </ul>
                    </div>
                </>}
            <div className="collapse navbar-collapse navBarDrop" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    {loggedIn === 'false' ?
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-success">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign up</Link>
                            </li>
                        </>
                        :
                        <>
                            <li className="nav-item">
                                <img src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png" className="rounded-circle img-thumbnail" alt="Cinque Terre" width="40" height="36" />
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">{ user.name }</Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" onClick={userLogout} className="nav-link text-danger" >Logout</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;

