import React, { Component } from 'react';

import { observer, inject } from "mobx-react";
import { Provider } from "mobx-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ReportTable from './admin/ReportTable';
import WelcomeMessage from './components/WelcomeMessage';
import Dashboard from './admin/dashboard';
import Profile from './admin/Profile';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './pages/Home';
import Report from './pages/report';
import RootStore from "./store/RootStore";

class App extends Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn') || '',
        user: {},
        studies: {},
        reports: {},
        comments: {},
    }

    componentDidMount() {
        this.findUser();
    }

    handleUserState = (data) => {
        this.setState({
            loggedIn: localStorage.getItem('loggedIn'),
            user: data
        });
    }

    handleUserUpdate = (data) => {
        this.setState({
            user: data
        });
    }

    handleLogout = () => {
        this.setState({
            loggedIn: localStorage.getItem('loggedIn'),
            user: {}
        });
    }

    async findUser() {
        try {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.get("/api/user").then(response => {
                    this.setState({
                        loggedIn: localStorage.getItem('loggedIn'),
                        user: response.data
                    });
                })
                    .catch(err => {
                        localStorage.setItem('loggedIn', 'false');
                        this.setState({
                            loggedIn: localStorage.getItem('loggedIn'),
                            user: {}
                        });
                    });
            })
                .catch(err => {
                    this.setState({
                        loggedIn: localStorage.getItem('loggedIn'),
                        user: {}
                    });
                });
        } catch (err) {
            console.log(err)
        }
    };


    render() {
        const { loggedIn, user } = this.state;

        return (
            <Router>
                <ToastContainer />
                <Navbar handleLogout={this.handleLogout} loggedIn={loggedIn} user={user} />
                <WelcomeMessage loggedIn={loggedIn} user={user} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/report/:id" component={Report} />
                    <Route path="/dashboard">
                        {loggedIn === 'true' ? <Dashboard /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/profile">
                        {loggedIn === 'true' ? <Profile handleUserState={this.handleUserState} user={user} /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/reportTable">
                        {loggedIn === 'true' ? <ReportTable /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/login">
                        {loggedIn === 'false' ? <Login handleUserState={this.handleUserState} user={user} /> : <Redirect to="/dashboard" />}
                    </Route>
                    <Route path="/signup">
                        {loggedIn === 'false' ? <Signup handleUserState={this.handleUserState} /> : <Redirect to="/dashboard" />}
                    </Route>
                </Switch>
            </Router>
        );
    }
}

// export default App;
export default inject("StudyStore", "ReportStore", "CommentStore")(observer(App));


if (document.getElementById('App')) {
    ReactDOM.render(
        <Provider
            StudyStore={RootStore.StudyStore}
            ReportStore={RootStore.ReportStore}
            CommentStore={RootStore.CommentStore}>
            <App />
        </Provider>
        , document.getElementById('App'));
}
