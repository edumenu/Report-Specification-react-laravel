import React, { Component } from 'react';

import { observer, inject } from "mobx-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ReportTable from './admin/ReportTable';
import WelcomeMessage from './components/WelcomeMessage';
import Dashboard from './admin/dashboard';
import Profile from './admin/Profile';
import AddStudy from './admin/AddStudy';
import AddReport from './admin/AddReport';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './pages/Home';
import Report from './pages/report';

class App extends Component {

    state = {
        loggedIn: localStorage.getItem('loggedIn') || '',
        user: {},
        users: {},
        studies: [],
        reports: [],
        reportsByStudy: [],
        comments: [],
    }

    componentDidMount() {
        this.props.RootStore.StudyStore.loadAllStudies();
        this.props.RootStore.ReportStore.loadAllReports();
        this.props.RootStore.CommentStore.loadAllComments();
        this.props.RootStore.UserStore.loadAllUsers();
        this.findUser();

        setTimeout(() => {
            this.handleAllData();
        }, 2000);
    }

    handleAllData = () => {
        this.setState({
            studies: this.props.RootStore.StudyStore.studies,
            reports: this.props.RootStore.ReportStore.reports,
            reportsByStudy: this.props.RootStore.ReportStore.reportsByStudy,
            comments: this.props.RootStore.CommentStore.comments,
            users: this.props.RootStore.UserStore.users,
        });
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
        let environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";
        try {
            axios.get(`${environ}/sanctum/csrf-cookie`).then(response => {
                axios.get(`${environ}/api/user`).then(response => {
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
        const { loggedIn, user, users, studies, reports, reportsByStudy, comments } = this.state;

        return (
            <Router>
                <ToastContainer />
                <Navbar handleLogout={this.handleLogout} loggedIn={loggedIn} user={user} />
                <WelcomeMessage loggedIn={loggedIn} user={user} />
                <Switch>
                    <Route exact path="/">
                        <Home studies={studies} reports={reports} reportsByStudy={reportsByStudy} comments={comments} handleAllData={this.handleAllData} />
                    </Route>
                    <Route path="/reports/:id">
                        <Report reports={reports} comments={comments} user={user}/>
                    </Route>
                    <Route path="/dashboard">
                        {loggedIn === 'true' ? <Dashboard studies={studies} reports={reports} users={users} /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/profile">
                        {loggedIn === 'true' ? <Profile handleUserState={this.handleUserState} user={user} /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/addStudy">
                        {loggedIn === 'true' ? <AddStudy /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/addReport">
                        {loggedIn === 'true' ? <AddReport studies={studies} /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/reportTable">
                        {loggedIn === 'true' ? <ReportTable reports={reports} comments={comments} handleAllData={this.handleAllData} /> : <Redirect to="/" />}
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
export default inject("RootStore")(observer(App));


// if (document.getElementById('App')) {
//     ReactDOM.render(
//         <Provider
//             RootStore={RootStore}>
//             <App />
//         </Provider>
//         , document.getElementById('App'));
// }
