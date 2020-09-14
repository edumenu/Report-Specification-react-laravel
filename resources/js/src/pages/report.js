import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import spinner from '../assests/images/spinner.gif';
import CommentCard from '../components/CommentCard';
import { indexCounter } from '../utility/StudyUtility';
import { useParams } from 'react-router-dom';
import Pagination from '../components/Pagination';


function Report(props) {
    const [userComment, setUserComment] = useState('');
    const [report, setReport] = useState([]);
    const [userName, setUserName] = useState('');
    const [comments, setComments] = useState();
    const [cardLoading, setCarLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);
    const params = useParams();


    useEffect(() => {
        props.RootStore.ReportStore.loadOneReport(params.id);
        props.RootStore.CommentStore.loadCommentsPerReport(params.id, "default");
        setTimeout(() => {
            searchReport();
            setCarLoading(false);
        }, 1500);
    }, [])

    function searchReport() {
        setReport(props.RootStore.ReportStore.report);
        setComments(props.RootStore.CommentStore.commentsPerReports.comments);
    }

    function searchComments(searchType, pageNum) {
        setCommentLoading(true);
        switch (searchType) {
            case "next":
                props.RootStore.CommentStore.loadCommentsPerReport(params.id, "nextPrevious", comments.next_page_url, null);
                break;
            case "previous":
                props.RootStore.CommentStore.loadCommentsPerReport(params.id, "nextPrevious", comments.prev_page_url, null);
                break;
            case "pageSelect":
                props.RootStore.CommentStore.loadCommentsPerReport(params.id, "pageSelect", null, pageNum);
                break;

        }
        setTimeout(() => {
            searchReport();
            setCommentLoading(false);
        }, 1500);
    }

    function onSubmit(e) {
        e.preventDefault();
        let user_id = Object.keys(props.user).length === 0 ? 0 : props.user.id;
        props.RootStore.CommentStore.addComment(userName, userComment, user_id, params.id);
    }

    return (
        <div className="container-fluid text-blue centerCards">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm border-0 rounded-lg border-light mb-3">
                        <div className="card-header text-center font-weight-bold">Add a comment</div>
                        <div className="card-body">
                            <p>Add a comment to the report so a programmer can review it</p>
                            <form onSubmit={onSubmit}>
                                <label>
                                    Name:
                                    <input className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </label>
                                <label>
                                    Comment:
                                    <input className="form-control" value={userComment} onChange={(e) => setUserComment(e.target.value)} />
                                </label>
                                <div className="mb-4 text-center">
                                    <button className="btn btn-success text-center mt-5" type="submit"> Add comment </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-8">
                    <div className="card shadow-sm border-0 rounded-lg mt-1">
                        {cardLoading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}
                        {(Object.keys(report).length  !== 0 && cardLoading === false) &&
                            <>
                                <div className="card">
                                    <div className="card-header font-weight-bold text-center"><h2>{report.report_name}</h2></div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><span className="font-weight-bold">Report study:</span> {report.report_study}</li>
                                        <li className="list-group-item"><span className="font-weight-bold">Status:</span> <span className="border badge badge badge-success">{report.report_status}</span></li>
                                    </ul>
                                </div>

                                {commentLoading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}

                                <div className="card-body mt-2">
                                    {(Object.keys(comments).length !== 0 && cardLoading === false && commentLoading === false) &&
                                        comments.data.map(comment => (
                                            <CommentCard key={comment.id} comment_author={comment.comment_author} comment_content={comment.comment_content} created_at={comment.created_at} />
                                        ))}

                                    {(Object.keys(comments.data).length === 0 && comments !== undefined && cardLoading === false && commentLoading === false) && <h3 className="text-center mb-5"> There no comments </h3>}

                                    <Pagination comments={comments} searchComments={searchComments} />
                                </div>
                            </>
                        }
                        {(Object.keys(report).length === 0 && report !== undefined && cardLoading === false) &&
                            <>
                                <div className="card shadow-lg border-0 rounded-lg mt-1">
                                    <h2 className="text-center font-weight-bold my-5">Report cannot be found</h2>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("RootStore")(observer(Report));

