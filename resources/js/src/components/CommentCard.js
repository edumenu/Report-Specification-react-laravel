import React from 'react';

export default function CommentCard({ comment_author, comment_content, created_at }) {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header">{comment_author} <span className="float-right">{created_at}</span></div>
            <div className="card-body border-light rounded-bottom">
                <h5 className="card-title">{comment_content}</h5>
            </div>
        </div>
    )
}
