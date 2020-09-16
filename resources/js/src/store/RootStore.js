import React, { Component } from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';

import StudyStore from './StudyStore';
import ReportStore from './ReportStore';
import CommentStore from './CommentStore';
import UserStore from './UserStore';

class RootStore extends Component {
    constructor(props){
        super(props);
        this.StudyStore = StudyStore;
        this.ReportStore = ReportStore;
        this.CommentStore = CommentStore;
        this.UserStore = UserStore;
    }
}


export default new RootStore();
