import React from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';
import { observer } from 'mobx-react';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class CommentStore {
    comments = {};
    commentsPerReports = {};
    environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";


    loadAllComments = async () => {
        axios.get(`${this.environ}/api/comments`).then(response => {
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
                axios.get(`${this.environ}/api/comments/${id}?page=${pageNum}`).then(response => {
                    runInAction(() => {
                        this.commentsPerReports = response.data
                    });
                })
                    .catch(err => {
                        console.log(err);
                    });
                break;

            default:
                axios.get(`${this.environ}/api/comments/${id}`).then(response => {
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

    addComment = async (userName, userComment, user_id, id) => {
        axios.post(`${this.environ}/api/comments`, {
            comment_author: userName,
            comment_content: userComment,
            user_id: user_id,
            report_id: id,
        })
            .then(response => {
                // console.log(response);
            }).catch(error => {
                console.log(error);
            });
    }
}

decorate(CommentStore, {
    comments: observable
});

export default new CommentStore();
