import React from 'react';

export default function ErrorMessage({ errorMessage }) {
    return (
        <div className="alert alert-custom alert-dismissible fade show" role="alert">
            <strong>Error:</strong> { errorMessage }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
