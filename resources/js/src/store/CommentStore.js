import React from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';
import { observer } from 'mobx-react';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class CommentStore {
    comments = {};
    commentsPerReports = {};

    loadAllComments = async () => {
        axios.get("http://127.0.0.1:8000/api/comments").then(response => {
            runInAction(() => {
                this.comments = response.data;
            });
        }).catch(error => {
            console.log(error);
        });
    }

    loadCommentsPerReport = async (id, type, url, pageNum) => {
        switch (type) {
            case "nextPrevious":
                axios.get(`${url}`).then(response => {
                    runInAction(() => {
                        this.commentsPerReports = response.data
                    });
                    console.log(this.commentsPerReports);
                })
                    .catch(err => {
                        console.log(err);
                    });
                    break;


            case "pageSelect":
                axios.get(`http://127.0.0.1:8000/api/comments/${id}?page=${pageNum}`).then(response => {
                    runInAction(() => {
                        this.commentsPerReports = response.data
                    });
                })
                    .catch(err => {
                        console.log(err);
                    });
                    break;



            default:
                axios.get(`http://127.0.0.1:8000/api/comments/${id}`).then(response => {
                    runInAction(() => {
                        this.commentsPerReports = response.data
                    });
                })
                    .catch(err => {
                        console.log(err);
                    });
                    break;


        }
    }
}

decorate(CommentStore, {
    comments: observable
});

export default new CommentStore();
