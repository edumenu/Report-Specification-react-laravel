import React, { Component } from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';

import StudyStore from './StudyStore';
import ReportStore from './ReportStore';
import CommentStore from './CommentStore';

class RootStore extends Component {
    constructor(props){
        super(props);
        this.StudyStore = StudyStore;
        this.ReportStore = ReportStore;
        this.CommentStore = CommentStore;
    }
}


export default new RootStore();
