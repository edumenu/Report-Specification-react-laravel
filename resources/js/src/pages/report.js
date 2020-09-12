import React, { useState } from 'react';

function Report() {
    const [userComment, setUserComment] = useState('');

    function onSubmit(){
        console.log("test");
    }

    return (
        <div className="container-fluid text-blue centerCards">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="card border-dark mb-3">
                        <div className="card-header text-center font-weight-bold">Add a comment</div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <input className="form-control" value={userComment} onChange={e => setUserComment(e.target.value)} />
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-8">
                    <div className="card shadow-lg border-0 rounded-lg mt-1">
                        <h1 className="text-center font-weight-bold my-3">Report</h1>
                        <div className="card-body">
                            <div className="card border-light mb-3">
                                <div className="card-header">Edem Dumenu</div>
                                <div className="card-body">
                                    <h5 className="card-title">Warning card title</h5>
                                </div>
                            </div>
                            <div className="card border-light mb-3">
                                <div className="card-header">Edem Dumenu</div>
                                <div className="card-body">
                                    <h5 className="card-title">Warning card title</h5>
                                </div>
                            </div>
                            <div className="card border-light mb-3">
                                <div className="card-header">Edem Dumenu</div>
                                <div className="card-body">
                                    <h5 className="card-title">Warning card title</h5>
                                </div>
                            </div>

                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report
