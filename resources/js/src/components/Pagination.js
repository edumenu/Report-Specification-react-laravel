import React from 'react'

export default function Pagination({ comments, searchComments }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${comments.prev_page_url === null ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => searchComments("previous", null)} tabIndex="-1">Previous</button>
                </li>
                <li className={`page-item ${comments.current_page - 1 === 0 ? "d-none" : ""}`}><a className="page-link" onClick={() => searchComments("pageSelect", (comments.current_page) - 1)}>{(comments.current_page) - 1}</a></li>
                <li className={`page-item ${comments.current_page === 0 ? "d-none" : ""}`}><a className="page-link" onClick={() => searchComments("pageSelect", comments.current_page)}>{comments.current_page}</a></li>
                <li className={`page-item ${(comments.current_page + 1) === comments.last_page || comments.total == 1 ? "d-none" : ""}`}><a className="page-link" onClick={() => searchComments("pageSelect", (comments.current_page) + 1)}>{(comments.current_page) + 1}</a></li>
                <li className={`page-item ${comments.next_page_url === null ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => searchComments("next", null)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}
