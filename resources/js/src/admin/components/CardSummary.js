import React from 'react';

function CardSummary() {
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-lg-3 col-md-6">
                    <div className="card border-danger mb-3 shadow-sm">
                        <div className="card-body text-danger">
                            <h5 className="card-title">Danger card title</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card border-primary mb-3 shadow-sm">
                        <div className="card-body text-danger">
                            <h5 className="card-title">Danger card title</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card border-warning mb-3 shadow-sm">
                        <div className="card-body text-danger">
                            <h5 className="card-title">Danger card title</h5>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card border-success mb-3 shadow-sm">
                        <div className="card-body text-danger">
                            <h5 className="card-title">Danger card title</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardSummary
