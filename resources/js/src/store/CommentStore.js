import React from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';
import { observer } from 'mobx-react';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class CommentStore {
    comments = {};
    commentsPerReports = {};

    loadAllComments = async () => {
        axios.get("http://127.0.0.1:8000/api/comments").then(response => {
           runInAction(()=> {
            this.comments = response.data;
           });
        }).catch(error =>{
            console.log(error);
        });
    }

    loadCommentsPerReport = async (id) => {
        axios.get(`http://127.0.0.1:8000/api/comments/${id}`).then(response => {
            runInAction(() => {
                this.commentsPerReports = response.data
            });
        })
            .catch(err => {
                console.log(err);
            });
    }
}

decorate(CommentStore, {
    comments: observable
});

export default new CommentStore();
