import React, { useState, useEffect } from 'react';
import { observer, inject } from "mobx-react";
import spinner from '../assests/images/spinner.gif';
import CommentCard from '../components/CommentCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    var statusColors = {
        "passed": "badge-success",
        "failed": "badge-danger",
        "programming": "badge-warning",
        "testing": "badge-info",
    }


    useEffect(() => {
        loadReportPage();
    }, [])

    function loadReportPage() {
        props.RootStore.ReportStore.loadOneReport(params.id);
        props.RootStore.CommentStore.loadCommentsPerReport(params.id, "default");
        setTimeout(() => {
            searchReport();
            setCarLoading(false);
        }, 2000);
    }

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
        }, 2000);
    }

    function onSubmit(e) {
        e.preventDefault();
        let user_id = Object.keys(props.user).length === 0 ? 0 : props.user.id;
        props.RootStore.CommentStore.addComment(userName, userComment, user_id, params.id);
        loadReportPage();
    }

    function updateStatus(id, status) {
        props.RootStore.ReportStore.updateReportStatus(id, status);
        loadReportPage();
        setTimeout(() => {
            if (props.RootStore.ReportStore.report.report_status === status) {
                toast.success("success!", {
                    autoClose: 3000,
                    hideProgressBar: true
                });
            } else {
                toast.error("Sorry, could not update status", {
                    autoClose: 3000,
                    hideProgressBar: true
                });
            }
        }, 2500);
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
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="inputEmail4">Name</label>
                                        <input className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="inputEmail4">Comment</label>
                                        <input type="text" className="form-control" value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder="Enter comment" />
                                    </div>
                                </div>
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
                        {(report !== undefined && report.length !== 0 && cardLoading === false) &&
                            <>
                                <div className="card">
                                    <div className="card-header font-weight-bold text-center"><h2>{report.report_name}</h2></div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><h5><span className="font-weight-bold">Report study:</span> {report.report_study}</h5></li>
                                        <li className="list-group-item"><h5 className="font-weight-bold">Status: <span className={`border badge badge ${statusColors[report.report_status]}`}>{report.report_status}</span>
                                            <div className="btn-group float-right">
                                                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Change status</button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <button className="dropdown-item" onClick={() => updateStatus(report.id, "passed")} type="button">passed</button>
                                                    <button className="dropdown-item" onClick={() => updateStatus(report.id, "failed")} type="button">failed</button>
                                                    <button className="dropdown-item" onClick={() => updateStatus(report.id, "programming")} type="button">programming</button>
                                                    <button className="dropdown-item" onClick={() => updateStatus(report.id, "testing")} type="button">testing</button>
                                                </div>
                                            </div>
                                        </h5>
                                        </li>
                                    </ul>
                                </div>

                                {commentLoading && <img className="my-auto mx-auto" src={spinner} alt="loading" />}

                                <div className="card-body mt-2">
                                    {(comments !== undefined && comments.length !== 0 && cardLoading === false && commentLoading === false) &&
                                        comments.data.map(comment => (
                                            <CommentCard key={comment.id} comment_author={comment.comment_author} comment_content={comment.comment_content} created_at={comment.created_at} />
                                        ))}

                                    {(comments === undefined && cardLoading === false && commentLoading === false) && <h3 className="text-center mb-5"> There no comments </h3>}


                                    {(comments !== undefined && cardLoading === false && commentLoading === false) && <Pagination comments={comments} searchComments={searchComments} />}

                                </div>
                            </>
                        }
                        {(report !== undefined && report.length === 0 && cardLoading === false) &&
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

